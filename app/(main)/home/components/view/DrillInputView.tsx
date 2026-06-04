"use client";

import { StateSlider } from "@/app/(main)/home/components/StateSlider";
import { TextInput } from "@/app/(main)/home/components/TextInput";
import { Button } from "@/components/ui/button";

import { EntryData } from "../../hooks/useEntryData";

interface DrillInputViewProps {
  entryData: EntryData;
  onSubmit?: () => void;
}

export function DrillInputView({ entryData, onSubmit }: DrillInputViewProps) {
  const {
    text,
    setText,
    condition,
    setCondition,
    sleep,
    setSleep,
    exercise,
    setExercise,
    social,
    setSocial,
  } = entryData;

  return (
    <div className="flex w-full max-w-sm flex-col gap-12">
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-head-03 text-gray-700">
          Q. 오늘 가장 신경쓰였던 일이 무엇이었나요?
        </h1>
        <TextInput text={text} setText={setText} maxLength={200} />
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-head-03 text-gray-700">
            Q. 오늘 나의 상태는 어떤가요?
          </h1>
          <span className="text-label-04 text-gray-700">
            글에서는 드러나지 않는 나의 몸 상태도 알아차려 보아요.
          </span>
        </div>
        <div className="flex w-full flex-col gap-6">
          <StateSlider
            variant="condition"
            value={condition}
            onValueChange={setCondition}
          />
          <StateSlider variant="sleep" value={sleep} onValueChange={setSleep} />
          <StateSlider
            variant="exercise"
            value={exercise}
            onValueChange={setExercise}
          />
          <StateSlider
            variant="social"
            value={social}
            onValueChange={setSocial}
          />
        </div>
      </div>

      <div className="mt-2 flex w-full">
        <Button
          className="w-full py-8 text-(length:--text-body-01) font-bold text-white shadow-sm"
          onClick={onSubmit}
        >
          오늘의 드릴 추천받기
        </Button>
      </div>
    </div>
  );
}
