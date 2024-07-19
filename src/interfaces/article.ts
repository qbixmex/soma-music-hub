export interface Article {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string | null;
  author: string;
  robots: string;
}
