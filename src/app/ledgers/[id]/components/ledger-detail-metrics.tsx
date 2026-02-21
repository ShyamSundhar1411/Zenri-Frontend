import { Card, CardContent } from "@/components/ui/card";
import { Ledger } from "@/di/ledger";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
  IconClock,
} from "@tabler/icons-react";
import { LedgerDetaildMetricsSkeleton } from "./ledger-detail-metric-skeleton";
import { PieChart } from "lucide-react";

interface LedgerDashboardMetricsProps {
  currentMonthLedger: Ledger | undefined;
  isLoading: boolean;
  isError: boolean;
}
export function LedgerDetailMetrics({
  currentMonthLedger,
  isLoading,
  isError,
}: LedgerDashboardMetricsProps) {
  const currencyCode = currentMonthLedger?.transactionMetadata?.currencyCode ?? "INR";
  const totalBalance = currentMonthLedger?.transactionMetadata?.netBalance ?? 0;
  const totalInflow = currentMonthLedger?.transactionMetadata?.totalCredits ?? 0;
  const totalOutflow = currentMonthLedger?.transactionMetadata?.totalDebits ?? 0;
  const totalSavingsPercentage =
    currentMonthLedger?.transactionMetadata?.totalSavingsPercentage ?? 0;
  const numberOfCredits = currentMonthLedger?.transactionMetadata?.numberOfCredits ?? 0;
  const numberOfDebits = currentMonthLedger?.transactionMetadata?.numberOfDebits ?? 0;
  const averageExpense = currentMonthLedger?.transactionMetadata?.avgExpense ?? 0;
  const metrics = [
    {
      title: "Net Balance",
      value: `${totalBalance} ${currencyCode}`,
      trend: `${totalSavingsPercentage} % saved`,
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Inflow",
      value: `${totalInflow} ${currencyCode}`,
      trend: `${numberOfCredits} transactions`,
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Outflow",
      value: `${totalOutflow} ${currencyCode}`,
      trend: `${numberOfDebits} transactions`,
      icon: IconTrendingDown,
      color: "text-red-500",
    },
    {
      title: "Daily Average",
      value: `${averageExpense} ${currencyCode}`,
      trend: "Per day spending",
      icon: PieChart,
      color: "text-green-500",
    },
  ];

  return (
    <>
      {isLoading ? (
        <LedgerDetaildMetricsSkeleton />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-4 mt-4">
          {metrics.map((metric, idx) => (
            <Card
              key={idx}
              className="p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-accent-foreground"
            >
              <CardContent className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium text-foreground">
                    {metric.title}
                  </h2>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <p className="text-2xl font-semibold text-foreground">
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
