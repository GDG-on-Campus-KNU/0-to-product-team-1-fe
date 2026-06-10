import { useQuery } from "@tanstack/react-query";

import { DrillGetResponse } from "@/app/(main)/home/hooks/useGetDrill";
import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

const getDailyDrill = async (date: string): Promise<DrillGetResponse> => {
  const { data } = await axiosInstance.get(API.RECORD.DAILY_GET(date));
  return data;
};

export const useGetDailyDrill = ({ date }: { date: string | undefined }) => {
  return useQuery<DrillGetResponse>({
    queryKey: ["daily-drill", date],
    queryFn: () => getDailyDrill(date!),
    enabled: !!date,
  });
};
