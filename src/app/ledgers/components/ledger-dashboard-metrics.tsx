import { Card, CardContent } from "@/components/ui/card";
import { Ledger } from "@/di/ledger";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
} from "@tabler/icons-react";
import { LedgerDashboardMetricsSkeleton } from "./ledger-dashboard-metrics-skeleton";

interface LedgerDashboardMetricsProps {
  currentMonthLedger: Ledger | undefined;
  isLoading: boolean;
  isError: boolean;
}
export function LedgerDashboardMetrics({
  currentMonthLedger,
  isLoading,
  isError,
}: LedgerDashboardMetricsProps) {
  const currencyCode = currentMonthLedger?.transactionMetadata?.currencyCode;
  const totalBalance = currentMonthLedger?.transactionMetadata?.netBalance;
  const totalInflow = currentMonthLedger?.transactionMetadata?.totalCredits;
  const totalOutflow = currentMonthLedger?.transactionMetadata?.totalDebits;
  const totalSavingsPercentage =
    currentMonthLedger?.transactionMetadata?.totalSavingsPercentage;
  const metrics = [
    {
      title: "Total Balance",
      value: `${totalBalance} ${currencyCode}`,
      trend: "This month",
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Inflow",
      value: `${totalInflow} ${currencyCode}`,
      trend: "This month",
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Outflow",
      value: `${totalOutflow} ${currencyCode}`,
      trend: "This month",
      icon: IconTrendingDown,
      color: "text-red-500",
    },
    {
      title: "Savings Rate",
      value: `${totalSavingsPercentage} %`,
      trend: "This month",
      icon: IconWallet,
      color: "text-green-500",
    },
  ];

  return (
    <>
      {isLoading ? (
        <LedgerDashboardMetricsSkeleton />
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
