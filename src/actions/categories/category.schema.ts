import { z } from "zod";

const categorySchema = z.object({
  name: z
    .string({ message: 'The title must be an string' })
    .min(4, 'The title must contain at lest 8 characters long')
    .max(150, 'The title must be less than 155 characters long'),
  slug: z
    .string({ message: 'The slug must be an string' })
    .min(4, 'The slug must contain at lest 8 characters long')
    .max(150, 'The slug must be less than 155 characters long'),
  description: z
    .string({ message: 'The description must be an string' })
    .min(8, 'The description must contain at lest 8 characters long'),
});

export default categorySchema;