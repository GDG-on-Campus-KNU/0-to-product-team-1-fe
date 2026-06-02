import { Dispatch, SetStateAction, useState } from "react";

export type FeedbackData = {
  drillCompleted: boolean;
  setDrillCompleted: Dispatch<SetStateAction<boolean>>;

  helpful: boolean | null;
  setHelpful: Dispatch<SetStateAction<boolean | null>>;
};

export function useFeedbackData(): FeedbackData {
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);
  const [helpful, setHelpful] = useState<boolean | null>(null);

  return {
    drillCompleted,
    setDrillCompleted,

    helpful,
    setHelpful,
  };
}
