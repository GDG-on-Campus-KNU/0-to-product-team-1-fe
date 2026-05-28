import React from "react";

import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col w-full pb-[calc(100px+env(safe-area-inset-bottom))]">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      {children}
      <div className="fixed bottom-6 left-0 right-0 z-50 mx-auto flex w-full max-w-120 px-6">
        <div className="w-full">
          <Navigation />
        </div>
      </div>
    </div>
  );
}
