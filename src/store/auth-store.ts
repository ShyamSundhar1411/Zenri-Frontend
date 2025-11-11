import {create} from "zustand";
import type { components } from "@/types/api";

type LoginResponse = components["schemas"]["LoginResponse"];
type SignupResponse = components["schemas"]["SignupResponse"];

interface AuthState{
    user: LoginResponse["user"] | SignupResponse["user"] | null;
    token: LoginResponse["tokens"] | SignupResponse["tokens"] | null;
    isAuthenticated: boolean;
    setAuth: (data: LoginResponse | SignupResponse) => void;
    logout: () => void;
    restoreSession:() => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user:null,
    token:null,
    isAuthenticated:false,
    setAuth:(data)=>{
        set({
            user:data.user,
            token:data.tokens,
            isAuthenticated:true,
        })
        localStorage.setItem("authTokens",JSON.stringify(data.tokens))
    },
    logout:()=>{
        set({
            user:null,
            token:null,
            isAuthenticated:false,
        })
        localStorage.removeItem("authTokens")
    },
    restoreSession:()=>{
        const auth = localStorage.getItem("authTokens");
        if(auth){
            const data = JSON.parse(auth);
            set({
                user:data.user,
                token:data.tokens,
                isAuthenticated:true,
            })
        }
    },
}))