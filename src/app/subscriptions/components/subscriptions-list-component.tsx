"use client";

import { SearchBarComponent } from "@/app/components/search-bar";
import { useSubscriptions } from "@/hooks/subscription/mutations/useSubscriptions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SubscriptionSkeleton } from "./subscription-skeleton-component";

export default function SubscriptionListComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: subscriptions, isLoading, error, isError } = useSubscriptions();
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);
  console.log(subscriptions);
  return (
    <div className="flex flex-col w-full py-6">
      <SearchBarComponent
        placeHolder="Search for a subscription"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-6 grid grid-cols-4 justify-start gap-4">
        {isLoading &&
          [...Array(6)].map((_, i) => <SubscriptionSkeleton key={i} />)}
      </div>
    </div>
  );
}
