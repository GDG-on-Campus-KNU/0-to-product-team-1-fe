"use client";

import * as React from "react";

import { BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayButton } from "react-day-picker";

import { getDrillConfig } from "@/lib/constants/drill-config";
import { cn } from "@/lib/utils";

export type CalendarEvent = {
  date: Date;
  drillId: number;
  isCompleted: boolean;
};

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  events?: CalendarEvent[];
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
}

export function Calendar({
  selected,
  onSelect,
  events = [],
  defaultMonth = new Date(),
  onMonthChange,
}: CalendarProps) {
  return (
    <div className="w-full rounded-3xl bg-stone-100 p-6">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        defaultMonth={defaultMonth}
        onMonthChange={onMonthChange}
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
  events,
  ...props
}: CalendarDayButtonProps) {
  const event = events.find(
    (e) => e.date.toDateString() === day.date.toDateString(),
  );

  if (event) {
    const drillConfig = getDrillConfig(event.drillId);
    const Icon = drillConfig?.icon ?? BrainCircuit;
    const bgColor = drillConfig?.hex ?? "#F9CFDB";

    return (
      <button
        className="flex size-10 items-center justify-center bg-transparent p-0 border-0 hover:opacity-80"
        {...props}
        style={{}}
      >
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full",
            modifiers.selected && "opacity-60",
          )}
          style={
            event.isCompleted
              ? { backgroundColor: bgColor }
              : {
                  backgroundColor: "transparent",
                  border: `2.5px solid ${bgColor}`,
                }
          }
        >
          <Icon
            className={cn(
              "size-4 text-gray-700",
              !event.isCompleted && "opacity-70",
            )}
          />
        </div>
      </button>
    );
  }

  return (
    <button
      className="flex size-10 items-center justify-center bg-transparent p-0 border-0"
      {...props}
      style={{}}
    >
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-full text-label-02 font-semibold",
          modifiers.selected ? "bg-gray-200" : "hover:bg-gray-100",
        )}
      >
        {day.date.getDate()}
      </div>
    </button>
  );
}
