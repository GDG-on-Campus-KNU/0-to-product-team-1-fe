"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useParams } from "next/navigation";

import { STATE_CONFIG } from "@/lib/constants/state-config";

const ICON_COLOR = {
  sleep: "text-green-600",
  exercise: "text-beige-600",
  condition: "text-blue-600",
  social: "text-pink-600",
} as const;

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
      <span className="flex items-center gap-1 text-label-05 text-gray-400 whitespace-nowrap">
        <Minus className="size-3" />
        지난 주와 동일함
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-label-05 text-gray-400 whitespace-nowrap">
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

  const SOCIAL_MODE_LABELS: Record<string, string> = {
    alone: "혼자",
    with_friends: "친구와",
    with_family: "가족과",
    with_partner: "파트너와",
    with_coworkers: "동료와",
  };
  const toSocialLabel = (v: unknown) => {
    if (v == null) return null;
    const str = String(v);
    return SOCIAL_MODE_LABELS[str] ?? str;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-5">
      <h1 className="text-head-03 text-gray-800 self-start ml-2 mb-6">
        생활 지표 요약
      </h1>

      <div className="grid grid-cols-2 gap-3 w-full">
        {/* 수면 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-background-dark p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            {(() => {
              const Icon = STATE_CONFIG.sleep.icon;
              return <Icon className={`size-4 ${ICON_COLOR.sleep}`} />;
            })()}
            <span className="text-label-04">{STATE_CONFIG.sleep.label}</span>
          </div>
          <span className="text-head-03 text-foreground">
            {parseFloat(avgSleepHours.toFixed(1))}시간
          </span>
          <DiffText
            current={avgSleepHours}
            prev={prevWeekSleepHours}
            unit="시간"
          />
        </div>

        {/* 운동 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-background-dark p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            {(() => {
              const Icon = STATE_CONFIG.exercise.icon;
              return <Icon className={`size-4 ${ICON_COLOR.exercise}`} />;
            })()}
            <span className="text-label-04">{STATE_CONFIG.exercise.label}</span>
          </div>
          <span className="text-head-03 text-foreground">
            {parseFloat(avgExerciseMinutes.toFixed(1))}분
          </span>
          <DiffText
            current={avgExerciseMinutes}
            prev={prevWeekExerciseMinutes}
            unit="분"
          />
        </div>

        {/* 컨디션 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-background-dark p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            {(() => {
              const Icon = STATE_CONFIG.condition.icon;
              return <Icon className={`size-4 ${ICON_COLOR.condition}`} />;
            })()}
            <span className="text-label-04">
              {STATE_CONFIG.condition.label}
            </span>
          </div>
          <span className="text-head-03 text-foreground">
            {parseFloat(avgCondition.toFixed(1))}
          </span>
          <DiffText
            current={avgCondition}
            prev={data.lifestyleSummary.prevWeekCondition}
            unit=""
          />
        </div>

        {/* 사교 활동 */}
        <div className="flex flex-col gap-2 rounded-2xl bg-background-dark p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            {(() => {
              const Icon = STATE_CONFIG.social.icon;
              return <Icon className={`size-4 ${ICON_COLOR.social}`} />;
            })()}
            <span className="text-label-04">{STATE_CONFIG.social.label}</span>
          </div>
          <span className="text-head-03 text-foreground">
            {toSocialLabel(socialMode)}
          </span>
          {prevWeekSocialMode == null ? (
            <span className="text-label-05 text-gray-400">지난 주: 없음</span>
          ) : socialMode === prevWeekSocialMode ? (
            <span className="flex items-center gap-1 text-label-05 text-gray-400 whitespace-nowrap">
              <Minus className="size-3" />
              지난 주와 동일함
            </span>
          ) : (
            <span className="text-label-05 text-gray-400 whitespace-nowrap">
              지난 주: {toSocialLabel(prevWeekSocialMode)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
