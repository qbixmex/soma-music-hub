import { Category } from "./category.interface";

export type Robots =
  | "index, follow"
  | "noindex, follow"
  | "index, nofollow"
  | "noindex, nofollow"
  | undefined;

export interface Event {
  id?: string;
  title: string;
  permalink: string;
  imageUrl: string;
  imagePublicId: string;
  description: string;
  content: string;
  artist: string;
  lineUp: string[];
  ticketUrl: string;
  location: string;
  eventDate: Date | null;
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

export interface EventSeed {
  title: string;
  permalink: string;
  imageUrl: string;
  imagePublicId: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: string;
  robots: Robots;
}
