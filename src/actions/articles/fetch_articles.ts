"use server";

import { Article } from "@/interfaces";
import { prisma } from "@/lib";

type ResponseFetchArticles = {
  ok: boolean;
  articles: Article[];
  message: string;
};

type ResponseFetchArticle = {
  ok: boolean;
  article: Article | null;
  message: string;
};

type Metadata = {
  title: string;
  description: string;
  robots: string;
  author: string;
};

type ResponseFetchArticleMetadata = {
  ok: boolean;
  metadata: Metadata | null;
  message: string;
};

type Params = {
  isPublished: boolean;
};

export const getArticles = async (params: Params = {
  isPublished: true,
}) :Promise<ResponseFetchArticles> =>
{
  try {
    const articles = await prisma.article.findMany({
      where: {
        // I want only published articles
        publishedAt: params.isPublished ? { not: null } : null,
      },
    }) as Article[];

    return {
      ok: true,
      articles,
      message: "Articles fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      articles: [],
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getArticleById = async (id: string): Promise<ResponseFetchArticle> => {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
    }) as Article | null;
  
    if (!article) {
      return {
        ok: false,
        article: null,
        message: "Article not found with id: " + id,
      };
    }

    return {
      ok: true,
      article: null,
      message: "Article fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      article: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getArticleBySlug = async (slug: string): Promise<ResponseFetchArticle> => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    }) as Article | null;
  
    if (!article) {
      return {
        ok: false,
        article: null,
        message: "Article not found with slug: " + slug,
      };
    }

    return {
      ok: true,
      article,
      message: "Article fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      article: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getArticleMetadataBySlug = async (slug: string): Promise<ResponseFetchArticleMetadata> => {
  try {
    const metadata = await prisma.article.findUnique({
      where: { slug },
      select: {
        title: true,
        description: true,
        robots: true,
        author: true,
      }
    }) as Metadata | null;
  
    if (!metadata) {
      return {
        ok: false,
        metadata: null,
        message: "Article not found with slug: " + slug,
      };
    }

    return {
      ok: true,
      metadata,
      message: "Article fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      metadata: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};