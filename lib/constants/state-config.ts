import { MoonStar, Smile, Dumbbell, UsersRound } from "lucide-react";

export const STATE_CONFIG = {
  condition: {
    label: "컨디션",
    icon: Smile,
    min: 1,
    max: 5,
    step: 1,
    formatValue: (val: number) => `${val} 단계`,
  },
  sleep: {
    label: "수면 시간",
    icon: MoonStar,
    min: 0,
    max: 12,
    step: 0.5,
    formatValue: (val: number) =>
      Number.isInteger(val) ? `${val}h` : `${Math.floor(val)}h 30m`,
  },
  exercise: {
    label: "운동 시간",
    icon: Dumbbell,
    min: 0,
    max: 12,
    step: 0.5,
    formatValue: (val: number) =>
      Number.isInteger(val) ? `${val}h` : `${Math.floor(val)}h 30m`,
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
  },
} as const;

export type StateVariantType = keyof typeof STATE_CONFIG;
