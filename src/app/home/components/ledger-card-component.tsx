"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IconCalendarEvent } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Ledger } from "@/di/ledger";
import { TrendingDown, TrendingUp } from "lucide-react";

interface LedgerCardProps {
  ledger: Ledger;
}

export function LedgerCard({ ledger }: LedgerCardProps) {
  const savings = ledger.transactionMetadata?.totalSavingsPercentage ?? 0;
  const isPositive =
    (ledger.transactionMetadata?.totalCredits ?? 0) >
    (ledger.transactionMetadata?.totalDebits ?? 0);
  return (
    <Link href={`/ledgers/${ledger.id}`} className="block">
      <Card className="w-full sm:w-[300px] hover:shadow-lg border border-foreground transition-shadow duration-300">
        <CardHeader className="bg-transparent">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <IconCalendarEvent className="w-5 h-5" />
              {ledger.month} {ledger.year}
            </CardTitle>

            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {ledger.transactionMetadata?.transactions} Transactions
            </Badge>

            <Badge className="bg-primary text-primary-foreground">
              {savings}% saved
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">Net Balance</p>
              <p className="font-bold text-lg whitespace-nowrap">
                {ledger.transactionMetadata?.netBalance}{" "}
                {ledger.transactionMetadata?.currencyCode}
              </p>
            </div>

            <Progress value={savings} className="h-3 bg-secondary" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Total Inflow
              </span>
              <p className="font-semibold text-green-500">
                +{ledger.transactionMetadata?.totalCredits}{" "}
                {ledger.transactionMetadata?.currencyCode}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Total Outflow
              </span>
              <p className="font-semibold text-destructive">
                -{ledger.transactionMetadata?.totalDebits}{" "}
                {ledger.transactionMetadata?.currencyCode}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
