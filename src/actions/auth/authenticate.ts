'use server';
 
import { signIn } from '@/auth.config';
// import { sleep } from '@/utils'; // Debugging
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
 
const authenticate = async (formData: FormData): Promise<string> => {
  try {
    // await sleep(2); // Debugging
    await signIn('credentials',{
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Signin Successful 👍';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials !';
        case 'CallbackRouteError':
          return 'Callback route error !';
        default:
          return 'Something went wrong.';
      }
    }
    return 'Unknown error occurred !';
  }
};

export default authenticate;
