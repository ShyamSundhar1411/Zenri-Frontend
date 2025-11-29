import { Card, CardContent } from "@/components/ui/card";
import {
  IconArrowsUpDown,
  IconBusinessplan,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

import type { components } from "@/types/api";
import { useMemo } from "react";
import { TransactionDashboardMetricsSkeleton } from "./transaction-dashboard-metrics-skeleton";

type Transaction = components["schemas"]["Transaction"];

interface TransactionDashboardMetricsProps {
  transactions: Transaction[];
  isLoading: boolean;
}
export function TransactionDashboardMetrics({
  transactions,
  isLoading,
}: TransactionDashboardMetricsProps) {
  const { totalInflow, totalOutflow, totalInvested, netBalance } =
    useMemo(() => {
      let totalInflow = 0;
      let totalOutflow = 0;
      let totalInvested = 0;

      for (const tx of transactions) {
        const amount = parseFloat(String(tx.amount));

        if (tx.transactionType === "CREDIT") totalInflow += amount;
        if (tx.transactionType === "DEBIT") totalOutflow += amount;

        if (
          tx.category?.categoryName?.toLowerCase().includes("invest") ||
          tx.category?.categoryName?.toLowerCase().includes("stock")
        ) {
          totalInvested += amount;
        }
      }

      return {
        totalInflow,
        totalOutflow,
        totalInvested,
        netBalance: totalInflow - totalOutflow - totalInvested,
      };
    }, [transactions]);
  const metrics = [
    {
      title: "Total Inflow",
      value: `₹${totalInflow.toLocaleString("en-IN")}`,
      trend: `${transactions.filter((t) => t.transactionType === "CREDIT").length} credits`,
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Outflow",
      value: `₹${totalOutflow.toLocaleString("en-IN")}`,
      trend: `${transactions.filter((t) => t.transactionType === "DEBIT").length} debits`,
      icon: IconTrendingDown,
      color: "text-red-500",
    },
    {
      title: "Total Invested",
      value: `₹${totalInvested.toLocaleString("en-IN")}`,
      trend: "",
      icon: IconArrowsUpDown,
      color: "text-primary",
    },
    {
      title: "Net Cash",
      value: `₹${netBalance.toLocaleString("en-IN")}`,
      trend: "",
      icon: IconBusinessplan,
      color: netBalance >= 0 ? "text-green-500" : "text-red-500",
    },
  ];

  return (
    <>
      {isLoading ? (
        <TransactionDashboardMetricsSkeleton />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3 mt-4">
          {metrics.map((metric, idx) => (
            <Card
              className="p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-accent-foreground"
              key={idx}
            >
              <CardContent className="flex flex-col gap-2 mt-2 mb-2   ">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium text-foreground">
                    {metric.title}
                  </h2>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <p className={`text-2xl font-semibold text-${metric.color}`}>
                  {metric.value}
                </p>
                <p className={`text-sm ${metric.color}/80`}>{metric.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
