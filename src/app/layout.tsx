import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/providers";

const montserrat = Montserrat();

export const metadata: Metadata = {
  title: "Quantic Coders Blog",
  description: "A blog about software development and programming.",
};

const RootLayout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
