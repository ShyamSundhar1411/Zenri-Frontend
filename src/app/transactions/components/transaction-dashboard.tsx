"use client";
import { useEffect } from "react";
import { TransactionDashboardMetrics } from "./transaction-dashboard-metrics";
import { TransactionsList } from "./transactions-list";
import { toast } from "sonner";
import { useGetMyTransactions } from "@/hooks/transaction/queries/useGetMyTransactions";
import { useTransactionPageData } from "@/hooks/transaction/queries/useTransactionPageData";

export function TransactionDashboard() {
  const {
    transactions,
    categories,
    paymentMethods,
    subsctiptions,
    isLoading,
    isError,
    error,
  } = useTransactionPageData();
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);
  console.log(transactions);
  return (
    <div className="space-y-6">
      <TransactionDashboardMetrics />
      <TransactionsList
      
        transactions={transactions}
        categories={categories}
        subscriptions={subsctiptions}
        isLoading={isLoading}
        paymentMethods={paymentMethods}
        isError={isError}
      />
    </div>
  );
}
