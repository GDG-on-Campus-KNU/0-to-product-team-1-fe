"use client";

import React, { useState } from "react";

import { BrainCircuit } from "lucide-react";

import type { CleanDrill } from "@/app/(main)/home/hooks/useGetDrill";
import { Switch } from "@/components/ui/switch";

type DrillCardProps = Omit<CleanDrill, "type" | "id">;

export function DrillCard({
  name,
  duration_min,
  instruction,
  citation,
  evidence_span,
}: DrillCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-4xl bg-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-400">
            <BrainCircuit className="size-6 text-gray-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-label-01 text-gray-600">
              오늘의 마음 드릴
            </span>
            <h2 className="text-head-03 text-black break-keep">{name}</h2>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 rounded-full bg-white/50 px-3.5 py-2 shadow-sm">
          <Switch
            checked={isCompleted}
            onCheckedChange={setIsCompleted}
            className="data-checked:bg-gray-600! data-unchecked:bg-gray-300! **:data-[slot=switch-thumb]:border-0 **:data-[slot=switch-thumb]:mb-px **:data-[slot=switch-thumb]:bg-white!"
          />
          <span
            className={`text-label-01 transition-colors ${
              isCompleted ? "text-gray-600" : "text-gray-500"
            }`}
          >
            {isCompleted ? "완료됨" : "미완료"}
          </span>
        </div>
      </div>

      <p className="text-body-04 text-gray-700">{instruction}</p>

      <div className="flex flex-col gap-2.5 rounded-2xl bg-white/40 p-4">
        <p className="text-label-02 text-gray-700">
          텍스트에서 &quot;
          {evidence_span}&quot; 라는 문구가 발견되었어요.
        </p>
      </div>
      <div className="flex flex-col items-start text-label-02 text-gray-500">
        <span>예상 소요 시간: {duration_min}분</span>
        <span>출처: {citation}</span>
      </div>
    </div>
  );
}
