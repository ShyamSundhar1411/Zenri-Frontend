"use client";

import { SearchBarComponent } from "@/app/components/search-bar";
import { useGetMySubscriptions } from "@/hooks/subscription/queries/useGetMySubscriptions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SubscriptionSkeleton } from "./subscription-skeleton-component";
import { SubscriptionCard } from "./subscription-card-component";

export default function SubscriptionListComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: subscriptions,
    isLoading,
    error,
    isError,
  } = useGetMySubscriptions();
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);
  const filteredSubscriptions =
    subscriptions?.filter((subscription) =>
      `${subscription.subscriptionName} ${subscription.amount}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) || [];
  return (
    <div className="flex flex-col w-full py-6">
      <SearchBarComponent
        placeHolder="Search for a subscription"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
        {isLoading &&
          [...Array(6)].map((_, i) => <SubscriptionSkeleton key={i} />)}
        {!isLoading && !isError && (
          <>
            {filteredSubscriptions.map((subscription, index) => (
              <SubscriptionCard subscription={subscription} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
