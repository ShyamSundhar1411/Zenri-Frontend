"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { components } from "@/types/api";
import { IconCalendarEvent } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

type Ledger = components["schemas"]["Ledger"];
interface LedgerCardProps {
  ledger: Ledger;
}

export function LedgerCard({ ledger }: LedgerCardProps) {
  return (
    <Card className="w-full sm:w-[300px] hover:shadow-lg border border-foreground transition-shadow duration-300">
      <CardHeader className="bg-transparent">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <IconCalendarEvent className="w-5 h-5" />
          {ledger.month} {ledger.year}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge className="bg-foreground text-primary-foreground">42 Transactions</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-foreground/70">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-muted-foreground">Balance</p>
          <p className="font-semibold text-foreground">₹40,000</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-muted-foreground">Income</p>
          <p className="font-semibold text-green-600">+ ₹40,000</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-muted-foreground">Expense</p>
          <p className="font-semibold text-red-600">- ₹40,000</p>
        </div>
      </CardContent>
    </Card>
  );
}
