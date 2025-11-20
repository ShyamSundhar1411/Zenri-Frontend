"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { UnderlineNav } from "../components/underline-nav";

export default function MyAccounts() {
  const [selected, setSelected] = useState<"bank" | "cards">("bank");

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <div className="flex flex-col w-full px-4 py-6">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-foreground">My Accounts</h1>
          <Button className="flex items-center gap-2 py-4 transition">
            <IconPlus className="w-4 h-4" />
            New Account
          </Button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Manage your accounts
        </p>

        <UnderlineNav
          className="mt-6"
          selected={selected}
          onChange={setSelected}
          items={[
            { label: "Bank Accounts", value: "bank" },
            { label: "Cards", value: "cards" },
          ]}
        />

        <div className="mt-6">
          {selected === "bank" && (
            <div className="text-muted-foreground text-lg">
              No bank accounts added yet.
            </div>
          )}

          {selected === "cards" && (
            <div className="text-muted-foreground text-lg">
              No cards available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
