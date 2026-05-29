"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export interface UserPatchRequest {
  username: string;
  password: string;
}

export interface UserPatchResponse {
  code: string;
  message: string;
  data: {
    accessToken: string;
  };
}

export async function patchUser(
  body: UserPatchRequest,
): Promise<UserPatchResponse> {
  const response = await axiosInstance.patch<UserPatchResponse>(
    API.USER._PATCH,
    body,
  );

  return response.data;
}

export function usePatchUser() {
  const router = useRouter();

  return useMutation({
    mutationFn: patchUser,

    onSuccess: () => {
      toast.success("회원정보가 수정되었습니다.");
      router.push("/my");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<UserPatchResponse>;
      toast.error(`${axiosError.response?.data.message}`);
    },
  });
}
