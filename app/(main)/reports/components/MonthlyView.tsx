"use client";

import { useState } from "react";

import { DrillResultView } from "@/app/(main)/home/components/view/DrillResultView";
import { processResponseToCleanData } from "@/app/(main)/home/hooks/usePostDrill";
import { Calendar, CalendarEvent } from "@/components/ui/calendar";

import { useGetCalendar } from "../hooks/useGetCalendar";
import { useGetDailyDrill } from "../hooks/useGetDailyDrill";

function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function MonthlyView() {
  const [pickedDate, setPickedDate] = useState<Date>();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: calendarData } = useGetCalendar({
    year: currentMonth.getFullYear(),
    month: currentMonth.getMonth() + 1,
  });

  const pickedDateString = pickedDate ? toDateString(pickedDate) : undefined;
  const hasEvent = calendarData?.some((r) => r.date === pickedDateString);

  const { data: dailyData } = useGetDailyDrill({
    date: hasEvent ? pickedDateString : undefined,
  });

  const events: CalendarEvent[] = (calendarData ?? []).map((record) => {
    const [y, m, d] = record.date.split("-").map(Number);
    return {
      date: new Date(y, m - 1, d),
      drillId: record.drillId,
      isCompleted: record.isCompleted,
    };
  });

  const cleanDrill =
    dailyData?.recommendationJson.type === "drill"
      ? (processResponseToCleanData(dailyData) as Extract<
          ReturnType<typeof processResponseToCleanData>,
          { type: "drill" }
        >)
      : null;

  return (
    <div className="flex flex-col flex-1 gap-6 pt-5 w-full">
      <Calendar
        selected={pickedDate}
        onSelect={setPickedDate}
        defaultMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        events={events}
      />

      {pickedDate &&
        (cleanDrill && dailyData ? (
          <DrillResultView
            data={cleanDrill}
            entryData={{
              text: dailyData.text,
              setText: () => {},
              condition: dailyData.contextJson.self_condition,
              setCondition: () => {},
              sleep: dailyData.contextJson.sleep_hours,
              setSleep: () => {},
              exercise: dailyData.contextJson.exercise_today,
              setExercise: () => {},
              social: dailyData.contextJson.social_today as unknown as number,
              setSocial: () => {},
            }}
            drillData={dailyData}
          />
        ) : (
          !hasEvent && (
            <p className="text-body-02 text-gray-400">드릴이 없습니다.</p>
          )
        ))}
    </div>
  );
}
