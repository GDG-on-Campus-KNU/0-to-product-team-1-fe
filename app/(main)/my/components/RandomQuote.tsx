"use client";

import { quotes } from "../constants/quotes";

export default function RandomQuote() {
  const today = new Date();
  const dateKey = Number(
    `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
  );
  const quoteIndex = dateKey % quotes.length;

  return (
    <div className="flex flex-col flex-1">
      <p className="flex text-center justify-center text-body-02 text-stone-400">
        {`"${quotes[quoteIndex]}"`}
      </p>
    </div>
  );
}
