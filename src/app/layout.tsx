import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/providers";
import { Navbar } from "@/components/layout";
import clsx from "clsx";

const montserrat = Montserrat();

export const metadata: Metadata = {
  title: "Quantic Coders Blog",
  description: "A blog about software development and programming.",
};

const RootLayout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx([
          montserrat.className,
          'customContainer',
        ])}
      >
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
