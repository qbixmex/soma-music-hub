"use server";

import { prisma } from '@/lib';
import categorySchema from './category.schema';
import { slugFormat } from '@/utils';
import { revalidatePath } from 'next/cache';

const updateCategory = async (id: string, formData: FormData) => {
  const data = Object.fromEntries(formData);

  const categoryParsed = categorySchema.safeParse(data);

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

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: categoryToSave,
      });

      return {
        ok: true,
        message: 'Category updated successfully',
        category: updatedCategory,
      };
    });
    
    // Revalidate Paths
    revalidatePath('/admin/categories');
    revalidatePath(`/admin/categories/${data.slug}`);

    return prismaTransaction;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error updating a category',
    };
  }
};

export default updateCategory;
