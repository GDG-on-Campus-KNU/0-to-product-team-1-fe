"use client";

import { useParams } from "next/navigation";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";

export default function WeeklyEmotionDistribution() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const { axes, dominant } = data.visualizationsJson.emotion_pentagon;
  const emotionDescription = `${data.blocksJson.block2_emotion_summary.primary_emotion}: ${data.blocksJson.block2_emotion_summary.description}`;

  const axesWithPercent = axes.map((a) => ({
    ...a,
    displayLabel: `${a.label} ${(a.value * 100).toFixed(1)}%`,
  }));

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-head-03 text-gray-800 self-start ml-2 mb-6">
        주간 감정 분포
      </h1>

      <div className="flex w-full flex-col gap-4 rounded-3xl bg-background-dark p-5 shadow-sm">
        <span className="text-body-01 text-foreground">
          {dominant}
          {(() => {
            const val = axes.find((a) => a.label === dominant)?.value;
            return val != null ? (
              <span className="text-label-03 text-gray-400">
                {" "}
                ({(val * 100).toFixed(1)}%)
              </span>
            ) : (
              ""
            );
          })()}
        </span>

        <ResponsiveContainer width="100%" height={260}>
          <RadarChart
            data={axesWithPercent}
            cx="50%"
            cy="50%"
            outerRadius="80%"
          >
            <PolarGrid stroke="#e3e1e7" />
            <PolarAngleAxis
              dataKey="displayLabel"
              tick={{ fill: "#807e87", fontSize: 11 }}
              tickLine={false}
            />
            <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              stroke="#B5C0D0"
              fill="#B5C0D0"
              fillOpacity={0.4}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>

        <p className="text-center text-label-04 text-gray-500">
          &ldquo;{emotionDescription}&rdquo;
        </p>
      </div>
    </div>
  );
}
