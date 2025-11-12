import {create} from "zustand";
import type { components } from "@/types/api";
type Ledger = components["schemas"]["Ledger"];


interface LedgerState{
    ledgers: Ledger[];
    selectedLedger: Ledger | null;
    setLedgers: (ledgers: Ledger[]) => void;
    selectLedger: (ledger: Ledger) => void;
    clear:() => void;
}

export const useLedgerStore = create<LedgerState>((set) => ({
    ledgers: [],
    selectedLedger: null,
    setLedgers: (ledgers) => set({ ledgers }),
    selectLedger: (ledger) => set({ selectedLedger: ledger }),
    clear:() => set({ ledgers: [], selectedLedger: null }),
}))