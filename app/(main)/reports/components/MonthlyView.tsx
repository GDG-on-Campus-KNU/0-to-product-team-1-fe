"use client";

import { useState } from "react";

import { Calendar, CalendarEvent } from "@/components/ui/calendar";

export function MonthlyView() {
  const [pickedDate, setPickedDate] = useState<Date>();

  const events: CalendarEvent[] = [
    {
      date: new Date(2023, 9, 1),
      icon: "tree",
      count: 2,
    },
    {
      date: new Date(2023, 9, 5),
      icon: "smile",
      count: 5,
    },
    {
      date: new Date(2023, 9, 10),
      icon: "heart",
      count: 10,
    },
  ];

  return (
    <div className="flex flex-col flex-1 gap-6 p-5 w-full">
      <Calendar
        selected={pickedDate}
        onSelect={setPickedDate}
        defaultMonth={new Date(2023, 9)}
        events={events}
      />

      <div className="text-sm">
        선택된 날짜:
        {pickedDate ? pickedDate.toLocaleDateString("ko-KR") : " 없음"}
      </div>
    </div>
  );
}
