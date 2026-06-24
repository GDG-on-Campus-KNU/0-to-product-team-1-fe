"use client";

import { useState } from "react";

import { createPortal } from "react-dom";

import { HeartPulse } from "lucide-react";

import {
  QuizResponse,
  usePatchQuiz,
} from "@/app/(main)/reports/hooks/usePatchQuiz";

type Step = "quiz" | "loading" | "result";

interface QuizModalProps {
  weekId: string;
  period: string;
  question: string;
  choices: { label: string; value: string }[];
  onClose: () => void;
}

export function QuizModal({
  weekId,
  period,
  question,
  choices,
  onClose,
}: QuizModalProps) {
  const [step, setStep] = useState<Step>("quiz");
  const [result, setResult] = useState<QuizResponse | null>(null);

  const quizMutation = usePatchQuiz();

  const handleChoiceClick = (value: string) => {
    setStep("loading");
    quizMutation.mutate(
      { week: weekId, predicted: value },
      {
        onSuccess: (res) => {
          setResult(res);
          setStep("result");
        },
        onError: () => {
          setStep("quiz");
        },
      },
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative flex w-[90vw] max-w-sm flex-col rounded-3xl bg-white p-6 pb-4 gap-6 shadow-xl">
        <span className="text-label-01 text-center text-gray-700">
          {period} 퀴즈
        </span>

        {step === "quiz" && (
          <>
            <h2 className="text-body-01 text-gray-800">Q. {question}</h2>
            <div className="grid grid-cols-2 gap-3 pb-4">
              {choices.map((choice) => (
                <button
                  key={choice.value}
                  onClick={() => handleChoiceClick(choice.value)}
                  className="rounded-2xl border border-gray-200 bg-gray-50 py-4 text-body-02 text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-100">
              <HeartPulse
                className="w-14 h-14 text-gray-500 animate-pulse"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-body-01 text-gray-700">정답 확인중입니다...</p>
            <div className="flex gap-2.5">
              <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div className="flex flex-col items-center gap-6 py-4">
            <span
              className={`text-[72px] font-bold leading-none ${result.match ? "text-green-500" : "text-red-500/60"}`}
            >
              {result.match ? "O" : "X"}
            </span>
            <p className="text-body-01 pb-4 text-gray-700 text-center">
              이번주에는 &ldquo;<strong>{result.correct}</strong>&rdquo;이(가)
              <br />
              <strong>{result.actual_ratio_percent}%</strong>만큼 나타났어요.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded-2xl bg-gray-700 hover:bg-gray-800 py-4 text-body-02 text-white"
            >
              {result.match ? "확인" : "닫기"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
