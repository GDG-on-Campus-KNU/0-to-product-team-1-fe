"use client";

import { useState } from "react";

import { toast } from "react-toastify";

import { getSocialLabelForAPI } from "@/lib/constants/state-config";

import { CrisisResultView } from "./components/view/CrisisResultView";
import { DrillInputView } from "./components/view/DrillInputView";
import { DrillLoadingView } from "./components/view/DrillLoadingView";
import { DrillResultView } from "./components/view/DrillResultView";
import { useEntryData } from "./hooks/useEntryData";
import { usePostDrill, type CleanResult } from "./hooks/usePostDrill";

type Step = "INPUT" | "LOADING" | "RESULT";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("INPUT");
  const [resultData, setResultData] = useState<CleanResult | null>(null);

  const drillMutation = usePostDrill();

  const entryData = useEntryData();

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
          <DrillResultView data={resultData} entryData={entryData} />
        ) : (
          <CrisisResultView data={resultData} />
        ))}
    </div>
  );
}
