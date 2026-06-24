// "2026-W20" → "5월 2주차"
// 기준: ISO 주의 월요일이 속한 달에서 몇 번째 월요일인지
export function isoWeekToKorean(weekId: string): string {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = parseInt(yearStr);
  const week = parseInt(weekStr);

  // ISO week 1의 월요일: 해당 연도 1월 4일이 항상 1주차에 포함됨
  const jan4 = new Date(year, 0, 4);
  const jan4Dow = jan4.getDay() || 7; // 1=월 ~ 7=일
  const week1Monday = new Date(jan4);
  week1Monday.setDate(jan4.getDate() - (jan4Dow - 1));

  const monday = new Date(week1Monday);
  monday.setDate(week1Monday.getDate() + (week - 1) * 7);

  const month = monday.getMonth(); // 0-indexed
  const monthNum = month + 1;

  // 해당 월의 첫 번째 월요일
  const firstOfMonth = new Date(monday.getFullYear(), month, 1);
  const firstDow = firstOfMonth.getDay() || 7;
  const firstMondayDate = firstDow === 1 ? 1 : 1 + (8 - firstDow);

  const weekNum = Math.floor((monday.getDate() - firstMondayDate) / 7) + 1;

  return `${monthNum}월 ${weekNum}주차`;
}
