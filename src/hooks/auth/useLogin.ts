"use client";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth/login";
import type { components } from "@/types/api";
import { useAuthStore } from "@/store/auth-store";
import { LoginRequest, LoginResponse } from "@/di/auth";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
      setAuth(data);
    },
  });
}
