"use client";

import { useParams } from "next/navigation";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";

export default function PatternDifference() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const { pattern_diff } = data.visualizationsJson;

  return (
    <div className="flex flex-col items-center justify-center w-full py-5">
      <h1 className="text-head-03 text-gray-800 self-start ml-2 mb-6">
        패턴 변화
      </h1>

      <div className="flex w-full flex-col rounded-3xl bg-background-dark shadow-sm px-2">
        {pattern_diff.length === 0 ? (
          <p className="py-8 text-center text-label-02 text-gray-400">
            지난주와 비교했을 때 뚜렷한 패턴 변화가 없어요.
          </p>
        ) : (
          pattern_diff.map(
            (
              { pattern, prev_percent, current_percent, delta_percent, arrow },
              index,
            ) => (
              <div
                key={pattern}
                className={`flex items-center gap-4 px-5 py-4 ${
                  index < pattern_diff.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-label-01 text-foreground">
                    {pattern}
                  </span>
                  <span className="text-label-05 text-gray-400">
                    지난 주 {prev_percent}% → 이번 주 {current_percent}%
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1 text-label-03 ${
                    delta_percent > 0
                      ? "text-blue-500"
                      : delta_percent < 0
                        ? "text-green-600"
                        : "text-gray-400"
                  }`}
                >
                  <span>{arrow}</span>
                  <span>
                    {delta_percent > 0 ? "+" : ""}
                    {delta_percent}%
                  </span>
                </div>
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
}
