"use client";

import { useState } from "react";

import { QuizModal } from "@/components/QuizModal";

const MOCK_QUIZ = {
  weekId: "2026-W20",
  period: "5월 2주차",
  question: "이번 주 가장 자주 보인 패턴이 100%였어요. 무엇이었을까요?",
  choices: [
    { label: "미래예측", value: "미래예측" },
    { label: "당위진술", value: "당위진술" },
    { label: "독심술", value: "독심술" },
    { label: "모르겠다", value: "모르겠다" },
  ],
};

export default function QuizTestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-head-03 text-gray-700">퀴즈 모달 테스트</h1>
      <button
        className="rounded-2xl bg-gray-800 px-6 py-3 text-white text-body-02"
        onClick={() => setOpen(true)}
      >
        모달 열기
      </button>

      {open && (
        <QuizModal
          weekId={MOCK_QUIZ.weekId}
          period={MOCK_QUIZ.period}
          question={MOCK_QUIZ.question}
          choices={MOCK_QUIZ.choices}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
