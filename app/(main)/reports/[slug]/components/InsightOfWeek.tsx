"use client";

import { useParams } from "next/navigation";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";

export default function InsightOfWeek() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const { discoveries } = data.visualizationsJson;

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-head-02 text-gray-800 self-start m-2">
        이번 주의 발견
      </h1>

      <div className="flex w-full flex-col rounded-3xl bg-stone-100">
        {discoveries.map(({ category, text, count, source }, index) => (
          <div
            key={`${category}-${index}`}
            className={`flex flex-col gap-2 px-5 py-4 ${
              index < discoveries.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-green-200 px-3 py-1 text-label-05 text-gray-600">
                {category}
              </span>
              {count != null && (
                <span className="text-label-05 text-gray-400">{count}회</span>
              )}
            </div>
            <p className="text-label-02 text-foreground">{text}</p>
            <span className="text-label-05 text-gray-400">{source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
