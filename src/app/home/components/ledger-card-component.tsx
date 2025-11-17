"use client";
import type { components } from "@/types/api";

type Ledger = components["schemas"]["Ledger"];
interface LedgerCardProps {
  ledger: Ledger;
}

export function LedgerCard({ ledger }: LedgerCardProps) {
  return (
    <div className="rounded-lg border p-4 transition hover:shadow-md bg-white dark:bg-neutral-900 w-full sm:w-[350px] cursor-pointer">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {ledger.month} {ledger.year}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Ledger ID: {ledger.id}
      </p>
    </div>
  );
}
