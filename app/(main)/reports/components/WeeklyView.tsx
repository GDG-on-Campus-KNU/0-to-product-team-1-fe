"use client";
import { BeatLoader } from "react-spinners";

import { WeekCard } from "./WeekCard";
import { useGetReports } from "../hooks/useGetReports";
import { groupByMonth } from "../utils/date";

export function WeeklyView() {
  const { data, isLoading, isError } = useGetReports();

  if (isError) {
    return (
      <p className="text-label-02 text-gray-400">데이터를 불러올 수 없습니다</p>
    );
  }

  const grouped = data ? groupByMonth(data) : [];

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 pt-6">
      <div className="flex flex-col gap-1">
        <span className="text-label-2 text-gray-400">주간 기록</span>
        <h1 className="text-head-03 text-foreground">
          마음의 발자취를
          <br />
          확인해보세요
        </h1>
      </div>

      {isLoading && (
        <div className="flex justify-center pt-10">
          <BeatLoader size={12} />
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-6">
          {grouped.map(([month, reports], monthIndex) => (
            <div key={month} className="flex flex-col">
              <span className="text-body-01 text-gray-700 mb-4 px-1">
                {month}
              </span>

              <div className="flex flex-col gap-4">
                {reports.map((report, index) => {
                  return (
                    <WeekCard
                      key={report.weekId}
                      report={report}
                      month={month}
                      isRecent={monthIndex === 0 && index === 0}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
