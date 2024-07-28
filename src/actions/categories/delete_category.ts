"use server";

import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

const deleteCategory = async (id: string) => {
  try {
    const categoryDeleted = await prisma.category.delete({
      where: { id },
    });

    if (!categoryDeleted) {
      return {
        ok: false,
        message: `Category not found with id: ${id}`,
      };
    }

    // Revalidate Paths
    revalidatePath('/');
    revalidatePath('/admin/categories');

    return {
      ok: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Unable to delete category, check the logs for more information`,
    };
  }
};

export default deleteCategory;
