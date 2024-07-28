import { z } from "zod";
import { Role } from "./role.enum";

const userSchema = z.object({
  name: z
    .string({ message: 'The title must be an string' })
    .min(4, 'The name must contain at lest 8 characters long')
    .max(100, 'The title must be less than 150 characters long'),
  email: z
    .string({ message: 'The slug must be an string' })
    .email('The email must be a valid email'),
  password: z
    .string({ message: 'The password must be an string' })
    .min(8, 'The password must contain at lest 8 characters long')
    .max(24, 'The password must be less than 24 characters long')
    .or(z.literal('')),
  role: z.nativeEnum(Role).optional(),
  image: z.string({ message: 'The image must be an string' }),
});

export default userSchema;
