import { SignupRequest, SignupResponse } from "@/di/auth";
import { api } from "../client";
import type { components } from "@/types/api";
import { APIResponse } from "@/types/common";

// type RefreshTokenRequest = components["schemas"]["RefreshTokenRequest"];
// type TokenResponse = components["schemas"]["Token"];

export async function signUp(data: SignupRequest): Promise<SignupResponse> {
  const res = await api.post<APIResponse<SignupResponse>>(
    "/api/v1/auth/signup",
    data,
  );
  if (res.data.error) {
    throw new Error(res.data.error || "Signup failed");
  }
  return res.data.data!;
}
