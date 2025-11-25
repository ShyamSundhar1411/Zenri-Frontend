import { useQueries } from "@tanstack/react-query";
import { getMyTransactions } from "@/api/transaction/getTransactions";
import { getMyCategories } from "@/api/category/getCategories";
import { useAuthStore } from "@/store/auth-store";
import { components } from "@/types/api";
import { getMyPaymentMethods } from "@/api/account/getPaymentMethods";

type Transaction = components["schemas"]["Transaction"];
type Category = components["schemas"]["Category"];
type PaymentMethod = components["schemas"]["PaymentMethod"];

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
      {
        queryKey: ["my-payment-methods"],
        queryFn: async (): Promise<PaymentMethod[]> => getMyPaymentMethods(),
        enabled,
      },
    ],
  });

  const [transactionsQ, categoriesQ, paymentMethodsQ] = results;

  const error =
    transactionsQ.error ?? categoriesQ.error ?? paymentMethodsQ.error ?? null;

  const isError =
    transactionsQ.isError || categoriesQ.isError || paymentMethodsQ.isError;

  const isLoading =
    transactionsQ.isLoading ||
    categoriesQ.isLoading ||
    paymentMethodsQ.isLoading;

  return {
    transactions: transactionsQ.data,
    categories: categoriesQ.data,
    paymentMethods: paymentMethodsQ.data,
    transactionsQ,
    categoriesQ,
    paymentMethodsQ,
    isLoading,
    isError,
    error,
  };
}
