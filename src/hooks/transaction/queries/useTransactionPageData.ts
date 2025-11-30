import { useQueries } from "@tanstack/react-query";
import { getMyTransactions } from "@/api/transaction/getTransactions";
import { getMyCategories } from "@/api/category/getCategories";
import { useAuthStore } from "@/store/auth-store";
import { components } from "@/types/api";
import { getMyPaymentMethods } from "@/api/account/getPaymentMethods";
import { getMySubscriptions } from "@/api/subscription/getSubscriptions";
import { Transaction } from "@/di/transaction";
import { Category } from "@/di/category";
import { PaymentMethod } from "@/di/account";
import { Subscription } from "@/di/subscription";

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
      {
        queryKey: ["my-subscriptions"],
        queryFn: async (): Promise<Subscription[]> => getMySubscriptions(),
        enabled,
      },
    ],
  });

  const [transactionsQ, categoriesQ, paymentMethodsQ, subscriptionsQ] = results;

  const error =
    transactionsQ.error ??
    categoriesQ.error ??
    paymentMethodsQ.error ??
    subscriptionsQ.error ??
    null;

  const isError =
    transactionsQ.isError ||
    categoriesQ.isError ||
    paymentMethodsQ.isError ||
    subscriptionsQ.isError;

  const isLoading =
    transactionsQ.isLoading ||
    categoriesQ.isLoading ||
    paymentMethodsQ.isLoading ||
    subscriptionsQ.isLoading;

  return {
    transactions: transactionsQ.data,
    categories: categoriesQ.data,
    paymentMethods: paymentMethodsQ.data,
    subscriptions: subscriptionsQ.data,
    transactionsQ,
    categoriesQ,
    paymentMethodsQ,
    subscriptionsQ,
    isLoading,
    isError,
    error,
  };
}
