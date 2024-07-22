"use server";

import { prisma } from '@/lib';
import articleSchema from './article.schema';
import { slugFormat } from '@/utils';
import { revalidatePath } from 'next/cache';

export const createArticle = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const articleParsed = articleSchema.safeParse({
    ...data,
    publishedAt: data.publishedAt
      ? new Date(data.publishedAt.toString())
      : undefined,
  });

  if (!articleParsed.success) {
    return {
      ok: false,
      message: articleParsed.error.errors[0].message,
    };
  }

  const articleToSave = articleParsed.data;
  articleToSave.slug = slugFormat(articleToSave.slug);

  const tagsArray = articleToSave.tags
    .split(",")
    .map(tag => tag.trim().toLowerCase());

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const createdArticle = await prisma.article.create({
        data: {
          ...articleToSave,
          tags: { set: tagsArray },
          publishedAt: articleToSave.publishedAt
            ? articleToSave.publishedAt.toISOString()
            : undefined,
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
    console.error(error);
    return {
      ok: false,
      message: 'Error creating a product',
    };
  }
};
