import axios from "axios";
import { toast } from "react-toastify";

export const tokenStorageName = "accessToken";

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.error(
    "[axios] NEXT_PUBLIC_API_URL is not defined. Check your .env file.",
  );
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(tokenStorageName);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      localStorage.removeItem(tokenStorageName);
      toast.info("로그인이 필요합니다.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
