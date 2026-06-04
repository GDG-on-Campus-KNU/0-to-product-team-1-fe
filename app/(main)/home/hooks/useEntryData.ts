import { Dispatch, SetStateAction, useState } from "react";

export type EntryData = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;

  condition: number;
  setCondition: Dispatch<SetStateAction<number>>;

  sleep: number;
  setSleep: Dispatch<SetStateAction<number>>;

  exercise: number;
  setExercise: Dispatch<SetStateAction<number>>;

  social: number;
  setSocial: Dispatch<SetStateAction<number>>;
};

export function useEntryData(): EntryData {
  const [text, setText] = useState("");
  const [condition, setCondition] = useState(3);
  const [sleep, setSleep] = useState(7);
  const [exercise, setExercise] = useState(0);
  const [social, setSocial] = useState(2);

  return {
    text,
    setText,

    condition,
    setCondition,

    sleep,
    setSleep,

    exercise,
    setExercise,

    social,
    setSocial,
  };
}
