"use server";

import { signOut } from "@/auth.config";

const logout = async () => {
  await signOut({ redirectTo: "/auth/login" });
};

export default logout;
