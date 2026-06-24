import {
  Angry,
  AlertCircle,
  CloudRain,
  ShieldAlert,
  Minus,
  Eye,
  ArrowLeftRight,
  Gavel,
  Telescope,
  HeartCrack,
  Infinity,
  type LucideIcon,
} from "lucide-react";

export interface InsightConfig {
  icon: LucideIcon;
  label: string;
}

export const EMOTION_CONFIG: Record<string, InsightConfig> = {
  분노: { icon: Angry, label: "분노" },
  불안: { icon: AlertCircle, label: "불안" },
  우울: { icon: CloudRain, label: "우울" },
  죄책: { icon: ShieldAlert, label: "죄책" },
  중립: { icon: Minus, label: "중립" },
};

export const PATTERN_CONFIG: Record<string, InsightConfig> = {
  독심술: { icon: Eye, label: "독심술" },
  이분법: { icon: ArrowLeftRight, label: "이분법" },
  당위진술: { icon: Gavel, label: "당위진술" },
  미래예측: { icon: Telescope, label: "미래예측" },
  자기비난: { icon: HeartCrack, label: "자기비난" },
  과잉일반화: { icon: Infinity, label: "과잉일반화" },
};
