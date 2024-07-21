import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers/providers";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Quantic Coders',
    absolute: 'Quantic Coders',
    default: 'Quantic Coders',
  },
  description: "A blog about software development and programming.",
};

const RootLayout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
