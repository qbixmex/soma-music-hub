"use server";

import { prisma } from '@/lib';
import eventSchema from './event.schema';
import { slugFormat, uploadImage } from '@/utils';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';

const createEvent = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const session = await auth();

  const eventParsed = eventSchema.safeParse({
    ...data,
    eventDate: data.eventDate
      ? new Date(`${data.eventDate}`)
      : undefined,
    active: (data.active === 'true') ? true : (data.active === 'false') ? false : undefined,
  });

  if (!eventParsed.success) {
    return {
      ok: false,
      message: eventParsed.error.errors[0].message,
    };
  }

  const { author: _, image, ...eventToSave} = eventParsed.data;
  eventToSave.permalink = slugFormat(eventToSave.permalink);

  // Upload Image to third-party storage (cloudinary).
  const imageUploaded = await uploadImage(image!, 'events');
  
  if (!imageUploaded) {
    throw 'Error uploading image to cloudinary';
  }

  const lineUpArray = eventToSave.lineUp
    .split(",")
    .map(item => item.trim().toLowerCase());

  const tagsArray = eventToSave.tags
    .split(",")
    .map(tag => tag.trim().toLowerCase());

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const authorId = `${session?.user.id}`;

      const createdEvent = await transaction.event.create({
        data: {
          ...eventToSave,
          authorId,
          imageUrl: imageUploaded.secureUrl,
          imagePublicId: imageUploaded.publicId,
          lineUp: { set: lineUpArray },
          tags: { set: tagsArray },
        },
      });

      return {
        ok: true,
        message: 'Event created successfully',
        article: createdEvent,
      }
    });
    
    // Revalidate Paths
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/events');

    return prismaTransaction;
  } catch (error) {
    console.error((error as Error)?.message.toString());
    return {
      ok: false,
      message: 'Error creating an event',
    };
  }
};

export default createEvent;

