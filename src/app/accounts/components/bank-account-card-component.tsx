"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { components } from "@/types/api";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

type BankAccount = components["schemas"]["BankAccount"];

interface BankAcccountCardProps {
  account: BankAccount;
  className?: string;
}

export function BankAccountCard({ account, className }: BankAcccountCardProps) {
  const maskedAccount = account.accountNumber
    ? "•••• •••• " + account.accountNumber.slice(-4)
    : "—";

  const balanceNum = Number(account.balance ?? 0);

  const formattedBalance = isNaN(balanceNum)
    ? "₹0.00"
    : balanceNum.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

  const accountTypeName = account.accountType?.accountTypeName ?? "Account";

  const statusColors =
    account.status === "ACTIVE"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : account.status === "INACTIVE"
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { type: "spring", stiffness: 250, damping: 18 },
      }}
      whileTap={{ scale: 0.99 }}
      className="w-full"
    >
      <Card
        className={cn(
          "rounded-2xl border bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300",
          className,
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
              <span className="text-2xl font-semibold">
                {(account.bankName ?? "B").charAt(0)}
              </span>
            </div>

            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {account.bankName ?? "Bank Account"}
              </CardTitle>
              <Badge variant="outline" className="mt-1 text-xs px-2 py-0.5">
                {accountTypeName}
              </Badge>
            </div>
          </div>

          <Badge className={cn("px-3 py-1 text-xs font-medium", statusColors)}>
            {account.status}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Account Number
            </span>
            <span className="font-mono text-sm tracking-wide">
              {maskedAccount}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="text-2xl font-semibold">{`₹${formattedBalance}`}</span>
          </div>

          {account.createdAt && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Created On</span>
              <span className="text-sm">{formatDate(account.createdAt)}</span>
            </div>
          )}

          {account.updatedAt && (
            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated on {formatDate(account.updatedAt)}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
