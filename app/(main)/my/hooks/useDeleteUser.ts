"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { API } from "@/lib/api/endpoints";
import { axiosInstance, tokenStorageName } from "@/lib/axios";

export interface UserDeleteResponse {
  code: string;
  message: string;
  data: string;
}

export async function deleteUser(): Promise<UserDeleteResponse> {
  const response = await axiosInstance.delete<UserDeleteResponse>(
    API.USER._DELETE,
  );

  return response.data;
}

export function useDeleteUser() {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      toast.success("탈퇴하였습니다.");
      localStorage.removeItem(tokenStorageName);
      router.push("/");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<UserDeleteResponse>;
      toast.error(`${axiosError.response?.data.message}`);
    },
  });
}
