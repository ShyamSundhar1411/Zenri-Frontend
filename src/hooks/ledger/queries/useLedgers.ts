"use client";
import { useQuery } from "@tanstack/react-query";
import type { components } from "@/types/api";
import { getMyLedgers } from "@/api/ledger/getLedgers";
import { useAuthStore } from "@/store/auth-store";
type Ledger = components["schemas"]["Ledger"];

export function useLedgers() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);
  return useQuery({
    queryKey: ["ledgers"],
    queryFn: async (): Promise<Ledger[]> => {
      const ledgers = await getMyLedgers();
      return ledgers;
    },
    enabled: isAuthLoaded && !!tokens?.accessToken,
  });
}
