"use client";


import { useLedgers } from "@/hooks/ledger/useLedgers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { LedgerSkeleton } from "./ledger-skeleton-component";
import { LedgerCard } from "./ledger-card-component";

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
                .includes(searchQuery.toLowerCase())
        ) || [];
    return (
        <div className="flex flex-col w-full items-start px-4 justify-center">
            <Input type="text" placeholder="Search Leadger"
                onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}
                className="w-xl px-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white"
            />
            <div className="mt-6 flex flex-col items-center justify-center">
                {isLoading && (
                    <div className="flex flex-wrap gap-4">
                        {[...Array(6)].map((_, i) => (
                            <LedgerSkeleton key={i} />
                        ))}
                    </div>
                )}
                {!isLoading && !isError && (
                    <div className="flex flex-wrap gap-4">
                        {filteredLedgers.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">
                                No ledgers found.
                            </p>
                        ) : (
                            filteredLedgers?.map((ledger) => (
                                <LedgerCard key={ledger.id} ledger={ledger} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
