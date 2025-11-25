import { useQueries } from "@tanstack/react-query";
import { getMyTransactions } from "@/api/transaction/getTransactions";
import { getMyCategories } from "@/api/category/getCategories";
import { useAuthStore } from "@/store/auth-store";
import { components } from "@/types/api";

type Transaction = components["schemas"]["Transaction"];
type Category = components["schemas"]["Category"];

export function useTransactionPageData() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);

  const enabled = isAuthLoaded && !!tokens?.accessToken;

  const results = useQueries({
    queries: [
      {
        queryKey: ["my-transactions"],
        queryFn: async (): Promise<Transaction[]> => getMyTransactions(),
        enabled,
      },
      {
        queryKey: ["my-categories"],
        queryFn: async (): Promise<Category[]> => getMyCategories(),
        enabled,
      },
    ],
  });

  const [transactionsQ, categoriesQ] = results;

  const error = transactionsQ.error ?? categoriesQ.error ?? null;

  const isError = transactionsQ.isError || categoriesQ.isError;

  const isLoading = transactionsQ.isLoading || categoriesQ.isLoading;

  return {
    transactions: transactionsQ.data,
    categories: categoriesQ.data,
    transactionsQ,
    categoriesQ,
    isLoading,
    isError,
    error,
  };
}
