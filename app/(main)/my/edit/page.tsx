"use client";

import ModifyForm from "../components/ModifyForm";
import UserDeleteButton from "../components/UserDeleteButton";

export default function Edit() {
  return (
    <div className="flex flex-col flex-1 bg-background p-8 gap-4">
      <div className="flex flex-col items-center justify-center pt-16 pb-8">
        <h1 className="text-head-01">계정 정보 수정</h1>
        <h2 className="text-head-04">당신만의 온전한 공간을 가꾸어보세요.</h2>
      </div>
      <ModifyForm />
      <hr />
      <UserDeleteButton />
    </div>
  );
}
