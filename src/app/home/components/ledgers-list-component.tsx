"use client";

import { useLedgers } from "@/hooks/ledger/queries/useLedgers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { LedgerSkeleton } from "./ledger-skeleton-component";
import { LedgerCard } from "./ledger-card-component";
import { IconSearch } from "@tabler/icons-react";

export default function LedgerListComponent() {
  const { data: ledgers, isLoading, isError, error } = useLedgers();

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
        <h1 className="text-2xl font-bold text-foreground">My Ledgers</h1>
        <div className="relative w-full sm:w-[400px]">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <IconSearch className="w-5 h-5 text-gray-400 dark:text-gray-300" />
          </span>
          <Input
            type="text"
            placeholder="Search Ledger"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
