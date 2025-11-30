import { create } from "zustand";
import type { components } from "@/types/api";
import { Ledger } from "@/di/ledger";

interface LedgerState {
  selectedLedger: Ledger | null;
  selectLedger: (ledger: Ledger) => void;
}

export const useLedgerStore = create<LedgerState>((set) => ({
  selectedLedger: null,
  selectLedger: (ledger) => set({ selectedLedger: ledger }),
}));
