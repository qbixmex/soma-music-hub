"use server";

import { prisma } from "@/lib";

export type DashboardArticle = {
  id: string;
  title: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
};

type ResponseArticles = {
  ok: boolean;
  articles: DashboardArticle[] | null;
  message: string;
};

export const getPublishedDashboardArticles = async (quantity = 5): Promise<ResponseArticles> => {
  try {
    const articles = await prisma.article.findMany({
      take: quantity,
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
      include: {
        category: {
          select: { name: true, slug: true },
        },
      }
    });

    const latestArticles: DashboardArticle[] = articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      category: {
        name: article.category.name,
        slug: article.category.slug,
      },
    }));

    return {
      ok: true,
      articles: latestArticles,
      message: "Latest published articles fetched successfully 👍",
    };
  } catch (error) {
    console.log(`${error}`);
    return {
      ok: false,
      articles: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getDraftDashboardArticles = async (quantity = 5): Promise<ResponseArticles> => {
  try {
    const articles = await prisma.article.findMany({
      take: quantity,
      where: { publishedAt: null },
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true, slug: true },
        },
      }
    });

    const latestArticles: DashboardArticle[] = articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      category: {
        name: article.category.name,
        slug: article.category.slug,
      },
    }));

    return {
      ok: true,
      articles: latestArticles,
      message: "Latest unpublished articles fetched successfully 👍",
    };
  } catch (error) {
    console.log(`${error}`);
    return {
      ok: false,
      articles: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};