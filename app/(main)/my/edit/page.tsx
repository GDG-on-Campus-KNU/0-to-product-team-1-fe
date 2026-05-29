"use client";
import Image from "next/image";

import ModifyForm from "../components/ModifyForm";
import UserDeleteButton from "../components/UserDeleteButton";

export default function Edit() {
  return (
    <div className="flex flex-col flex-1 bg-background p-8 gap-4">
      <div className="flex flex-col gap-4 items-center justify-center pb-8">
        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-green-500 border shadow-xs">
          <Image
            width={43}
            height={42}
            src="/hollow_leaves_icon.svg"
            alt="hl_icon"
          />
        </div>
        <h1 className="text-head-01">계정 정보 수정</h1>
        <h2 className="text-head-04">당신만의 온전한 공간을 가꾸어보세요.</h2>
      </div>
      <ModifyForm />
      <hr />
      <UserDeleteButton />
    </div>
  );
}
