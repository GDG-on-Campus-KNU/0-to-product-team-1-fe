"use client";

import { LogIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { contact } from "@/utils/contact";

export default function Landing() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col flex-1">
      {/* 배경색 */}
      <div className="absolute inset-x-0 top-0 -bottom-[calc(80px+env(safe-area-inset-bottom))] bg-background" />

      {/* 데코레이션 블러 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[300px] h-[300px] -right-[39px] -top-[84px] rounded-full bg-green-400 opacity-20 blur-[50px]" />
        <div className="absolute w-[250px] h-[250px] -left-[20px] -bottom-[42px] rounded-full bg-blue-300 opacity-30 blur-[40px]" />
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 relative z-10">
        <div className="relative flex justify-center items-center w-80 h-80 mb-12">
          <div className="flex items-center justify-center w-64 h-64 rounded-full bg-gradient-to-br from-stone-200 to-stone-100 border border-[rgba(196,199,194,0.3)] shadow-xs">
            <Image
              width={74}
              height={73}
              src="/hollow_leaves_icon.svg"
              alt="hl_icon"
            />
          </div>
          <div className="absolute right-4 bottom-4 flex items-center justify-center w-[55px] h-[52px] rounded-full bg-white shadow-md">
            <Image
              width={24}
              height={21}
              src="/person_meditation_icon.svg"
              alt="pm_icon"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 max-w-[306px] w-full">
          <h1 className="text-[40px] font-semibold leading-[48px] tracking-[-1px] text-gray-700 text-center">
            Step Back
          </h1>
          <p className="text-[18px] font-medium leading-[29px] text-gray-600 text-center px-4">
            내 사고와 감정에서 한 발짝 떨어져 패턴을 알아차리는 메타인지 도구
          </p>
        </div>
      </div>

      {/* 푸터 */}
      <div className="relative z-10 flex flex-col gap-3 px-6 pt-6 pb-6">
        <Button
          variant="login"
          size="auth"
          onClick={() => {
            router.push("/login");
          }}
        >
          <LogIn size={14} />
          시작하기
        </Button>
        <Button
          variant="register"
          size="auth"
          onClick={() => {
            router.push("/register");
          }}
        >
          계정 만들기
        </Button>
        <div className="flex justify-center pt-3">
          <a
            href={`mailto:${contact.email}`}
            className="text-xs font-medium leading-4 tracking-[0.6px] text-gray-400 no-underline"
          >
            로그인에 문제가 있나요? <span className="underline">문의하기</span>
          </a>
        </div>
      </div>
    </div>
  );
}
