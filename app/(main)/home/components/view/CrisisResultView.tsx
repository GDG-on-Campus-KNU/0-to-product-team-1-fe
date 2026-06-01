"use client";

import React from "react";

import { Phone, HeartHandshake } from "lucide-react";

import type { CleanCrisis } from "../../hooks/usePostDrill";

interface CrisisResultViewProps {
  data: CleanCrisis;
}

export function CrisisResultView({ data }: CrisisResultViewProps) {
  const resources = Object.entries(data.crisis_resources);

  return (
    <div className="my-auto flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl border border-destructive/30 bg-background-light px-6 pb-8 pt-14 shadow-md">
      <HeartHandshake
        className="h-24 w-24 text-destructive/70"
        strokeWidth={1.5}
      />

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-head-02 text-gray-800">
          지금 많이 힘드신 것 같아요.
        </h1>
        <p className="text-body-03 text-gray-500">
          혼자 견디지 마세요.
          <br />
          언제든 도움을 받을 수 있습니다.
        </p>
      </div>

      <div className="mt-2 flex w-full flex-col gap-4">
        {resources.map(([name, number]) => (
          <a
            key={name}
            href={`tel:${number.replace(/-/g, "")}`}
            className="flex w-full items-center justify-between gap-3 rounded-3xl bg-destructive/60 px-5 py-5 text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <span className="text-body-01 break-keep text-left">{name}</span>

            <div className="flex shrink-0 items-center gap-2 whitespace-nowrap opacity-90">
              <Phone className="size-5" />
              <span className="text-body-03 tracking-wide">{number}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
