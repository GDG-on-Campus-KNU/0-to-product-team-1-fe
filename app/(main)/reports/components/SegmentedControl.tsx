"use client";

import { CalendarDays, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  value: "week" | "month";
  onValueChange: (value: "week" | "month") => void;
}

export function SegmentedControl({
  value,
  onValueChange,
}: SegmentedControlProps) {
  return (
    <div className="inline-flex rounded-full bg-gray-100 p-1">
      <button
        onClick={() => onValueChange("week")}
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2 text-label-03 transition-colors",
          value === "week"
            ? "bg-green-400 text-foreground shadow-sm"
            : "text-gray-400",
        )}
      >
        <CalendarDays className="h-4 w-4" />
        주간
      </button>

      <button
        onClick={() => onValueChange("month")}
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2 text-label-03 transition-colors",
          value === "month"
            ? "bg-green-400 text-foreground shadow-sm"
            : "text-gray-400",
        )}
      >
        <Calendar className="h-4 w-4" />
        월간
      </button>
    </div>
  );
}
