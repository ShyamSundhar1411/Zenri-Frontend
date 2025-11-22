import { Card, CardContent } from "@/components/ui/card";
import {
  IconArrowsUpDown,
  IconBusinessplan,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

export function TransactionDashboardMetrics() {
  const metrics = [
    {
      title: "Total Expenses",
      value: "₹45,230",
      trend: "3 transactions",
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Expenses",
      value: "₹12,000",
      trend: "11 transactions",
      icon: IconTrendingDown,
      color: "text-red-500",
    },
    {
      title: "Total Invested",
      value: "₹25,000",
      trend: "2 Transactions",
      icon: IconArrowsUpDown,
      color: "text-primary",
    },
    {
      title: "Net Savings",
      value: "₹1,42,251",
      trend: "After expenses & investments",
      icon: IconBusinessplan,
      color: "text-primary",
    },
  ];
  return (
    <div className="grid sm:grid-cols-1 md:grid-4 lg:grid-cls-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3 mt-4">
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
  );
}
