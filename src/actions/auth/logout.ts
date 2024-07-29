"use server";

import { signOut } from "@/auth.config";

const logout = async () => signOut();

export default logout;
