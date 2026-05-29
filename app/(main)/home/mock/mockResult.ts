import type { CleanDrill, CleanCrisis } from "../hooks/useGetDrill";

export const MOCK_DRILL: CleanDrill = {
  type: "drill",
  id: 1,
  name: "증거 2:2 적기",
  duration_min: 5,
  instruction:
    "지금 든 생각을 한 줄로 쓰고, 그 생각이 사실이라는 증거 2개와 사실이 아닐 수도 있다는 증거 2개를 각각 적어보세요.",
  citation: "Beck(2020) CBT 11장",
  evidence_span: "발표 망할 것 같아 다",
};

export const MOCK_CRISIS: CleanCrisis = {
  type: "crisis_card",
  crisis_resources: {
    자살예방상담: "1393",
    청소년상담: "1388",
    정신건강위기상담: "1577-0199",
  },
};
