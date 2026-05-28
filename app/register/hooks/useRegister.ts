"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { API } from "@/lib/api/endpoints";
import { axiosInstance, tokenStorageName } from "@/lib/axios";

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  code: string;
  message: string;
  data: {
    accessToken: string;
  };
}

export async function register(
  body: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await axiosInstance.post<RegisterResponse>(
    API.AUTH.SIGNUP_POST,
    body,
  );

  return response.data;
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      toast.success("회원가입 되었습니다.");
      localStorage.setItem(tokenStorageName, data.data.accessToken);
      router.push("/");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<RegisterResponse>;
      toast.error(`${axiosError.response?.data.message}`);
    },
  });
}
