import { useQuery } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";
import { SocialLabel } from "@/lib/constants/state-config";

export interface DrillGetResponse {
  hasDrill: boolean;
  entryId: number;
  text: string;
  drillId: number;
  drillCategory: string;
  drillCalendarColor: string;
  labelResultJson: {
    emotions: {
      분노: number;
      불안: number;
      우울: number;
      죄책: number;
      중립: number;
    };
    patterns: {
      독심술: number;
      이분법: number;
      당위진술: number;
      미래예측: number;
      자기비난: number;
      과잉일반화: number;
    };
    behaviors: {
      동기저하: number;
      회피미루기: number;
    };
    intensity: number;
    confidence: number;
    labeled_at: Date;
    model_used: string;
    evidence_span: string;
    crisis_detected: boolean;
    clarified_winner: string;
    calendar_dominant: string;
    clarification_reason: string;
    clarification_applied: {
      boost: number;
      choice: string;
      candidates: string[];
    };
    evidence_span_warning: string;
  };
  recommendationJson: {
    why: {
      text: string;
      tone: string;
      factors: unknown[];
      mechanism: string;
      expected_benefit: string;
    };
    copy: {
      line1: string;
      line2: string;
      line3: string;
    };
    tone: string;
    type: "drill" | "crisis_card";
    drill: {
      id: number;
      name: string;
      category: string;
      citation: string;
      instruction: string;
      duration_min: number;
    };
    reason: string;
  };
  drillCompleted: boolean;
  helpful: boolean;
  contextJson: {
    sleep_hours: number;
    social_today: SocialLabel;
    exercise_today: number;
    self_condition: number;
  };
  recordedDate: Date;
  createdAt: Date;
}

const getDrill = async (): Promise<DrillGetResponse> => {
  const { data } = await axiosInstance.get(API.DRILL.TODAY_GET);
  return data;
};

export const useGetDrill = () => {
  return useQuery<DrillGetResponse>({
    queryKey: ["drill", "today"],
    queryFn: getDrill,
  });
};
