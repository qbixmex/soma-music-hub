"use server";

import { prisma } from '@/lib';
import articleSchema from './article.schema';
import { slugFormat, uploadImage } from '@/utils';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';

const createArticle = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const session = await auth();

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

  const { author: _, image, ...articleToSave} = articleParsed.data;
  articleToSave.slug = slugFormat(articleToSave.slug);

  // Upload Image to third-party storage (cloudinary).
  const imageUploaded = await uploadImage(image!, 'articles');
  
  if (!imageUploaded) {
    throw 'Error uploading image to cloudinary';
  }

  const tagsArray = articleToSave.tags
    .split(",")
    .map(tag => tag.trim().toLowerCase());

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const authorId = `${session?.user.id}`;

      const createdArticle = await prisma.article.create({
        data: {
          ...articleToSave,
          authorId,
          imageUrl: imageUploaded.secureUrl,
          imagePublicId: imageUploaded.publicId,
          tags: { set: tagsArray },
        },
      });

      return {
        ok: true,
        message: 'Article created successfully',
        article: createdArticle,
      }
    });
    
    // Revalidate Paths
    revalidatePath('/articles');
    revalidatePath('/admin/articles');

    return prismaTransaction;
  } catch (error) {
    console.error((error as Error)?.message.toString());
    return {
      ok: false,
      message: 'Error creating an article',
    };
  }
};

export default createArticle;

