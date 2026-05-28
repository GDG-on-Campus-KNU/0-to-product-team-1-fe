"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { API } from "@/lib/api/endpoints";
import { axiosInstance, tokenStorageName } from "@/lib/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: string;
  message: string;
  data: {
    accessToken: string;
  };
}

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const response = await axiosInstance.post<LoginResponse>(
    API.AUTH.LOGIN_POST,
    body,
  );

  return response.data;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      toast.success("로그인 되었습니다.");
      localStorage.setItem(tokenStorageName, data.data.accessToken);
      router.push("/");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<LoginResponse>;
      toast.error(`${axiosError.response?.data.message}`);
    },
  });
}
