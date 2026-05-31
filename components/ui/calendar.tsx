"use client";

import * as React from "react";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  TreePine,
  Smile,
} from "lucide-react";
import { DayPicker, DayButton } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarEvent = {
  date: Date;
  icon: "tree" | "heart" | "smile";
  count?: number;
};

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  events?: CalendarEvent[];
  defaultMonth?: Date;
}

export function Calendar({
  selected,
  onSelect,
  events = [],
  defaultMonth = new Date(),
}: CalendarProps) {
  return (
    <div className="w-full rounded-3xl bg-stone-100 p-6">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        defaultMonth={defaultMonth}
        showOutsideDays
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            ),

          DayButton: (props) => (
            <CalendarDayButton {...props} events={events} />
          ),
        }}
        classNames={{
          root: "w-full",
          months: "relative w-full",
          month: "w-full space-y-6",
          nav: "absolute inset-x-0 top-0 flex justify-between items-center h-10 z-10",
          button_previous:
            "flex items-center justify-center h-8 w-8 rounded-full text-foreground hover:bg-stone-200",
          button_next:
            "flex items-center justify-center h-8 w-8 rounded-full text-foreground hover:bg-stone-200",
          month_caption: "relative flex h-10 items-center justify-center",
          caption_label: "text-body-01 text-foreground",
          month_grid: "w-full",
          weekdays: "flex mb-4",
          weekday: "flex-1 text-center text-label-05 text-gray-300",
          week: "flex mt-2 items-start",
          day: "flex flex-1 flex-col items-center",
          outside: "text-gray-200",
          today: "",
          selected: "",
        }}
      />
    </div>
  );
}

interface CalendarDayButtonProps extends React.ComponentProps<
  typeof DayButton
> {
  events: CalendarEvent[];
}

function CalendarDayButton({
  day,
  modifiers,
  className,
  events,
  ...props
}: CalendarDayButtonProps) {
  const event = events.find(
    (e) => e.date.toDateString() === day.date.toDateString(),
  );

  if (event) {
    return (
      <div className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-10 rounded-full p-0 hover:bg-transparent",
            event.icon === "heart" ? "bg-green-100" : "bg-pink-400",
            modifiers.selected && "border-2 border-green-500 bg-transparent",
          )}
          {...props}
        >
          {event.icon === "tree" && <TreePine className="size-4" />}

          {event.icon === "heart" && <Heart className="size-4" />}

          {event.icon === "smile" && <Smile className="size-4" />}
        </Button>

        {event.count && (
          <span className="text-label-06 text-gray-400 leading-none">
            {event.count}
          </span>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "size-10 rounded-full p-0 text-label-02 hover:bg-transparent",
        modifiers.selected && "border-2 border-green-700 bg-transparent",
        className,
      )}
      {...props}
    >
      {day.date.getDate()}
    </Button>
  );
}
