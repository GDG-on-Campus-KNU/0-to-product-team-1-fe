"use client";
import { useState } from "react";

import { ArrowRight, AtSign, Eye, EyeClosed, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const onLoginButtonClick = () => {
    loginMutation.mutate({ email, password });
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
        onClick={onLoginButtonClick}
      >
        로그인
        <ArrowRight />
      </Button>
    </div>
  );
}
