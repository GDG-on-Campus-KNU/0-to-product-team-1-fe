import { useQuery } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export type CalendarRecord = {
  date: string;
  drillId: number;
  isCompleted: boolean;
};

const getCalendar = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<CalendarRecord[]> => {
  const { data } = await axiosInstance.get(API.RECORD.CALENDAR_GET, {
    params: { year, month },
  });
  return data;
};

export const useGetCalendar = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  return useQuery<CalendarRecord[]>({
    queryKey: ["calendar", year, month],
    queryFn: () => getCalendar({ year, month }),
  });
};
