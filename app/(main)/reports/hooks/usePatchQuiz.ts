import { useMutation } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

interface QuizRequest {
  week: string;
  predicted: string;
}

export interface QuizResponse {
  predicted: string;
  correct: string;
  match: boolean;
  actual_ratio_percent: number;
}

const patchQuiz = async (body: QuizRequest): Promise<QuizResponse> => {
  const { data } = await axiosInstance.patch(
    API.ML_FORWARD.WEEKLY_QUIZ_POST,
    body,
  );
  return data;
};

export const usePatchQuiz = () => {
  return useMutation<QuizResponse, Error, QuizRequest>({
    mutationFn: patchQuiz,
  });
};
