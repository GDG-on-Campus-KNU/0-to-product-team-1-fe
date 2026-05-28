import Image from "next/image";

import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex justify-center min-h-screen bg-[back]]">
      <div className="relative isolate w-full max-w-[480px] overflow-hidden bg-background">
        <Image
          src="/mountain_background.svg"
          alt="background"
          fill
          priority
          className="object-cover -z-10"
        />

        <div className="flex flex-col items-center justify-center pt-16 pb-8">
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-green-500 border shadow-xs">
            <Image
              width={43}
              height={42}
              src="/hollow_leaves_icon.svg"
              alt="hl_icon"
            />
          </div>

          <h1 className="text-head-01">Step Back</h1>
          <p className="text-body-01">정서적 쉼터로의 한 걸음</p>
        </div>

        <div className="flex flex-col flex-1 p-8 gap-8">
          <LoginForm />

          <div className="flex justify-center">
            <a href="/register" className="text-label-04">
              <span className="underline">회원가입 하기</span>
            </a>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center pt-20 text-body-03">
            <div className="w-1 h-14 bg-gradient-to-b from-stone-400 to-transparent"></div>
            <span className="text-body-03 text-stone-400">MINDFUL MOMENT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
