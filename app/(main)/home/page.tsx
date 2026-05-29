"use client";

import React, { useState } from "react";

import { CrisisResultView } from "./components/view/CrisisResultView";
import { DrillInputView } from "./components/view/DrillInputView";
import { DrillLoadingView } from "./components/view/DrillLoadingView";
import { DrillResultView } from "./components/view/DrillResultView";
import type { CleanResult } from "./hooks/useGetDrill";
import { MOCK_CRISIS, MOCK_DRILL } from "./mock/mockResult";

type Step = "INPUT" | "LOADING" | "RESULT";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("INPUT");
  const [resultData, setResultData] = useState<CleanResult | null>(null);

  const TEST_IS_DRILL = true;

  const handleInputSubmit = () => {
    setCurrentStep("LOADING");

    setTimeout(() => {
      setResultData(TEST_IS_DRILL ? MOCK_DRILL : MOCK_CRISIS);
      setCurrentStep("RESULT");
    }, 1500);
  };

  return (
    <div className="flex flex-1 flex-col items-center w-full p-5">
      {currentStep === "INPUT" && (
        <DrillInputView onSubmit={handleInputSubmit} />
      )}

      {currentStep === "LOADING" && <DrillLoadingView />}

      {currentStep === "RESULT" &&
        resultData &&
        (resultData.type === "drill" ? (
          <DrillResultView data={resultData} />
        ) : (
          <CrisisResultView data={resultData} />
        ))}
    </div>
  );
}
