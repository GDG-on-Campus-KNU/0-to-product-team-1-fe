import { useMutation } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

const patchWeeklyMemo = async ({
  weekId,
  memo,
}: {
  weekId: string;
  memo: string;
}) => {
  const { data } = await axiosInstance.patch(
    API.REPORT.WEEKLY_MEMO_PATCH(weekId),
    { memo },
  );
  return data;
};

export const usePatchWeeklyMemo = () => {
  return useMutation({
    mutationFn: patchWeeklyMemo,
  });
};
