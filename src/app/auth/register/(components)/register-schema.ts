import { z } from "zod";

const loginSchema = z.object({
  name: z.string()
    .min(3, 'The name must contain at lest 3 characters long')
    .max(150, 'The name must be less than 150 characters long'),
  email: z.string().email('The email must be a valid email'),
  password: z.string()
    .min(8, 'The password must contain at lest 8 characters long')
    .max(24, 'The password must be less than 24 characters long'),
  passwordConfirmation: z.string()
    .min(8, 'The password must contain at lest 8 characters long')
    .max(24, 'The password must be less than 24 characters long'),
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'The passwords must match',
  path: ['passwordConfirmation'],
});

export default loginSchema;
