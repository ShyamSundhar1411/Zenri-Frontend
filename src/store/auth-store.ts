import {create} from "zustand";
import type { components } from "@/types/api";

type User = components["schemas"]["User"];
interface AuthState{
    user: User|null;
    token: string|null;
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setAuth: (user: User, token: string) => set({user, token}),
    clearAuth: () => set({user: null, token: null})
}));