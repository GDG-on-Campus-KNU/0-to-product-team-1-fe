"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export interface EntryFeedbackRequest {
  drill_completed: boolean;
  helpful: boolean | null;
}

export interface EntryFeedbackResponse {
  code: string;
  message: string;
  data: string;
}

export async function feedback(
  entryId: number,
  body: EntryFeedbackRequest,
): Promise<EntryFeedbackResponse> {
  const response = await axiosInstance.patch<EntryFeedbackResponse>(
    API.ENTRY.FEEDBACK_PATCH(entryId),
    body,
  );

  return response.data;
}

export function useFeedback({ entryId }: { entryId: number }) {
  return useMutation({
    mutationFn: ({ body }: { body: EntryFeedbackRequest }) =>
      feedback(entryId, body),

    onSuccess: () => {
      //toast.success("피드백이 저장되었습니다."); // 성공시 UI만 업뎃
    },

    onError: (error) => {
      const axiosError = error as AxiosError<EntryFeedbackResponse>;
      toast.error(`${axiosError.response?.data.message}`);
    },
  });
}
