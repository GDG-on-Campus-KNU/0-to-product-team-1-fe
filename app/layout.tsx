import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import { Flip, ToastContainer } from "react-toastify";

import "./globals.css";
import { queryClient } from "@/lib/queryClient";
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
        <QueryClientProvider client={queryClient}>
          <main className="flex-1 flex flex-col w-full max-w-120 mx-auto bg-background shadow-sm">
            {children}
          </main>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Flip}
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
