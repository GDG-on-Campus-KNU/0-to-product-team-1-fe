"use client";

import React from "react";

import { DrillCard } from "@/components/DrillCard";
import { TextCard } from "@/components/TextCard";

import { EntryData } from "../../hooks/useEntryData";
import type { CleanDrill } from "../../hooks/usePostDrill";
import { FeedBackCard } from "../FeedBackCard";
import { StateCard } from "../StateCard";

interface DrillResultViewProps {
  data: CleanDrill;
  entryData: EntryData;
}

export function DrillResultView({ data, entryData }: DrillResultViewProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-10">
      <DrillCard
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
        <TextCard text={entryData.text} />
      </div>
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-body-01 text-gray-700">
          Q. 오늘 나의 상태는 어떤가요?
        </h1>
        <div className="grid w-full grid-cols-2 gap-4">
          <StateCard variant="sleep" value={entryData.sleep} />
          <StateCard variant="exercise" value={entryData.exercise} />
          <StateCard variant="condition" value={entryData.condition} />
          <StateCard variant="social" value={entryData.social} />
        </div>
      </div>
      <FeedBackCard />
    </div>
  );
}
