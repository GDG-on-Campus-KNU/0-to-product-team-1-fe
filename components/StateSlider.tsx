import React, { useState } from "react";

import { MoonStar, Smile, Dumbbell, UsersRound } from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const SLIDER_CONFIG = {
  condition: {
    label: "컨디션",
    icon: Smile,
    min: 1,
    max: 5,
    step: 1,
    formatValue: (val: number) => `${val} 단계`,
    trackColor: "[&_[data-slot=slider-range]]:bg-blue-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-blue-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-blue-400/50",
  },
  sleep: {
    label: "수면 시간",
    icon: MoonStar,
    min: 0,
    max: 12,
    step: 0.5,
    formatValue: (val: number) =>
      Number.isInteger(val) ? `${val}h` : `${Math.floor(val)}h 30m`,
    trackColor: "[&_[data-slot=slider-range]]:bg-green-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-green-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-green-400/50",
  },
  exercise: {
    label: "운동 시간",
    icon: Dumbbell,
    min: 0,
    max: 12,
    step: 0.5,
    formatValue: (val: number) =>
      Number.isInteger(val) ? `${val}h` : `${Math.floor(val)}h 30m`,
    trackColor: "[&_[data-slot=slider-range]]:bg-beige-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-beige-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-gray-beige/50",
  },
  social: {
    label: "사교 활동",
    icon: UsersRound,
    min: 1,
    max: 3,
    step: 1,
    formatValue: (val: number) => {
      if (val === 1) return "하";
      if (val === 2) return "중";
      return "상";
    },
    trackColor: "[&_[data-slot=slider-range]]:bg-pink-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-pink-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-pink-400/50",
  },
} as const;

type VariantType = keyof typeof SLIDER_CONFIG;

interface StateSliderProps {
  variant: VariantType;
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  className?: string;
}

export function StateSlider({
  variant,
  defaultValue,
  value,
  onValueChange,
  className,
}: StateSliderProps) {
  const config = SLIDER_CONFIG[variant];
  const Icon = config.icon;

  const [internalValue, setInternalValue] = useState<number>(
    value ?? defaultValue ?? config.min,
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (value: number | readonly number[]) => {
    const val = Array.isArray(value) ? value[0] : value;

    setInternalValue(val);
    if (onValueChange) {
      onValueChange(val);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-sm flex-col gap-5 rounded-4xl border border-border-disabled bg-muted p-6 px-7 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="size-6 text-gray-500" />
          <span className="text-body-03 text-gray-700">{config.label}</span>
        </div>
        <span className="text-body-03 text-black">
          {config.formatValue(currentValue)}
        </span>
      </div>

      <div className="px-1">
        <Slider
          min={config.min}
          max={config.max}
          step={config.step}
          value={[currentValue]}
          onValueChange={handleValueChange}
          className={cn(
            "**:data-[slot=slider-track]:bg-border-disabled",
            "**:data-[slot=slider-thumb]:border-gray-600 **:data-[slot=slider-thumb]:bg-gray-600",
            config.trackColor,
            config.ringColor,
          )}
        />
      </div>
    </div>
  );
}
