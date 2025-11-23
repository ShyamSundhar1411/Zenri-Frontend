"use client";
import { useEffect } from "react";
import { TransactionDashboardMetrics } from "./transaction-dashboard-metrics";
import { TransactionsList } from "./transactions-list";
import { toast } from "sonner";
import { useGetMyTransactions } from "@/hooks/transaction/queries/useGetMyTransactions";

export function TransactionDashboard() {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetMyTransactions();
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
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
