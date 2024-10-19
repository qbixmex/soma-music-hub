import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
];

const eventSchema = z.object({
  title: z
    .string({ message: 'The title must be an string' })
    .min(4, 'The title must contain at lest 4 characters long')
    .max(150, 'The title must be less than 155 characters long'),
  permalink: z
    .string({ message: 'The permalink must be an string' })
    .min(4, 'The permalink must contain at lest 8 characters long')
    .max(150, 'The permalink must be less than 155 characters long'),
  image: z
    .instanceof(File, { message: 'The image must be an file' })
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 1MB')
    .refine((file) => {
      return file ? ACCEPTED_FILE_TYPES.includes(file.type) : true;
    }, 'File must be a PNG'),
  description: z
    .string({ message: 'The description must be an string' })
    .min(8, 'The description must contain at lest 8 characters long'),
  categoryId: z
    .string({ message: 'The category must be an string' })
    .uuid({ message: 'The category must be an valid uuid' }),
  artist: z
    .string({ message: 'The artist must be an string' })
    .min(3, { message: 'The artist must contain at lest 3 characters long' })
    .max(200, { message: 'The artist must be less than 200 characters' }),
  lineUp: z.string({ message: 'The line up must be an string' }),
  ticketUrl: z
    .string({ message: 'The ticket url must be an string' })
    .min(4, 'The ticket url must contain at lest 4 characters long')
    .max(150, 'The ticket url must be less than 155 characters long'),
  location: z
    .string({ message: 'The ticket url must be an string' })
    .min(8, 'The location must contain at lest 8 characters long')
    .max(255, 'The location url must be less than 255 characters long'),
  author: z
    .string({ message: 'The author must be an string' })
    .min(3, 'The author must contain at lest 3 characters long')
    .or(z.literal('')),
  content: z
    .string({ message: 'The content must be an string' })
    .min(8, 'The content must contain at lest 8 characters long'),
  tags: z.string({ message: 'The tags must be an string' }),
  eventDate: z
    .date({ required_error: 'The event date is required' })
    .optional(),
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

export default eventSchema;
