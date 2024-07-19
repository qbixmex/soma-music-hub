export interface Article {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: Date | null;
  author: string;
  robots: string;
  createdAt?: Date;
  updatedAt?: Date;
}
