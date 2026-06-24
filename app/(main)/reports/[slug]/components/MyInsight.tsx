"use client";

import { useState } from "react";

import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { TextInput } from "@/app/(main)/home/components/TextInput";
import { TextCard } from "@/components/TextCard";

import { useGetReportDetail } from "../../hooks/useGetReportDetail";
import { usePatchWeeklyMemo } from "../../hooks/usePatchWeeklyMemo";

export default function MyInsight() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetReportDetail({ weekId: slug });
  const [memo, setMemo] = useState("");
  const [saved, setSaved] = useState(false);

  const memoMutation = usePatchWeeklyMemo();

  if (!data) {
    console.error(
      "컴포넌트가 렌더링 되기 전에 리포트 상세 API 응답이 캐싱되어있어야 합니다. 잘못된 컴포넌트 사용입니다.",
    );
    return;
  }

  const existingMemo = data.userMemo;
  const isReadOnly = saved || existingMemo !== null;
  const displayText = saved ? memo : (existingMemo ?? "");

  const handleSave = () => {
    memoMutation.mutate(
      { weekId: data.weekId, memo },
      {
        onSuccess: () => {
          setSaved(true);
          toast.info("저장이 완료되었습니다.");
        },
        onError: () => {
          toast.error("저장에 실패했습니다. 다시 시도해 주세요.");
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-5">
      <h1 className="text-head-03 text-gray-800 self-start ml-2 mb-6">
        나의 발견
      </h1>

      {isReadOnly ? (
        <TextCard text={displayText} className="max-w-full" />
      ) : (
        <TextInput
          text={memo}
          setText={setMemo}
          maxLength={100}
          placeholder="이번 주 내가 스스로 발견한 것을 써 보세요."
          buttonLabel="저장하기"
          onSubmit={handleSave}
          isSubmitting={memoMutation.isPending}
        />
      )}
    </div>
  );
}
