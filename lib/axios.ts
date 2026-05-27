import axios from "axios";

export const tokenStorageName = "accesstoken";

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
    if ([401, 403].includes(error.response?.status))
      console.warn("로그인 필요");
    return Promise.reject(error);
  },
);
