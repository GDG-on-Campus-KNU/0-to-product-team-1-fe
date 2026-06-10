"use client";

import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

import { ReportSummary } from "../hooks/useGetReports";
import { parseWeekId } from "../utils/date";

export function WeekCard({
  report,
  month,
  isRecent = false,
}: {
  report: ReportSummary;
  month: string;
  isRecent: boolean;
}) {
  const router = useRouter();
  const { weekOfMonth } = parseWeekId(report.weekId);
  const progress =
    report.totalDrills > 0
      ? (report.completedDrills / report.totalDrills) * 100
      : 0;

  return (
    <div
      key={report.weekId}
      onClick={() => router.push(`/reports/${report.weekId}`)}
      className="flex flex-col gap-3 bg-stone-100 rounded-2xl p-5 border-b border-gray-200 py-4 cursor-pointer active:opacity-70 transition-opacity"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-gray-400" />
          <span className="text-label-01 text-foreground">
            {month} {weekOfMonth}주차
          </span>
        </div>
        {isRecent && (
          <span className="rounded-full bg-gray-700 px-2.5 py-1 text-label-05 text-white">
            최근
          </span>
        )}
      </div>

      <span className="text-label-04 text-gray-400">
        완료한 드릴 수 {report.completedDrills}/{report.totalDrills}
      </span>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gray-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
