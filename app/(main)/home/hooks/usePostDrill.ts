"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export type CreateEntryRequest = {
  text: string;
  context: {
    sleep_hours: number;
    social_today: string; // social type?
    exercise_today: number;
    self_condition: number;
  };
  self_condition: number;
};

export type CleanDrill = {
  type: "drill";
  id: number;
  name: string;
  duration_min: number;
  instruction: string;
  citation: string;
  evidence_span: string;
};

export type CleanCrisis = {
  type: "crisis_card";
  crisis_resources: Record<string, string>;
};

export type CleanResult = CleanDrill | CleanCrisis;

export async function createEntryAndGetDrill(
  data: CreateEntryRequest,
): Promise<CleanResult> {
  const response = await axiosInstance.post(API.ENTRY.CREATE_POST, data);

  const rawData = response.data;
  const recommendation = rawData.recommendationJson;
  const labelResult = rawData.labelResultJson;

  if (recommendation.type === "drill") {
    return {
      type: "drill",
      id: recommendation.drill.id,
      name: recommendation.drill.name,
      duration_min: recommendation.drill.duration_min,
      instruction: recommendation.drill.instruction,
      citation: recommendation.drill.citation,
      evidence_span: labelResult.evidence_span,
    } as CleanDrill;
  }

  if (recommendation.type === "crisis_card") {
    return {
      type: "crisis_card",
      crisis_resources: recommendation.crisis_resources,
    } as CleanCrisis;
  }

  throw new Error("알 수 없는 추천 타입이 반환되었습니다.");
}

export function usePostDrill() {
  return useMutation({
    mutationFn: (data: CreateEntryRequest) => createEntryAndGetDrill(data),

    onSuccess: (cleanData) => {
      if (cleanData.type === "drill") {
        console.info("일반 드릴 추천됨:", cleanData);
      } else {
        console.info("위기 카드 추천됨:", cleanData);
      }
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "기록 저장에 실패했습니다.",
      );
    },
  });
}
