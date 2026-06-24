"use client";

import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
} from "recharts";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";

export default function ConditionFlow() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const { points: rawPoints } = data.visualizationsJson.condition_flow;
  const points = rawPoints.map((p) => ({
    ...p,
    avg_condition: p.avg_condition ?? 3,
  }));
  const tip = data.blocksJson.block3_weekly_tip.tip;

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-head-03 text-gray-800 self-start ml-2 mb-6">
        컨디션 흐름
      </h1>

      <div className="flex w-full flex-col gap-4 rounded-3xl bg-background-dark p-4 pb-5 shadow-sm">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={points}
            margin={{ top: 24, right: 16, left: 0, bottom: 4 }}
          >
            <XAxis
              dataKey="dow"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#aba9b3", fontSize: 12 }}
            />
            <CartesianGrid
              vertical={false}
              stroke="#e3e1e7"
              strokeDasharray="4 4"
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 3, 5]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#aba9b3", fontSize: 12 }}
              width={24}
            />
            <Line
              type="monotone"
              dataKey="avg_condition"
              stroke="#eaded5"
              strokeWidth={2.5}
              connectNulls
              dot={<Dot r={4} fill="#46434e" strokeWidth={0} />}
              activeDot={{ r: 5, fill: "#46434e", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <p className="text-center text-label-04 text-gray-500">
          &ldquo;{tip}&rdquo;
        </p>
      </div>
    </div>
  );
}
