import { Category } from "./category";

export type Robots =
  | "index, follow"
  | "noindex, follow"
  | "index, nofollow"
  | "noindex, nofollow"
  | undefined;

export interface Article {
  id?: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  category: Category;
  tags: string[];
  publishedAt: Date | null;
  author: {
    id: string;
    name: string
  };
  robots: Robots;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleSeed {
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: string;
  robots: Robots;
}
