import React from "react";

export default async function ReportDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="flex flex-1 items-center justify-center w-full p-5">
      <h1 className="text-text-head-02 text-gray-800">
        {slug}에 대한 특정 날짜 리포트 페이지 입니다.
      </h1>
    </div>
  );
}
