import { api } from "./apiClient";
import { components } from "@/types/api";

type LoginRequest = components["schemas"]["LoginRequest"];
type LoginResponse = components["schemas"]["LoginResponse"];

type SignupRequest = components["schemas"]["SignupRequest"];
type SignupResponse = components["schemas"]["SignupResponse"];

export async function login(data:LoginRequest): Promise<LoginResponse>{
    const res = await api.post("/api/v1/auth/login", data);
    return res.data
}

export async function signUp(data: SignupRequest): Promise<SignupResponse>{
    const res = await api.post("/api/v1/auth/signup", data);
    return res.data
}