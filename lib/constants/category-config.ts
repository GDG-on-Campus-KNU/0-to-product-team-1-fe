const CATEGORY_LABELS = {
  cognitive_restructuring: "생각 전환",
  behavioral_activation: "산책",
  habit_design: "긍정 확언",
  grounding: "마음 챙김",
  self_compassion: "자기 자비",
  sleep_circadian: "수면 정돈",
} as const;

export const getCategoryLabel = (key: string) => {
  return CATEGORY_LABELS[key as keyof typeof CATEGORY_LABELS] ?? key;
};
