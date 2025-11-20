"use client";

import { useGetMyLedgers } from "@/hooks/ledger/queries/useGetMyLedgers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LedgerSkeleton } from "./ledger-skeleton-component";
import { LedgerCard } from "./ledger-card-component";
import { SearchBarComponent } from "@/app/components/search-bar";

export default function LedgerListComponent() {
  const { data: ledgers, isLoading, isError, error } = useGetMyLedgers();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  const filteredLedgers =
    ledgers?.filter((ledger) =>
      `${ledger.month} ${ledger.year}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <div className="flex flex-col w-full px-4 py-6">
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-foreground">My Ledgers</h1>

        <SearchBarComponent
          placeHolder="Search Ledger"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-start gap-4">
        {isLoading && [...Array(6)].map((_, i) => <LedgerSkeleton key={i} />)}

        {!isLoading && !isError && (
          <>
            {filteredLedgers.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No ledgers found.
              </p>
            ) : (
              filteredLedgers.map((ledger) => (
                <LedgerCard key={ledger.id} ledger={ledger} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
