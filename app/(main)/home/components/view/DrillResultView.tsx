"use client";

import React from "react";

import { DrillCard } from "@/components/DrillCard";
import { TextCard } from "@/components/TextCard";

import type { CleanDrill } from "../../hooks/useGetDrill";
import { FeedBackCard } from "../FeedBackCard";
import { StateCard } from "../StateCard";

interface DrillResultViewProps {
  data: CleanDrill;
}

export function DrillResultView({ data }: DrillResultViewProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-10">
      <DrillCard
        id={data.id}
        name={data.name}
        duration_min={data.duration_min}
        instruction={data.instruction}
        citation={data.citation}
        evidence_span={data.evidence_span}
      />
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-body-01 text-gray-700">
          Q. 오늘 가장 신경쓰였던 일이 무엇이었나요?
        </h1>
        <TextCard text="오늘은 진행 중인 프로젝트의 디자인 시스템을 수정하는 과정에서 컴포넌트 구조를 어떻게 잡아야 할지 고민하느라 시간이 많이 쓰였습니다. 그래도 하나씩 정리되어 가는 느낌이라 뿌듯하네요!" />
      </div>
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-body-01 text-gray-700">
          Q. 오늘 나의 상태는 어떤가요?
        </h1>
        <div className="grid w-full grid-cols-2 gap-4">
          <StateCard variant="sleep" value={7.5} />
          <StateCard variant="exercise" value={1} />
          <StateCard variant="condition" value={4} />
          <StateCard variant="social" value={2} />
        </div>
      </div>
      <FeedBackCard />
    </div>
  );
}
