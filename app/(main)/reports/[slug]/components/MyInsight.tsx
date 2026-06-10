"use client";

import { useParams } from "next/navigation";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";

export default function MyInsight() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const { state, next_week_focus } = data.visualizationsJson.weekly_coaching;

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-head-02 text-gray-800 self-start m-2">나의 발견</h1>

      <div className="flex w-full flex-col gap-3">
        {/* 이번 주 상태 */}
        <div className="flex flex-col gap-2 rounded-3xl bg-stone-100 p-5">
          <span className="text-label-03 text-gray-400">이번 주 상태</span>
          <span className="text-body-03 text-foreground">{state.label}</span>
          <p className="text-label-02 text-gray-500">{state.summary}</p>
        </div>

        {/* 다음 주 포커스 */}
        <div className="flex flex-col gap-2 rounded-3xl bg-stone-100 p-5">
          <span className="text-label-03 text-gray-400">다음 주 추천</span>
          <span className="text-body-03 text-foreground">
            {next_week_focus.label_ko}
          </span>
          <p className="text-label-02 text-gray-500">
            {next_week_focus.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
