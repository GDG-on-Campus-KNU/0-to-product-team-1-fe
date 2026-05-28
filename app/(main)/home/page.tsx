/*"use client";

import React, { useState } from "react"; // 💡 useEffect 제거 완료

import { CrisisResultView } from "./components/CrisisResultView";
import { DrillInputView } from "./components/DrillInputView";
import { DrillLoadingView } from "./components/DrillLoadingView";
import { DrillResultView } from "./components/DrillResultView";
import type { CleanResult } from "./hooks/useGetDrill";
import { MOCK_CRISIS } from "./mock/mockResult";

type Step = "INPUT" | "LOADING" | "RESULT";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("INPUT");
  const [resultData, setResultData] = useState<CleanResult | null>(null);

  const TEST_IS_DRILL = false;

  const handleInputSubmit = (text: string) => {
    console.log("입력된 텍스트:", text); // 💡 text 미사용 에러 해결 완료

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
}*/
"use client";

import React from "react";

import { DrillResultView } from "./components/view/DrillResultView";
import { MOCK_DRILL } from "./mock/mockResult"; // 💡 목데이터 경로만 맞춰주세요

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center w-full p-5">
      {/* 🚨 에러 나는 컴포넌트 싹 다 치우고 위기 카드만 바로 렌더링! */}
      <DrillResultView data={MOCK_DRILL} />
    </div>
  );
}
