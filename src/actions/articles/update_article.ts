"use server";

import { prisma } from '@/lib';
import articleSchema from './article.schema';
import { slugFormat, uploadImage } from '@/utils';
import { revalidatePath } from 'next/cache';
import deleteImage from '@/utils/delete-image';

const updateArticle = async (id: string, formData: FormData) => {
  const data = Object.fromEntries(formData);

  const articleParsed = articleSchema.safeParse({
    ...data,
    publishedAt: data.publishedAt
      ? new Date(`${data.publishedAt}`)
      : undefined,
  });

  if (!articleParsed.success) {
    return {
      ok: false,
      message: articleParsed.error.errors[0].message,
    };
  }

  const { author, image, ...articleToSave } = articleParsed.data;
  articleToSave.slug = slugFormat(articleToSave.slug);

  const tagsArray = articleToSave.tags
    .split(",")
    .map(tag => tag.trim().toLowerCase());

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const updatedArticle = await transaction.article.update({
        where: { id },
        data: {
          ...articleToSave,
          tags: { set: tagsArray },
          authorId: author,
        },
      });

      if (image) {
        // Delete previous image from cloudinary.
        const response = await deleteImage(updatedArticle.imagePublicId);

        if (!response.ok) {
          throw 'Error deleting image from cloudinary';
        }
    
        // Upload Image to third-party storage (cloudinary).
        const imageUploaded = await uploadImage(image, 'articles');
    
        if (!imageUploaded) {
          throw 'Error uploading image to cloudinary';
        }

        // Update article with new image.
        await transaction.article.update({
          where: { id },
          data: {
            imageUrl: imageUploaded.secureUrl,
            imagePublicId: imageUploaded.publicId,
          },
        });

        // Update article object to return.
        updatedArticle.imageUrl = imageUploaded.secureUrl;
      }

      const { imagePublicId: _, ...articleResponse } = updatedArticle;

      return {
        ok: true,
        message: 'Article updated successfully',
        article: articleResponse,
      }
    });
    
    // Revalidate Paths
    revalidatePath('/articles');
    revalidatePath('/admin/articles');
    revalidatePath(`/admin/articles/${data.slug}`);

    return prismaTransaction;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error updating an article',
    };
  }
};

export default updateArticle;
