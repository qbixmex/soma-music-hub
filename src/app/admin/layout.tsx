import { FC, ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link"

import { SideNav, TopNavigation } from "@/app/admin/(components)";
import { Toaster } from "@/components/ui/sonner";

// import { auth } from "@/auth.config";

export const metadata: Metadata = {
  title: {
    template: '%s | Admin',
    absolute: 'Admin',
    default: 'Admin',
  },
  description: "Admin area.",
  robots: "noindex, nofollow",
};

const AdminLayout: FC<{ children: ReactNode }> = async ({ children }) => {

  // const session = await auth();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              Quantic Coders
            </Link>
          </div>
          <div className="flex-1">
            <SideNav />
          </div>
          <div className="mt-auto p-4">
            {/* You can put more components at bottom here */}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <TopNavigation />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default AdminLayout;