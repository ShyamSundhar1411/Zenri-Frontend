import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconCreditCard,
  IconCurrencyRupee,
  IconList,
} from "@tabler/icons-react";

export function SubscriptionDashboardMetric() {
  const metrics = [
    {
      title: "Total Monthly Estimate",
      value: "₹4,327",
      description:
        "Estimated total cost of all your active subscriptions for this month.",
      icon: <IconCurrencyRupee className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Active Subscriptions",
      value: 3,
      description: "Number of subscriptions you currently have active.",
      icon: <IconList className="text-blue-500 w-6 h-6" />,
    },
    {
      title: "Auto Pay Enabled",
      value: 2,
      description:
        "Subscriptions with auto-pay turned on for hassle-free payments.",
      icon: <IconCreditCard className="text-purple-500 w-6 h-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
