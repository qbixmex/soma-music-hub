import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email('The email must be a valid email'),
  password: z.string()
    .min(8, 'The password must contain at lest 8 characters long')
    .max(24, 'The password must be less than 24 characters long'),
});

export default loginSchema;
