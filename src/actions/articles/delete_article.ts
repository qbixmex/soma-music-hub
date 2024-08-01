"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

const deleteArticle = async ( articleId: string ) => {
  
  const session = await auth();

  const authorId = session?.user.id!;
  const authorRole = session?.user.role!;

  let whereClause: {
    id: string;
    authorId?: string;
  } = { id: "" };

  if (authorRole === 'admin') {
    whereClause = { id: articleId };
  } else if (authorRole === 'author') {
    whereClause = { id: articleId, authorId };
  } else if (authorRole === 'subscriber') {
    return {
      ok: false,
      article: null,
      message: "You are not authorized to delete this article",
    };
  }

  try {
    const articleDeleted = await prisma.article.delete({
      where: whereClause,
    });

    if (!articleDeleted) {
      return {
        ok: false,
        message: `Article not found with id: ${articleId}`,
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

export default deleteArticle;
