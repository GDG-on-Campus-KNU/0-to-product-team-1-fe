import { useQuery } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export type ReportDetail = {
  weekId: string;
  userId: number;
  blocksJson: {
    block3_weekly_tip: {
      tip: string;
      source: string;
    };
    block1_action_rate: {
      rate: number;
      description: string;
    };
    block2_emotion_summary: {
      description: string;
      primary_emotion: string;
    };
  };
  visualizationsJson: {
    emotion_trend: {
      day: string;
      score: number;
    }[];
    category_distribution: {
      호흡: number;
      마음챙김: number;
      인지재구성: number;
    };
  };
  dailyDrills: {
    date: string;
    drillCategory: string;
    drillCompleted: boolean | null;
  }[];
  lifestyleSummary: {
    avgSleepHours: number;
    avgExerciseMinutes: number;
    avgCondition: number;
    socialMode: string;
    prevWeekSleepHours: number;
    prevWeekExerciseMinutes: number;
    prevWeekCondition: number;
    prevWeekSocialMode: unknown;
  };
  generatedAt: string;
};

export type ReportDetailGetResponse = ReportDetail;

const getReportDetail = async ({
  weekId,
}: {
  weekId: string;
}): Promise<ReportDetailGetResponse> => {
  const { data } = await axiosInstance.get(
    API.REPORT.WEEKLY_DETAIL_GET(weekId),
  );
  return data;
};

export const useGetReportDetail = ({ weekId }: { weekId: string }) => {
  return useQuery<ReportDetailGetResponse>({
    queryKey: ["report", weekId],
    queryFn: () => getReportDetail({ weekId }),
    enabled: !!weekId,
  });
};
