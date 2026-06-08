"use client";

import {
  Moon,
  Dumbbell,
  Smile,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { useParams } from "next/navigation";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";

function DiffText({
  current,
  prev,
  unit,
}: {
  current: number;
  prev: number;
  unit: string;
}) {
  const diff = parseFloat((current - prev).toFixed(1));
  if (diff === 0)
    return (
      <span className="flex items-center gap-1 text-label-05 text-gray-400">
        <Minus className="size-3" />
        지난 주와 동일함
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-label-05 text-gray-400">
      {diff > 0 ? (
        <TrendingUp className="size-3" />
      ) : (
        <TrendingDown className="size-3" />
      )}
      지난 주보다 {Math.abs(diff).toFixed(1)}
      {unit} {diff > 0 ? "↑" : "↓"}
    </span>
  );
}

export default function LifeSummary() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const {
    avgSleepHours,
    avgExerciseMinutes,
    avgCondition,
    socialMode,
    prevWeekSleepHours,
    prevWeekExerciseMinutes,
    prevWeekSocialMode,
  } = data.lifestyleSummary;

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-head-02 text-gray-800 self-start m-2">
        생활 지표 요약
      </h1>

      <div className="grid grid-cols-2 gap-3 w-full">
        {/* 수면 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-stone-100 p-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Moon className="size-4" />
            <span className="text-label-04">수면</span>
          </div>
          <span className="text-head-02 text-foreground">
            {parseFloat(avgSleepHours.toFixed(1))}시간
          </span>
          <DiffText
            current={avgSleepHours}
            prev={prevWeekSleepHours}
            unit="시간"
          />
        </div>

        {/* 운동 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-stone-100 p-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Dumbbell className="size-4" />
            <span className="text-label-04">운동</span>
          </div>
          <span className="text-head-02 text-foreground">
            {parseFloat(avgExerciseMinutes.toFixed(1))}분
          </span>
          <DiffText
            current={avgExerciseMinutes}
            prev={prevWeekExerciseMinutes}
            unit="분"
          />
        </div>

        {/* 컨디션 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-stone-100 p-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Smile className="size-4" />
            <span className="text-label-04">컨디션</span>
          </div>
          <span className="text-head-02 text-foreground">
            {parseFloat(avgCondition.toFixed(1))}
          </span>
          <span className="text-label-05 text-gray-400">5점 만점 기준</span>
        </div>

        {/* 사교 활동 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-stone-100 p-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users className="size-4" />
            <span className="text-label-04">사교 활동</span>
          </div>
          <span className="text-head-02 text-foreground">{socialMode}</span>
          {prevWeekSocialMode == null ? (
            <span className="text-label-05 text-gray-400">지난 주: 없음</span>
          ) : socialMode === prevWeekSocialMode ? (
            <span className="flex items-center gap-1 text-label-05 text-gray-400">
              <Minus className="size-3" />
              지난 주와 동일함
            </span>
          ) : (
            <span className="text-label-05 text-gray-400">
              지난 주: {String(prevWeekSocialMode)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
