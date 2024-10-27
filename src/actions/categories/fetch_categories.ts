"use server";

import { Category, Author } from "@/interfaces";
import { prisma } from "@/lib";

type ResponseFetchCategories = {
  ok: boolean;
  categories: Category[];
  message: string;
};

type ResponseFetchAuthors= {
  ok: boolean;
  authors: Author[];
  message: string;
};

type ResponseFetchCategory = {
  ok: boolean;
  category: Category | null;
  message: string;
};

type Metadata = {
  title: string;
  description: string;
};

type ResponseFetchCategoryMetadata = {
  ok: boolean;
  metadata: Metadata | null;
  message: string;
};

export const getCategories = async (): Promise<ResponseFetchCategories> =>
{
  try {
    const categories = await prisma.category.findMany() as Category[];

    return {
      ok: true,
      categories,
      message: "Categories fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      categories: [],
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getAuthors = async (): Promise<ResponseFetchAuthors> =>
  {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
        },
      }) as Author[];

      return {
        ok: true,
        authors: users,
        message: "Authors fetched successfully 👍",
      };
    } catch(error) {
      console.error(error);
      return {
        ok: false,
        authors: [],
        message: "Something went wrong !, check logs for details",
      };
    }
  };

export const getCategoryById = async (id: string): Promise<ResponseFetchCategory> => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    }) as Category | null;
  
    if (!category) {
      return {
        ok: false,
        category: null,
        message: "Category not found with id: " + id,
      };
    }

    return {
      ok: true,
      category: null,
      message: "Category fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      category: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getCategoryByPermalink = async (permalink: string): Promise<ResponseFetchCategory> => {
  try {
    const category = await prisma.category.findUnique({
      where: { permalink },
    }) as Category | null;
  
    if (!category) {
      return {
        ok: false,
        category: null,
        message: "Category not found with permalink: " + permalink,
      };
    }

    return {
      ok: true,
      category,
      message: "Category fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      category: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getCategoryMetadataBySlug = async (permalink: string): Promise<ResponseFetchCategoryMetadata> => {
  try {
    const metadata = await prisma.category.findUnique({
      where: { permalink },
      select: {
        name: true,
        description: true,
      }
    }) as Metadata | null;
  
    if (!metadata) {
      return {
        ok: false,
        metadata: null,
        message: "Category not found with permalink: " + permalink,
      };
    }

    return {
      ok: true,
      metadata,
      message: "Category fetched successfully 👍",
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