import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { AdapterUser } from 'next-auth/adapters';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from './lib';
import { User } from './interfaces';

type AuthenticatedUser = Pick<User, 'id' | 'name' | 'email' | 'password' | 'role'>;

const getUser = async (email: string): Promise<AuthenticatedUser|null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    }) as AuthenticatedUser;

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string()
              .email('Invalid email format !'),
            password: z.string()
              .min(8, 'Password must be minimum 8 characters !')
              .max(24, 'Password must be less than 24 characters !'),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) return null;

          // This is the user object that will be set in the session
          const { password: _, ...authenticatedUser } = user;

          return authenticatedUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // If we have a user authenticated,
      if (user) {
        // Set the user on token data,
        token.data = { ...user };
      }

      return token;
    },
    session({ session, token }) {
      // Once we set the user on token data,
      // we can set the user on session.
      session.user = token.data as AdapterUser & User;

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user.role === 'admin';
      const isAuthor = auth?.user.role === 'author';
      const isSubscriber = auth?.user.role === 'subscriber';

      switch (true) {
        case nextUrl.pathname.startsWith('/admin/dashboard'):
        case nextUrl.pathname.startsWith('/admin/users'):
        case nextUrl.pathname.startsWith('/admin/categories'):
        case nextUrl.pathname.startsWith('/admin/articles'):
        case nextUrl.pathname.startsWith('/admin/tags'):
          return isLoggedIn && isAdmin || isLoggedIn && isAuthor;
        case nextUrl.pathname.startsWith('/admin/profile'):
          return isLoggedIn && isAdmin || isLoggedIn && isAuthor || isLoggedIn && isSubscriber;
        case nextUrl.pathname.startsWith('/auth/login'):
        case nextUrl.pathname.startsWith('/auth/register'):
          return isLoggedIn && Response.redirect(new URL('/admin/dashboard', nextUrl));
        case nextUrl.pathname.startsWith('/'):
          return true;
        default:
          return false;
      }
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);