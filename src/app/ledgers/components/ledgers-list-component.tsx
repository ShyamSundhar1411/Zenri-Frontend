"use client";

import { useGetMyLedgers } from "@/hooks/ledger/queries/useGetMyLedgers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LedgerSkeleton } from "./ledger-skeleton-component";
import { LedgerCard } from "./ledger-card-component";
import { SearchBarComponent } from "@/app/components/search-bar";
import { Ledger } from "@/di/ledger";

interface LedgerListComponentProps {
  ledgers: Ledger[];
  isLoading: boolean;
  searchQuery: string;
  isError: boolean;
  setSearchQuery: (query: string) => void;
}
export default function LedgerListComponent({
  ledgers,
  isLoading,
  searchQuery,
  setSearchQuery,
  isError,
}: LedgerListComponentProps) {
  return (
    <div className="flex flex-col w-full py-4">
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
            {ledgers.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No ledgers found.
              </p>
            ) : (
              ledgers.map((ledger) => (
                <LedgerCard key={ledger.id} ledger={ledger} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
