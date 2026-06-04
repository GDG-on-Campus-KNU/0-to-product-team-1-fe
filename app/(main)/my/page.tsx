"use client";

import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { tokenStorageName } from "@/lib/axios";

import RandomQuote from "./components/RandomQuote";
import UserInfoContainer from "./components/UserInfoContainer";

export default function My() {
  const router = useRouter();

  const onModifyUserButtonClick = () => {
    router.push("/my/edit");
  };

  const onLogoutButtonClick = () => {
    localStorage.removeItem(tokenStorageName);
    router.push("/");
  };

  return (
    <div className="flex flex-col flex-1 bg-background p-8 gap-12">
      <div className="flex flex-col items-center justify-center pt-16 pb-8">
        <h1 className="text-head-01">마음 챙김 일기</h1>
        <h2 className="text-head-04">오늘 하루도 고생 많으셨습니다.</h2>
      </div>

      <UserInfoContainer />

      <div className="flex flex-col bg-background gap-2">
        <Button
          variant="register"
          size="xlg"
          className="w-full"
          onClick={onModifyUserButtonClick}
        >
          <Settings />
          회원정보 수정
        </Button>
        <Button
          variant="destructive"
          size="xlg"
          className="w-full"
          onClick={onLogoutButtonClick}
        >
          <LogOut />
          로그아웃
        </Button>
      </div>

      <RandomQuote />
    </div>
  );
}
