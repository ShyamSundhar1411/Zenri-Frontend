import { Card, CardContent } from "@/components/ui/card";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

export function DashboardMetrics() {
  const metrics = [
    {
      title: "Total Balance",
      value: "₹45,230",
      trend: "+12.5% from last month",
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Income",
      value: "₹65,000",
      trend: "This month",
      icon: IconTrendingUp,
      color: "text-green-500",
    },
    {
      title: "Expenses",
      value: "₹19,770",
      trend: "This month",
      icon: IconTrendingDown,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-4 mt-4">
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
  );
}
