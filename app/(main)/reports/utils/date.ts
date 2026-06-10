import { ReportDetail } from "../hooks/useGetReportDetail";
import { ReportSummary } from "../hooks/useGetReports";

const DAY_KO = ["일", "월", "화", "수", "목", "금", "토"];

export type DailyDrillGroup = {
  date: string;
  dayKo: string;
  day: number;
  drills: { drillCategory: string; drillCompleted: boolean | null }[];
};

export function groupDrillsByDate(
  dailyDrills: ReportDetail["dailyDrills"],
): DailyDrillGroup[] {
  const map = new Map<string, DailyDrillGroup>();

  for (const drill of dailyDrills) {
    if (!map.has(drill.date)) {
      const [year, month, d] = drill.date.split("-").map(Number);
      const date = new Date(year, month - 1, d);
      map.set(drill.date, {
        date: drill.date,
        dayKo: DAY_KO[date.getDay()],
        day: d,
        drills: [],
      });
    }
    if (drill.drillCategory) {
      map.get(drill.date)!.drills.push({
        drillCategory: drill.drillCategory,
        drillCompleted: drill.drillCompleted,
      });
    }
  }

  return Array.from(map.values());
}

export function parseWeekId(weekId: string): {
  month: number;
  weekOfMonth: number;
} {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = parseInt(yearStr);
  const week = parseInt(weekStr);

  // ISO 주차 → 해당 주 월요일 계산
  // 1월 4일은 항상 1주차에 속함
  const jan4 = new Date(year, 0, 4);
  const jan4Day = jan4.getDay() || 7; // 일요일(0)을 7로 변환
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - (jan4Day - 1) + (week - 1) * 7);

  return {
    month: monday.getMonth() + 1,
    weekOfMonth: Math.ceil(monday.getDate() / 7),
  };
}

export function groupByMonth(
  reports: ReportSummary[],
): [string, ReportSummary[]][] {
  const map = new Map<string, ReportSummary[]>();
  for (const report of reports) {
    const { month } = parseWeekId(report.weekId);
    const key = `${month}월`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(report);
  }
  return Array.from(map.entries());
}
