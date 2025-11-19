"use client";

import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth/signup";
import type { components } from "@/types/api";
import { useAuthStore } from "@/store/auth-store";

type SignupRequest = components["schemas"]["SignupRequest"];
type SignupResponse = components["schemas"]["SignupResponse"];

export function useSignup() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (data) => signUp(data),
    onSuccess: (data) => {
      setAuth(data);
    },
  });
}
