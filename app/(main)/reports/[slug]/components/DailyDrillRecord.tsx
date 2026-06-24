"use client";

import { Check, Circle } from "lucide-react";
import { useParams } from "next/navigation";

import { getCategoryLabel } from "@/lib/constants/category-config";
import {
  DRILL_CATEGORY_CONFIG,
  DrillCategory,
} from "@/lib/constants/drill-config";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";

const DAY_KO = ["일", "월", "화", "수", "목", "금", "토"];

function getWeekDates(weekId: string): Date[] {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = parseInt(yearStr);
  const week = parseInt(weekStr);
  const jan4 = new Date(year, 0, 4);
  const jan4Day = jan4.getDay() || 7;
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - (jan4Day - 1) + (week - 1) * 7);
  // 월요일 기준으로 직전 일요일부터 시작 (일~토)
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() - 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function DailyDrillRecord() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const weekDates = getWeekDates(slug);

  // 날짜별 드릴 맵
  const drillsByDate = new Map<
    string,
    { drillCategory: string; drillCompleted: boolean | null }[]
  >();
  for (const drill of data.dailyDrills) {
    if (!drillsByDate.has(drill.date)) drillsByDate.set(drill.date, []);
    if (drill.drillCategory) drillsByDate.get(drill.date)!.push(drill);
  }

  // 프론트에서 직접 계산 (drillCategory 있는 것만 실제 드릴로 간주)
  const drillEntries = data.dailyDrills.filter((d) => !!d.drillCategory);
  const totalDrills = drillEntries.length;
  const completedDrills = drillEntries.filter(
    (d) => d.drillCompleted === true,
  ).length;
  const rate =
    totalDrills > 0 ? Math.round((completedDrills / totalDrills) * 100) : 0;
  const description = `추천 드릴 ${totalDrills}개 중 ${completedDrills}개를 실천했어요.`;

  return (
    <div className="flex flex-col items-center justify-center w-full py-5">
      <h1 className="text-head-03 text-gray-800 self-start ml-2 mb-6">
        일일 드릴 기록
      </h1>

      <div className="flex w-full flex-col rounded-3xl bg-background-dark shadow-sm">
        {weekDates.map((date, index) => {
          const dateStr = toDateString(date);
          const drills = drillsByDate.get(dateStr) ?? [];
          const allCompleted =
            drills.length > 0 && drills.every((d) => d.drillCompleted === true);

          return (
            <div
              key={dateStr}
              className={`flex items-center gap-4 px-5 py-4 ${
                index < weekDates.length - 1
                  ? "border-b border-gray-200/40"
                  : ""
              }`}
            >
              {/* 날짜 */}
              <div className="flex w-8 shrink-0 flex-col items-center">
                <span className="text-label-05 text-gray-400">
                  {DAY_KO[date.getDay()]}
                </span>
                <span className="text-head-03 leading-tight text-foreground">
                  {date.getDate()}
                </span>
              </div>

              {/* 드릴 칩 */}
              <div className="flex flex-1 flex-wrap gap-1.5">
                {drills.length > 0 ? (
                  drills.map(({ drillCategory }, i) => {
                    const hex =
                      DRILL_CATEGORY_CONFIG[drillCategory as DrillCategory]
                        ?.hex ?? "#F9CFDB";
                    return (
                      <span
                        key={i}
                        className="rounded-full px-3 py-1 text-label-05 text-gray-600"
                        style={{ backgroundColor: hex }}
                      >
                        #{getCategoryLabel(drillCategory)}
                      </span>
                    );
                  })
                ) : (
                  <span className="w-full text-center text-label-04 text-gray-300">
                    해당 날짜에 드릴이 없습니다.
                  </span>
                )}
              </div>

              {/* 완료 상태 */}
              {drills.length > 0 &&
                (allCompleted ? (
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-600">
                    <Check className="size-3.5 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <Circle className="size-6 shrink-0 text-gray-300" />
                ))}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-label-02 text-gray-500">
        &ldquo;{rate}%, {description}&rdquo;
      </p>
    </div>
  );
}
