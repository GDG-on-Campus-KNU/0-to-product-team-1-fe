"use client";
import { useState } from "react";

import {
  ArrowRight,
  AtSign,
  CheckCircle,
  Eye,
  EyeClosed,
  LockKeyhole,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const onRegisterButtonClick = () => {
    if (password != confirmpassword) {
      alert("비밀번호 확인란이 틀렸습니다. 다시 확인해주세요.");
      return;
    }
    const user = {
      username,
      email,
      password,
    };
    console.log(user);
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-8 bg-stone-100 rounded-3xl p-6 shadow-2xl">
      <InputField
        label="이름"
        placeholder="실명을 입력해주세요"
        icon={<User />}
        value={username}
        setValue={setUsername}
      />
      <InputField
        label="이메일"
        placeholder="사용하실 이메일을 입력해주세요"
        icon={<AtSign />}
        value={email}
        setValue={setEmail}
      />
      <InputField
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        placeholder="8자 이상 입력해주세요"
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
      <InputField
        label="비밀번호 확인"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="비밀번호를 다시 한번 입력해주세요"
        icon={<CheckCircle />}
        suffix={
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <Eye /> : <EyeClosed />}
          </button>
        }
        value={confirmpassword}
        setValue={setConfirmPassword}
      />

      <p className="text-label-05 text-gray-500 text-center">
        계정을 생성함으로써 StepBack의 이용약관 및 개인정보처리방침에 동의하게
        됩니다.
      </p>

      <Button
        variant="register"
        size="xlg"
        className="w-full"
        onClick={onRegisterButtonClick}
      >
        회원가입 완료
        <ArrowRight />
      </Button>
    </div>
  );
}
