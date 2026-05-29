import Image from "next/image";

import Footer from "./components/Footer";
import Header from "./components/Header";
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

        <Header />

        <div className="flex flex-col flex-1 p-8 gap-8">
          <LoginForm />

          <div className="flex justify-center">
            <a href="/register" className="text-label-04">
              <span className="underline">회원가입 하기</span>
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
