"use client";

import React from "react";

import { HeartPulse } from "lucide-react";

export function DrillLoadingView() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-10 mt-10">
      <div className="flex items-center justify-center w-36 h-36 rounded-full bg-gray-100">
        <HeartPulse
          className="w-20 h-20 text-gray-500 animate-pulse"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <h2 className="text-head-03 text-gray-700 leading-snug">
          오늘의 나에게 적합한
          <br />
          드릴을 찾는중입니다...
        </h2>
      </div>

      <div className="flex gap-2.5 mt-2">
        <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
