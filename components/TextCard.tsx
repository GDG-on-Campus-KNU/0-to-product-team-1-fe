import React from "react";

import { cn } from "@/lib/utils";

interface TextCardProps {
  text: string;
  className?: string;
}

export function TextCard({ text, className }: TextCardProps) {
  return (
    <div className={cn("grid w-full max-w-sm gap-6", className)}>
      <div className="overflow-hidden rounded-2xl border border-border-disabled bg-muted shadow-sm">
        <div className="flex min-h-20 w-full bg-transparent px-4 py-3 text-body-04 text-gray-700 whitespace-pre-wrap">
          {text}
        </div>
      </div>
    </div>
  );
}
