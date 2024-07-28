"use server";

import { prisma } from '@/lib';
import categorySchema from './category.schema';
import { slugFormat } from '@/utils';
import { revalidatePath } from 'next/cache';

const createCategory = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const categoryParsed = categorySchema.safeParse({
    ...data,
    publishedAt: data.publishedAt
      ? new Date(`${data.publishedAt}`)
      : undefined,
  });

  if (!categoryParsed.success) {
    return {
      ok: false,
      message: categoryParsed.error.errors[0].message,
    };
  }

  const categoryToSave = categoryParsed.data;
  categoryToSave.slug = slugFormat(categoryToSave.slug);

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const createdCategory = await prisma.category.create({
        data: { ...categoryToSave }
      });

      return {
        ok: true,
        message: 'Category created successfully',
        category: createdCategory,
      }
    });
    
    // Revalidate Paths
    revalidatePath('/categories');
    revalidatePath('/admin/categories');

    return prismaTransaction;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error creating a category',
    };
  }
};

export default createCategory;
