"use client";

import { Check, Circle } from "lucide-react";
import { useParams } from "next/navigation";

import { getCategoryLabel } from "@/lib/constants/category-config";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";
import { groupDrillsByDate } from "../../utils/date";

export default function DailyDrillRecord() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const groups = groupDrillsByDate(data.dailyDrills);

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-head-02 text-gray-800 self-start m-2">
        일일 드릴 기록
      </h1>

      <div className="flex w-full flex-col rounded-3xl bg-stone-100">
        {groups.map(({ date, dayKo, day, drills }, index) => {
          const allCompleted =
            drills.length > 0 && drills.every((d) => d.drillCompleted === true);

          return (
            <div
              key={date}
              className={`flex items-center gap-4 px-5 py-4 ${
                index < groups.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* 날짜 */}
              <div className="flex w-8 shrink-0 flex-col items-start">
                <span className="text-label-05 text-gray-400">{dayKo}</span>
                <span className="text-head-03 leading-tight text-foreground">
                  {day}
                </span>
              </div>

              {/* 드릴 칩 */}
              <div className="flex flex-1 flex-wrap gap-1.5">
                {drills.length > 0 ? (
                  drills.map(({ drillCategory }) => (
                    <span
                      key={drillCategory}
                      className="rounded-full bg-pink-300 px-3 py-1 text-label-05 text-gray-600"
                    >
                      {getCategoryLabel(drillCategory)}
                    </span>
                  ))
                ) : (
                  <span className="text-label-04 text-gray-300">
                    드릴이 없습니다.
                  </span>
                )}
              </div>

              {/* 완료 상태 */}
              {allCompleted ? (
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-600">
                  <Check className="size-3.5 text-white" strokeWidth={3} />
                </div>
              ) : (
                <Circle className="size-6 shrink-0 text-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
