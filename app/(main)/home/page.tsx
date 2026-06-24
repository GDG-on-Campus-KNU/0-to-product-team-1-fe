"use client";

import { useEffect, useRef, useState } from "react";

import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import {
  getSocialLabelForAPI,
  getSocialValueForAPI,
} from "@/lib/constants/state-config";

import { CrisisResultView } from "./components/view/CrisisResultView";
import { DrillInputView } from "./components/view/DrillInputView";
import { DrillLoadingView } from "./components/view/DrillLoadingView";
import { DrillResultView } from "./components/view/DrillResultView";
import { useEntryData } from "./hooks/useEntryData";
import { useGetDrill } from "./hooks/useGetDrill";
import {
  processResponseToCleanData,
  RawData,
  usePostDrill,
  type CleanResult,
} from "./hooks/usePostDrill";

type Step = "INPUT" | "LOADING" | "RESULT";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("INPUT");
  const [resultData, setResultData] = useState<CleanResult | null>(null);

  const drillMutation = usePostDrill();

  const entryData = useEntryData();

  const { data: drillData, isLoading } = useGetDrill();
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current && drillData?.hasDrill) {
      hasInitialized.current = true;
      entryData.setCondition(drillData.contextJson.self_condition);
      entryData.setExercise(drillData.contextJson.exercise_today);
      entryData.setSleep(drillData.contextJson.sleep_hours);
      entryData.setSocial(
        getSocialValueForAPI(drillData.contextJson.social_today),
      );
      entryData.setText(drillData.text);
      setResultData(processResponseToCleanData(drillData as RawData));
      setCurrentStep("RESULT");
      toast.info("오늘은 이미 작성을 하셨어요, 내일 또다시 봐요!");
    }
  }, [drillData, drillData?.hasDrill, entryData]);

  if (drillData)
    console.info("home drillData:", JSON.stringify(drillData, null, 2));

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-10 w-full p-5">
        오늘의 드릴이 있는지 찾는 중입니다
        <BeatLoader size={10} />
      </div>
    );
  }

  const handleInputSubmit = () => {
    setCurrentStep("LOADING");

    drillMutation.mutate(
      {
        text: entryData.text,
        context: {
          sleep_hours: entryData.sleep,
          social_today: getSocialLabelForAPI(entryData.social), // social type?
          exercise_today: entryData.exercise,
          self_condition: entryData.condition,
        },
        self_condition: entryData.condition,
      },
      {
        onSuccess: (result) => {
          setResultData(result);
          setCurrentStep("RESULT");
        },
        onError: (error) => {
          toast.error(error.message);
          setCurrentStep("INPUT");
        },
      },
    );
  };

  return (
    <div className="flex flex-1 flex-col items-center w-full p-5">
      {currentStep === "INPUT" && (
        <DrillInputView entryData={entryData} onSubmit={handleInputSubmit} />
      )}

      {currentStep === "LOADING" && <DrillLoadingView />}

      {currentStep === "RESULT" &&
        resultData &&
        (resultData.type === "drill" ? (
          <DrillResultView
            data={resultData}
            entryData={entryData}
            drillData={drillData!}
          />
        ) : (
          <CrisisResultView data={resultData} />
        ))}
    </div>
  );
}
