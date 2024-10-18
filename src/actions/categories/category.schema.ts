import { z } from "zod";

const categorySchema = z.object({
  name: z
    .string({ message: 'The title must be an string' })
    .min(4, 'The title must contain at lest 8 characters long')
    .max(150, 'The title must be less than 155 characters long'),
  permalink: z
    .string({ message: 'The permalink must be an string' })
    .min(4, 'The permalink must contain at lest 8 characters long')
    .max(150, 'The permalink must be less than 155 characters long'),
  description: z
    .string({ message: 'The description must be an string' })
    .min(8, 'The description must contain at lest 8 characters long'),
});

export default categorySchema;
