import React from "react";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Mobile App",
  description: "Mobile first web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="min-h-dvh flex flex-col bg-gray-100 text-foreground relative overflow-x-hidden">
        <main className="flex-1 flex flex-col w-full max-w-120 mx-auto bg-background shadow-sm">
          {children}
        </main>
      </body>
    </html>
  );
}
