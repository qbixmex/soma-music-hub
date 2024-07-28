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
export interface UserSeed {
  name: string;
  email: string;
  emailVerified: Date;
  password: string;
  role: Role;
  image: string;
}