import { useQuery } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export type ReportSummary = {
  weekId: string;
  completedDrills: number;
  totalDrills: number;
  generatedAt: string;
};

export type ReportsGetResponse = ReportSummary[];

const geReports = async (): Promise<ReportsGetResponse> => {
  const { data } = await axiosInstance.get(API.REPORT.WEEKLY_LIST_GET);
  return data;
};

export const useGetReports = () => {
  return useQuery<ReportsGetResponse>({
    queryKey: ["reports"],
    queryFn: geReports,
  });
};
