"use client";

import { useParams } from "next/navigation";

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

  const description = `${data.blocksJson.block2_emotion_summary.primary_emotion}: ${data.blocksJson.block2_emotion_summary.description}`;

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-head-02 text-gray-800 self-start m-2">
        주간 감정 분포
      </h1>

      <div className="flex w-full flex-col gap-4 rounded-3xl bg-stone-100 p-4 pb-5">
        <p className="text-center text-label-04 text-gray-500">
          &ldquo;{description}&rdquo;
        </p>
      </div>
    </div>
  );
}
