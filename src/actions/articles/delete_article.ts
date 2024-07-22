"use server";

import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (id: string) => {
  try {
    const articleDeleted = await prisma.article.delete({
      where: { id },
    });

    if (!articleDeleted) {
      return {
        ok: false,
        message: `Article not found with id: ${id}`,
      };
    }

    // Revalidate Paths
    revalidatePath('/');
    revalidatePath('/admin/articles');

    return {
      ok: true,
      message: "Article deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Unable to delete article, check the logs for more information`,
    };
  }
};