import { z } from "zod";

const articleSchema = z.object({
  title: z
    .string({ message: 'The title must be an string' })
    .min(4, 'The title must contain at lest 8 characters long')
    .max(150, 'The title must be less than 155 characters long'),
  slug: z
    .string({ message: 'The slug must be an string' })
    .min(4, 'The slug must contain at lest 8 characters long')
    .max(150, 'The slug must be less than 155 characters long'),
  image: z
    .string({ message: 'The image must be an string' })
    .min(8, 'The image must contain at lest 8 characters long'),
  description: z
    .string({ message: 'The description must be an string' })
    .min(8, 'The description must contain at lest 8 characters long'),
  categoryId: z
    .string({ message: 'The category must be an string' })
    .uuid({ message: 'The category must be an valid uuid' }),
  author: z
    .string({ message: 'The author must be an string' })
    .min(3, 'The author must contain at lest 3 characters long')
    .or(z.literal('')),
  content: z
    .string({ message: 'The content must be an string' })
    .min(8, 'The content must contain at lest 8 characters long'),
  tags: z .string({ message: 'The tags must be an string' }),
  publishedAt: z
    .date({ required_error: 'The published at is required' })
    .optional(),
  robots: z
    .enum([
      "index, follow",
      "noindex, follow",
      "index, nofollow",
      "noindex, nofollow"
    ], { message: "Please select a valid robot" })
    .optional(),
});

export default articleSchema;
