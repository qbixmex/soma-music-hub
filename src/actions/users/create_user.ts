"use server";

import { prisma } from '@/lib';
import usersSchema from './users.schema';
import { revalidatePath } from 'next/cache';

const createUser = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const userParsed = usersSchema.safeParse(data);

  if (!userParsed.success) {
    return {
      ok: false,
      message: userParsed.error.errors[0].message,
    };
  }

  const userToSave = userParsed.data;

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      const createdUser = await prisma.user.create({
        data: { ...userToSave }
      });

      return {
        ok: true,
        message: 'User created successfully',
        category: createdUser,
      };
    });
    
    // Revalidate Paths
    revalidatePath('/admin/users');

    return prismaTransaction;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error creating a user',
    };
  }
};

export default createUser;
