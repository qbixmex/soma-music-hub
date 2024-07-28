"use server";

import { User } from "@/interfaces";
import { prisma } from "@/lib";

type ResponseFetchUsers = {
  ok: boolean;
  users: User[];
  message: string;
};

type ResponseFetchUser = {
  ok: boolean;
  user: User | null;
  message: string;
};

export const getUsers = async (): Promise<ResponseFetchUsers> =>
{
  try {
    const users = await prisma.user.findMany() as User[];

    return {
      ok: true,
      users,
      message: "Users fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      users: [],
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getUserById = async (id: string): Promise<ResponseFetchUser> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    }) as User | null;

    if (!user) {
      return {
        ok: false,
        user: null,
        message: "User not found with id: " + id,
      };
    }

    return {
      ok: true,
      user: user,
      message: "User fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      user: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};
