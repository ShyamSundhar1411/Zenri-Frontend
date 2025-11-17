"use client";
import { useQuery } from "@tanstack/react-query";
import type { components } from "@/types/api";
import { getMyLedgers } from "@/api/ledger";
import { useAuthStore } from "@/store/auth-store";

type Ledger = components["schemas"]["Ledger"];

export function useLedgers() {
  const isAuthLoaded = useAuthStore.getState().isAuthLoaded;
  const token = useAuthStore.getState().token;
  return useQuery({
    queryKey: ["ledgers"],
    queryFn: async (): Promise<Ledger[]> => {
      const ledgers = await getMyLedgers();
      return ledgers;
    },
    enabled: isAuthLoaded && !!token,
  });
}
