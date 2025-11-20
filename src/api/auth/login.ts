import { api } from "../apiClient";
import type { components } from "@/types/api";
import { APIResponse } from "@/types/common";

type LoginRequest = components["schemas"]["LoginRequest"];
type LoginResponse = components["schemas"]["LoginResponse"];

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
