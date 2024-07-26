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
  category: string;
  tags: string[];
  publishedAt: Date | null;
  author: string;
  robots: Robots;
  createdAt?: Date;
  updatedAt?: Date;
}
