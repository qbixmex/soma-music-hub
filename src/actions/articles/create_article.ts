"use server";

import { prisma } from '@/lib';
import articleSchema from './article.schema';
import { slugFormat } from '@/utils';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';

const createArticle = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const session = await auth();

  console.log("USER ID:", session?.user.id);

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

  const { author: _, ...articleToSave} = articleParsed.data;
  articleToSave.slug = slugFormat(articleToSave.slug);

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

