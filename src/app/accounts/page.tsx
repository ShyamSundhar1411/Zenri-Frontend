"use client";

import { useState } from "react";

import { UnderlineNav } from "../components/underline-nav";
import { CardDashboard } from "./components/bank-card/card-dashboard";
import { BankAccountDashboard } from "./components/bank-account/bank-account-dashboard";
import { PaymentMethodDashboard } from "./components/payment-method/payment-method-dashboard";

export default function MyAccounts() {
  const [selected, setSelected] = useState<
    "bank" | "cards" | "payment methods"
  >("bank");

  return (
    <div className="flex flex-col h-full w-full p-6 overflow-y-auto">
      <div className="flex flex-col w-full px-4 py-6">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-foreground">My Accounts</h1>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Manage your accounts, cards and payment methods
        </p>

        <UnderlineNav
          className="mt-6"
          selected={selected}
          onChange={setSelected}
          items={[
            { label: "Bank Accounts", value: "bank" },
            { label: "Cards", value: "cards" },
            { label: "Payment Methods", value: "payment methods" },
          ]}
        />

        <div className="mt-6">
          {selected === "bank" && <BankAccountDashboard />}

          {selected === "cards" && <CardDashboard />}

          {selected === "payment methods" && <PaymentMethodDashboard />}
        </div>
      </div>
    </div>
  );
}
