import { api } from "./apiClient";
import { components, APIResponse } from "@/types/api";

type LoginRequest = components["schemas"]["LoginRequest"];
type LoginResponse = components["schemas"]["LoginResponse"];

type SignupRequest = components["schemas"]["SignupRequest"];
type SignupResponse = components["schemas"]["SignupResponse"];

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<APIResponse<LoginResponse>>(
    "/api/v1/auth/login",
    data,
  );
  if (res.data.error) {
    throw new Error(res.data.error || "Login failed");
  }
  return res.data.data!;
}

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
