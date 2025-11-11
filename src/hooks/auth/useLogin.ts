import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import type { components } from "@/types/api";

type LoginRequest = components["schemas"]["LoginRequest"];
type LoginResponse = components["schemas"]["LoginResponse"];

export function useLogin(){
    return useMutation<LoginResponse,Error,LoginRequest>({
        mutationFn:(data)=>login(data),
    })
}