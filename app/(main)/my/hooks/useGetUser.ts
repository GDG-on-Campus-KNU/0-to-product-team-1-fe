import { useQuery } from "@tanstack/react-query";

import { API } from "@/lib/api/endpoints";
import { axiosInstance } from "@/lib/axios";

export interface UserGetResponse {
  userId: number;
  username: string;
  email: string;
}

const getUser = async (): Promise<UserGetResponse> => {
  const { data } = await axiosInstance.get(API.USER._GET);
  return data;
};

export const useGetUser = () => {
  return useQuery<UserGetResponse>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
