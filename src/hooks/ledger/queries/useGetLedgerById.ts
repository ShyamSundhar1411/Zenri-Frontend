import { getLedgerById } from "@/api/ledger/getLedgerById";
import { Ledger } from "@/di/ledger";
import { useQuery } from "@tanstack/react-query";

export function useGetLedgerById(ledgerId: string) {
    return useQuery({
        queryKey: ["ledger", ledgerId],
        queryFn: async (): Promise<Ledger> => {
            const ledger = await getLedgerById(ledgerId);
            return ledger;
        }

    })

}