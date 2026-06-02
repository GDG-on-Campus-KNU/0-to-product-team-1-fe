import { useQuery } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export interface DrillGetResponse {
  hasDrill: boolean;
  entryId: number;
  text: string;
  drillId: unknown;
  drillCategory: unknown;
  drillCalendarColor: unknown;
  labelResultJson: unknown;
  recommendationJson: unknown;
  drillCompleted: unknown;
  helpful: boolean;
  contextJson: unknown;
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
