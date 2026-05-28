"use client";

import React from "react";

import {
  STATE_CONFIG,
  type StateVariantType,
} from "@/lib/constants/state-config";
import { cn } from "@/lib/utils";

const CARD_STYLE_MAP: Record<StateVariantType, { iconColor: string }> = {
  condition: { iconColor: "text-blue-600" },
  sleep: { iconColor: "text-green-600" },
  exercise: { iconColor: "text-beige-600" },
  social: { iconColor: "text-pink-600" },
};

interface StateCardProps {
  variant: StateVariantType;
  value: number;
  className?: string;
}

export function StateCard({ variant, value, className }: StateCardProps) {
  const config = STATE_CONFIG[variant];
  const style = CARD_STYLE_MAP[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-4xl bg-muted p-6 py-4 shadow-sm transition-all",
        className,
      )}
    >
      <Icon className={cn("size-7", style.iconColor)} strokeWidth={2} />

      <span className="mt-2 text-body-04 text-gray-600">{config.label}</span>

      <span className="mt-1 text-head-03 text-gray-700">
        {config.formatValue(value)}
      </span>
    </div>
  );
}
