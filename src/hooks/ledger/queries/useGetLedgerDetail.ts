import { getLedgerById } from "@/api/ledger/getLedgerById";
import { getTransactionsByLedgerId } from "@/api/transaction/getTransactionsByLedgerId";
import { Ledger } from "@/di/ledger";
import { Transaction, TransactionDetail } from "@/di/transaction";
import { useAuthStore } from "@/store/auth-store";
import { useQueries } from "@tanstack/react-query";
import { use } from "react";

export function useGetLedgerDetail(ledgerId: string){

    const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded)
    const tokens = useAuthStore((state) => state.tokens)
    const enabled = isAuthLoaded && !!tokens?.accessToken;
    const results = useQueries({
        queries: [
            {
                queryKey: ['ledger', ledgerId],
                queryFn: async(): Promise<Ledger> => getLedgerById(ledgerId),
                enabled
            },
            {
                queryKey: ['ledger-transactions',ledgerId],
                queryFn: async(): Promise<TransactionDetail> => getTransactionsByLedgerId(ledgerId)
            }
        ]
    })
    const [ledgerQ, ledgerTransactionQ] = results;
    const error = ledgerQ.error ?? ledgerTransactionQ.error ?? null;
    const isError = ledgerQ.isError || ledgerTransactionQ.isError;
    const isLoading = ledgerQ.isLoading || ledgerTransactionQ.isLoading;
    return {
        ledger: ledgerQ.data,
        transactions: ledgerTransactionQ.data,
        isLoading,
        isError,
        error
    }
}