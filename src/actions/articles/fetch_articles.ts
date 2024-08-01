"use server";

import { Article, Category, Robots } from "@/interfaces";
import { prisma } from "@/lib";

export type ArticlePublic = {
  id?: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  category: Category;
  tags: string[];
  publishedAt: Date | null;
  author: { name: string };
  robots: Robots;
  createdAt?: Date;
  updatedAt?: Date;
};

type ResponseFetchArticlesPublic = {
  ok: boolean;
  articles: ArticlePublic[];
  message: string;
};

export type ArticlesForList = {
  id: string;
  title: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
  },
  publishedAt: Date;
};

type ResponseFetchArticles = {
  ok: boolean;
  articles: ArticlesForList[];
  message: string;
};

type ArticleDB = {

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

type PublicParams = {
  isPublished?: boolean;
};

/**
 * Get all articles with the option to filter by published status
 * 
 * @param params
 * isPublished - filter by published status
 * 
 * @example ```ts
 * getArticlesPublic(); // get all published articles without filtering.
 * getArticlesPublic({ isPublished: true }); // get all published articles.
 * getArticlesPublic({ isPublished: false }); // get all unpublished articles.
 * ```
 * @returns 
 */
export const getArticlesPublic = async (params: PublicParams = {}):
  Promise<ResponseFetchArticlesPublic> =>
{
  const { isPublished } = params;
  let whereClause = {};

  if (isPublished === true && isPublished !== undefined) {
    whereClause = { publishedAt: { not: null } };
  } else if (isPublished === false) {
    whereClause = { publishedAt: null };
  }

  try {
    const articles = await prisma.article.findMany({
      where: whereClause,
      include: {
        category: true,
        author: {
          select: {
            name: true,
          }
        },
      }
    }) as ArticlePublic[];

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

type AdminParams = {
  role?: 'admin' | 'author' | 'subscriber';
  authorId?: string;
};

export const getArticles = async (params: AdminParams = {})
:Promise<ResponseFetchArticles> =>
{
  const {
    role = 'subscriber',
    authorId,
  } = params;

  let whereClause = {};

  if (role === 'admin') {
    whereClause = {};
  } else if (role === 'author') {
    whereClause = { authorId };
  } else if (role === 'subscriber') {
    // No articles will match this condition
    whereClause = { id: -1 };
  }

  try {
    const articles = await prisma.article.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        slug: true,
        publishedAt: true,
        category: {
          select: {
            name: true,
            slug: true,
          }
        },
        author: {
          select: {
            name: true,
          }
        },
      },
    }) as ArticlesForList[];

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
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
          }
        },
      }
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

export const getArticleBySlugPublic = async (slug: string)
: Promise<ResponseFetchArticle> => {

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      }
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

type EditParams = {
  slug: string;  
  authorId: string;
  role: 'admin' | 'author' | 'subscriber';
};

export const getArticleBySlug = async (params: EditParams)
: Promise<ResponseFetchArticle> => {

  const {
    slug,
    role,
    authorId,
  } = params;

  let whereClause: {
    slug: string;
    authorId?: string;
  } = { slug: "" };

  if (role === 'admin') {
    whereClause = { slug };
  } else if (role === 'author') {
    whereClause = { slug, authorId };
  } else if (role === 'subscriber') {
    return {
      ok: false,
      article: null,
      message: "You are not authorized to edit this article",
    };
  }

  try {
    const article = await prisma.article.findUnique({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      }
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