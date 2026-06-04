"use client";

import { BeatLoader } from "react-spinners";

import { useGetUser } from "../hooks/useGetUser";

export default function My() {
  const { data, isLoading, isError } = useGetUser();

  if (isError) {
    return (
      <div className="flex justify-center">
        <div className="text-center w-full rounded-3xl border border-stone-200 bg-stone-100 p-8">
          사용자 정보를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full rounded-3xl border border-stone-200 bg-stone-100 p-8">
        <div className="flex items-center justify-between py-2">
          <span className="text-label-01 text-stone-500">이름</span>
          <span className="text-label-01 text-stone-900">
            {isLoading ? <BeatLoader size={6} /> : data?.username}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-label-01 text-stone-500">계정</span>
          <span className="text-label-01 text-stone-900">
            {isLoading ? <BeatLoader size={6} /> : data?.email}
          </span>
        </div>
      </div>
    </div>
  );
}
