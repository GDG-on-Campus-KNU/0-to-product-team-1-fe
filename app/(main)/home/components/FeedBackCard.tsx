"use client";

import React, { useState } from "react";

import { ThumbsUp, ThumbsDown } from "lucide-react";

export function FeedBackCard() {
  const [feedback, setFeedback] = useState<"helpful" | "unhelpful" | null>(
    null,
  );

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6 px-6 py-8">
      <h2 className="text-body-01 text-gray-700">오늘의 드릴이 어땠나요?</h2>

      <div className="flex w-full items-stretch justify-center gap-3">
        <button
          onClick={() => setFeedback("helpful")}
          className={`flex flex-1 items-center justify-center gap-2.5 rounded-4xl border border-gray-400 px-4 py-4 transition-all active:scale-95 ${
            feedback === "helpful"
              ? "bg-gray-400 text-white"
              : "bg-muted text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ThumbsUp className="size-6 shrink-0" strokeWidth={2} />
          <span className="text-label-01 leading-snug text-left break-keep">
            도움돼요
          </span>
        </button>

        <button
          onClick={() => setFeedback("unhelpful")}
          className={`flex flex-1 items-center justify-center gap-2.5 rounded-4xl border border-gray-400 px-4 py-4 transition-all active:scale-95 ${
            feedback === "unhelpful"
              ? "bg-gray-400 text-white"
              : "bg-muted text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ThumbsDown className="size-6 shrink-0" strokeWidth={2} />
          <span className="text-label-01 leading-snug text-left break-keep">
            도움안돼요
          </span>
        </button>
      </div>
    </div>
  );
}
