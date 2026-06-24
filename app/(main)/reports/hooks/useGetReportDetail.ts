import { useQuery } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export type ReportDetail = {
  weekId: string;
  userId: number;
  isChecked: boolean;
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
    self_check_quiz: {
      question: string;
      options: { label: string; value: string }[];
    };
  };
  visualizationsJson: {
    pattern_diff: {
      prev_percent: number;
      pattern: string;
      delta_percent: number;
      arrow: string;
      current_percent: number;
    }[];

    condition_flow: {
      points: {
        dow: string;
        count: number;
        avg_condition: number;
      }[];
    };
    discoveries: {
      source: string;
      category: string;
      count?: number;
      text: string;
    }[];

    emotion_pentagon: {
      axes: {
        label: string;
        value: number;
      }[];
      dominant: string;
      entries_used: number;
    };
    weekly_coaching: {
      state: {
        key: string;
        label: string;
        summary: string;
      };
      next_week_focus: {
        category: string;
        label_ko: string;
        reason: string;
      };
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
  userMemo: string | null;
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
