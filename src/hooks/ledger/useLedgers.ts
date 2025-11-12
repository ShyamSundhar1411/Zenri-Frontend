"use client";
import { useQuery } from "@tanstack/react-query";
import type { components } from "@/types/api";
import { useLedgerStore } from "@/store/ledger-store";
import { getMyLedgers } from "@/api/ledger";

type Ledger = components["schemas"]["Ledger"];


export function useLedgers() {
  const setLedgers = useLedgerStore((state) => state.setLedgers);

  return useQuery({
    queryKey: ["ledgers"],
    queryFn: async (): Promise<Ledger[]> => {
        const ledgers = await getMyLedgers()
        return ledgers;
    }
  });
}