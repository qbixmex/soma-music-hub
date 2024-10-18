"use server";

import { prisma } from '@/lib';
import eventSchema from './event.schema';
import { slugFormat, uploadImage } from '@/utils';
import { revalidatePath } from 'next/cache';
import deleteImage from '@/utils/delete-image';

const updateEvent = async (id: string, formData: FormData) => {
  const data = Object.fromEntries(formData);

  const eventParsed = eventSchema.safeParse({
    ...data,
    publishedAt: data.publishedAt
      ? new Date(`${data.publishedAt}`)
      : undefined,
  });

  if (!eventParsed.success) {
    return {
      ok: false,
      message: eventParsed.error.errors[0].message,
    };
  }

  const { author, image, ...eventToSave } = eventParsed.data;
  eventToSave.permalink = slugFormat(eventToSave.permalink);

  const tagsArray = eventToSave.tags
    .split(",")
    .map(tag => tag.trim().toLowerCase());

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const updatedEvent = await transaction.event.update({
        where: { id },
        data: {
          ...eventToSave,
          tags: { set: tagsArray },
          authorId: author,
        },
      });

      if (image) {
        // Delete previous image from cloudinary.
        const response = await deleteImage(updatedEvent.imagePublicId);

        if (!response.ok) {
          throw 'Error deleting image from cloudinary';
        }
    
        // Upload Image to third-party storage (cloudinary).
        const imageUploaded = await uploadImage(image, 'events');
    
        if (!imageUploaded) {
          throw 'Error uploading image to cloudinary';
        }

        // Update event with new image.
        await transaction.event.update({
          where: { id },
          data: {
            imageUrl: imageUploaded.secureUrl,
            imagePublicId: imageUploaded.publicId,
          },
        });

        // Update event object to return.
        updatedEvent.imageUrl = imageUploaded.secureUrl;
      }

      const { imagePublicId: _, ...eventResponse } = updatedEvent;

      return {
        ok: true,
        message: 'Event updated successfully',
        event: eventResponse,
      }
    });
    
    // Revalidate Paths
    revalidatePath('/events');
    revalidatePath('/admin/events');
    revalidatePath(`/admin/events/${data.permalink}`);

    return prismaTransaction;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error updating an event',
    };
  }
};

export default updateEvent;
