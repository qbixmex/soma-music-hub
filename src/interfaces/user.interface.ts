export type Role = "admin" | "subscriber" | "author";

export interface User {
  id?: string;
  name: string;
  email: string;
  emailVerified?: Date;
  password: string;
  role: Role;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role?: Role;
}

export interface UserSeed {
  name: string;
  email: string;
  emailVerified: Date;
  password: string;
  role: Role;
  image: string;
}

export interface Author {
  id: string;
  name: string;
}
