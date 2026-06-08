import { ReportSummary } from "../hooks/useGetReports";

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
