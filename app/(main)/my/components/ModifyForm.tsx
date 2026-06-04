"use client";
import { useEffect, useRef, useState } from "react";

import {
  CheckCircle,
  Eye,
  EyeClosed,
  LockKeyhole,
  Save,
  Shield,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

import { useGetUser } from "../hooks/useGetUser";
import { usePatchUser } from "../hooks/usePatchUser";

export default function ModifyForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const userPatchMutation = usePatchUser();

  const { data } = useGetUser();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && data?.username) {
      setUsername(data.username);
      initialized.current = true;
    }
  }, [data?.username]);

  const onModifyUserButtonClick = () => {
    if (password != confirmpassword) {
      toast.error("비밀번호 확인란이 틀렸습니다. 다시 확인해주세요.");
      return;
    }
    userPatchMutation.mutate({ username, password });
  };

  return (
    <>
      <InputField
        label="이름"
        placeholder="실명을 입력해주세요"
        icon={<User />}
        value={username}
        setValue={setUsername}
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

      <div className="flex justify-center">
        <div className="flex flex-row gap-2 items-center text-center w-full rounded-3xl border border-stone-200 bg-stone-100 p-4">
          <Shield size={52} color="var(--color-stone-400)" />
          <div className="w-1 h-10 bg-stone-300" />
          <p>
            개인정보는 안전하게 암호화되어 보관됩니다. 주기적인 비밀번호
            변경으로 보안을 강화하세요.
          </p>
        </div>
      </div>

      <Button
        variant="login"
        size="xlg"
        className="w-full"
        onClick={onModifyUserButtonClick}
      >
        <Save />
        변경사항 저장하기
      </Button>
    </>
  );
}
