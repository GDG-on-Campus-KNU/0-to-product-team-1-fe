"use client";
import { useState } from "react";

import { ArrowRight, AtSign, Eye, EyeClosed, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterButtonClick = () => {
    const user = {
      email,
      password,
    };
    console.log(user);
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-8 bg-stone-100 rounded-3xl p-6 shadow-2xl">
      <InputField
        label="이메일"
        placeholder="이메일을 입력하세요"
        icon={<AtSign />}
        value={email}
        setValue={setEmail}
      />
      <InputField
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호를 입력하세요"
        icon={<LockKeyhole />}
        suffix={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        }
        value={password}
        setValue={setPassword}
      />

      <Button
        variant="login"
        size="xlg"
        className="w-full bg-blue-300"
        onClick={onRegisterButtonClick}
      >
        로그인
        <ArrowRight />
      </Button>
    </div>
  );
}
