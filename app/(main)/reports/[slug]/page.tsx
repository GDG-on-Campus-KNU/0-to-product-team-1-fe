"use client";

import { useState } from "react";

import { useParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

import { isoWeekToKorean } from "@/app/(main)/reports/utils/isoWeekToKorean";
import { QuizModal } from "@/components/QuizModal";

import { useGetReportDetail } from "../hooks/useGetReportDetail";
import ConditionFlow from "./components/ConditionFlow";
import DailyDrillRecord from "./components/DailyDrillRecord";
import InsightOfWeek from "./components/InsightOfWeek";
import LifeSummary from "./components/LifeSummary";
import MyInsight from "./components/MyInsight";
import PatternDifference from "./components/PatternDifference";
import WeeklyEmotionDistribution from "./components/WeeklyEmotionDistribution";

export default function ReportDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGetReportDetail({ weekId: slug });
  const [quizClosed, setQuizClosed] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-10">
        <BeatLoader size={12} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-label-02 text-gray-400">데이터를 불러올 수 없습니다</p>
    );
  }

  const showQuiz = !data.isChecked && !quizClosed;

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full p-5">
      <DailyDrillRecord />
      <WeeklyEmotionDistribution />
      <LifeSummary />
      <ConditionFlow />
      <PatternDifference />
      <InsightOfWeek />
      <MyInsight />

      {showQuiz && (
        <QuizModal
          weekId={data.weekId}
          period={isoWeekToKorean(data.weekId)}
          question={data.blocksJson.self_check_quiz.question}
          choices={data.blocksJson.self_check_quiz.options}
          onClose={() => setQuizClosed(true)}
        />
      )}
    </div>
  );
}
