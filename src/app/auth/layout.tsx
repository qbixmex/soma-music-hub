import { FC, ReactNode } from "react";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: '%s - Quantic Coders',
    absolute: 'Admin',
    default: 'Admin',
  },
  description: "Admin area.",
  robots: "noindex, nofollow",
};

const AuthLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <>
      <main>
        {children}
      </main>
      <Toaster richColors />
    </>
  );
};

export default AuthLayout;