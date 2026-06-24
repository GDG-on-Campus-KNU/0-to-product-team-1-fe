"use client";

import { useEffect } from "react";

import { ScanFace, ScanHeart } from "lucide-react";

import { DrillCard } from "@/components/DrillCard";
import { TextCard } from "@/components/TextCard";
import { EMOTION_CONFIG, PATTERN_CONFIG } from "@/lib/constants/insight-config";

import { EntryData } from "../../hooks/useEntryData";
import { useFeedback } from "../../hooks/useFeedback";
import { useFeedbackData } from "../../hooks/useFeedbackData";
import { DrillGetResponse } from "../../hooks/useGetDrill";
import type { CleanDrill } from "../../hooks/usePostDrill";
import { FeedBackCard } from "../FeedBackCard";
import { StateCard } from "../StateCard";

interface DrillResultViewProps {
  data: CleanDrill;
  entryData: EntryData;
  drillData: DrillGetResponse;
  readOnly?: boolean;
}

export function DrillResultView({
  data,
  entryData,
  drillData,
  readOnly = false,
}: DrillResultViewProps) {
  const feedbackData = useFeedbackData();
  const feedbackMutation = useFeedback({ entryId: drillData.entryId });

  const { setDrillCompleted, setHelpful } = feedbackData;

  useEffect(() => {
    setDrillCompleted(drillData.drillCompleted ?? false);
    setHelpful(drillData.helpful ?? null);
  }, [
    setDrillCompleted,
    setHelpful,
    drillData.drillCompleted,
    drillData.helpful,
  ]);

  const { emotions, patterns } = drillData.labelResultJson;
  const topEmotion = Object.entries(emotions).sort((a, b) => b[1] - a[1])[0][0];
  const topPattern = Object.entries(patterns).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="flex w-full max-w-sm flex-col gap-10">
      <DrillCard
        id={data.id}
        name={data.name}
        duration_min={data.duration_min}
        instruction={data.instruction}
        citation={data.citation}
        evidence_span={data.evidence_span}
        feedbackData={feedbackData}
        feedbackMutation={feedbackMutation}
        readOnly={readOnly}
      />
      <div className="flex w-full flex-col gap-6">
        <h2 className="text-body-01 text-gray-700">
          오늘 나의 사고패턴과 감정이에요.
        </h2>
        <div className="flex w-full gap-5">
          {(() => {
            const PatternIcon = PATTERN_CONFIG[topPattern]?.icon ?? ScanFace;
            return (
              <div className="flex flex-1 flex-col items-center gap-2 rounded-3xl bg-blue-200 p-4">
                <PatternIcon className="size-10 text-gray-500" />
                <span className="text-label-04 text-gray-500">사고패턴</span>
                <span className="text-body-02 text-gray-800">{topPattern}</span>
              </div>
            );
          })()}
          {(() => {
            const EmotionIcon = EMOTION_CONFIG[topEmotion]?.icon ?? ScanHeart;
            return (
              <div className="flex flex-1 flex-col items-center gap-2 rounded-3xl bg-pink-200 p-4">
                <EmotionIcon className="size-10 text-gray-500" />
                <span className="text-label-04 text-gray-500">감정</span>
                <span className="text-body-02 text-gray-800">{topEmotion}</span>
              </div>
            );
          })()}
        </div>
      </div>
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
      {!readOnly && feedbackData.helpful === null && (
        <FeedBackCard
          feedbackData={feedbackData}
          feedbackMutation={feedbackMutation}
        />
      )}
    </div>
  );
}
