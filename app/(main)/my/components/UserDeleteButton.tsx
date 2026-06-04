"use client";

import { UserMinus } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import { useDeleteUser } from "../hooks/useDeleteUser";

export default function Edit() {
  const deleteUserMutation = useDeleteUser();

  const onDeleteButtonClick = () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p>정말 탈퇴하시겠습니까?</p>

          <div className="flex gap-2">
            <button
              className="rounded bg-red-500 px-3 py-1 text-white"
              onClick={() => {
                closeToast?.();
                deleteUserMutation.mutate();
              }}
            >
              확인
            </button>

            <button
              className="rounded bg-stone-300 px-3 py-1"
              onClick={() => {
                closeToast?.();
              }}
            >
              취소
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      },
    );
  };

  return (
    <Button
      variant="ghost"
      size="xlg"
      className="w-full text-red-500"
      onClick={onDeleteButtonClick}
    >
      <UserMinus />
      계정 탈퇴하기
    </Button>
  );
}
