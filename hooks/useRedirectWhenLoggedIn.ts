"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export const tokenStorageName = "accessToken";

export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem(tokenStorageName);
  return !!token;
};

export function useRedirectWhenLoggedIn(path = "/") {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace(path);
    }
  }, [router, path]);
}
