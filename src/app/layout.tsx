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
    template: '%s | Soma Music Club',
    absolute: 'Soma Music Hub',
    default: 'Soma Music Hub',
  },
  description: "Welcome to Soma Music Hub, a sanctuary for those who truly appreciate the essence of underground electronic music",
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
