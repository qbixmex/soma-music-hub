"use server";

import { prisma } from '@/lib';
import articleSchema from './article.schema';
import { slugFormat } from '@/utils';
import { revalidatePath } from 'next/cache';

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

  const { author, ...articleToSave } = articleParsed.data;
  articleToSave.slug = slugFormat(articleToSave.slug);


  const tagsArray = articleToSave.tags
    .split(",")
    .map(tag => tag.trim().toLowerCase());

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const updatedArticle = await prisma.article.update({
        where: { id },
        data: {
          ...articleToSave,
          tags: { set: tagsArray },
          authorId: author,
        },
      });

      return {
        ok: true,
        message: 'Article updated successfully',
        article: updatedArticle,
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
