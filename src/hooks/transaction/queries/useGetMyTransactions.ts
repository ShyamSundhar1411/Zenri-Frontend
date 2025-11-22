import { getMyTransactions } from "@/api/transaction/getTransactions";
import { useAuthStore } from "@/store/auth-store";
import type { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type Transaction = components["schemas"]["Transaction"];

export function useGetMyTransactions() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);
  return useQuery({
    queryKey: ["my-transactions"],
    queryFn: async (): Promise<Transaction[]> => {
      const transactions = await getMyTransactions();
      return transactions;
    },
    enabled: isAuthLoaded && !!tokens?.accessToken,
  });
}
