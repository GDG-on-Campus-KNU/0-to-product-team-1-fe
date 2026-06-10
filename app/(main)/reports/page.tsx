"use client";

import { useState } from "react";

import { MonthlyView } from "./components/MonthlyView";
import { SegmentedControl } from "./components/SegmentedControl";
import { WeeklyView } from "./components/WeeklyView";

export default function ReportList() {
  const [viewType, setVoewType] = useState<"week" | "month">("month");
  return (
    <div className="flex flex-col flex-1 items-start w-full p-5">
      <SegmentedControl value={viewType} onValueChange={setVoewType} />
      {viewType === "week" && <WeeklyView />}
      {viewType === "month" && <MonthlyView />}
    </div>
  );
}
