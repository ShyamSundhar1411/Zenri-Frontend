import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import SubscriptionListComponent from "./components/subscriptions-list-component";
import { SubscriptionDashboardMetric } from "./components/subscription-dashboard-metrics";

export default function MySubscriptions() {
  return (
    <div className="flex flex-col h-full w-full p-6 overflow-y-auto">
      <div className="flex flex-col w-full px-4 py-6">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-foreground">
            My Subscriptions
          </h1>
          <Button className="flex items-center gap-2 py-4 transition">
            <IconPlus className="w-4 h-4" />
            New Subscription
          </Button>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Manage your susbcriptions
        </p>
        <SubscriptionDashboardMetric />
        <SubscriptionListComponent />
      </div>
    </div>
  );
}
