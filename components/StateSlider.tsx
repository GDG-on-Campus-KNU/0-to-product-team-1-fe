import React, { useState } from "react";

import { Slider } from "@/components/ui/slider";
import {
  STATE_CONFIG,
  type StateVariantType,
} from "@/lib/constants/state-config";
import { cn } from "@/lib/utils";

const SLIDER_STYLE_MAP: Record<
  StateVariantType,
  { trackColor: string; ringColor: string }
> = {
  condition: {
    trackColor: "[&_[data-slot=slider-range]]:bg-blue-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-blue-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-blue-400/50",
  },
  sleep: {
    trackColor: "[&_[data-slot=slider-range]]:bg-green-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-green-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-green-400/50",
  },
  exercise: {
    trackColor: "[&_[data-slot=slider-range]]:bg-beige-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-beige-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-gray-beige-400/50",
  },
  social: {
    trackColor: "[&_[data-slot=slider-range]]:bg-pink-400",
    ringColor:
      "[&_[data-slot=slider-thumb]]:hover:ring-pink-400/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-pink-400/50",
  },
};

interface StateSliderProps {
  variant: StateVariantType;
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
  const config = STATE_CONFIG[variant];
  const style = SLIDER_STYLE_MAP[variant];
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
            style.trackColor,
            style.ringColor,
          )}
        />
      </div>
    </div>
  );
}
