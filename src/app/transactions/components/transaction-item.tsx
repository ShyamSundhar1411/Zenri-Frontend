"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { components } from "@/types/api";
import {
  IconCar,
  IconHome,
  IconShoppingBag,
  IconTrendingUp,
  IconWallet,
} from "@tabler/icons-react";

type Transaction = components["schemas"]["Transaction"];

interface TransactionItemProps {
  transaction: Transaction;
}

const getIcon = (categoryId: string) => {
  const category = categoryId.toLowerCase();

  if (category.includes("income") || category.includes("salary")) {
    return <IconTrendingUp className="h-4 w-4 text-green-500" />;
  }
  if (category.includes("food") || category.includes("grocery")) {
    return <IconShoppingBag className="h-4 w-4" />;
  }
  if (category.includes("utility") || category.includes("bill")) {
    return <IconHome className="h-4 w-4" />;
  }
  if (category.includes("transport") || category.includes("fuel")) {
    return <IconCar className="h-4 w-4" />;
  }

  return <IconWallet className="h-4 w-4 text-gray-500" />;
};
const getCategoryDisplayName = (categoryId: string) => {
  if (!categoryId) return "General";
  return categoryId.charAt(0).toUpperCase() + categoryId.slice(1).toLowerCase();
};
export function TransactionItem({ transaction }: TransactionItemProps) {
  const isCredit = transaction.transactionType === "CREDIT";
  const description = transaction.description || "No description";
  const categoryDisplayName = getCategoryDisplayName(transaction.categoryId);
  const dateString = transaction.transactedOn
    ? new Date(transaction.transactedOn).toLocaleDateString()
    : "N/A";
  const month = transaction.transactedOn
    ? new Date(transaction.transactedOn).toLocaleString("default", {
        month: "short",
      })
    : "N/A";

  const sign = isCredit ? "+" : "-";
  const amountString = `${sign}${transaction.currencyCode}${transaction.amount.toLocaleString("en-IN")}`;
  const amountColor = isCredit ? "text-green-500" : "text-foreground";
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer p-4">
      <CardContent className="flex items-center justify-between py-0 pt-1 pb-1 px-2">
        <div className="flex items-center gap-4">
          <div
            className={`
              p-2 rounded-lg flex items-center justify-center h-8 w-8 
              ${
                isCredit
                  ? "bg-green-100 dark:bg-green-900/40"
                  : "bg-gray-100 dark:bg-gray-700/50"
              }
          `}
          >
            {getIcon(transaction.categoryId)}
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-semibold text-sm leading-tight text-foreground">
              {description}
            </p>

            <div className="flex items-center gap-2 text-xs mt-1 text-gray-500 dark:text-gray-400">
              <Badge
                variant="secondary"
                className="h-4 text-xs px-2 py-0 font-normal bg-gray-200 dark:bg-gray-700/80"
              >
                {categoryDisplayName}
              </Badge>

              <span className="text-xs">{dateString}</span>

              <Badge
                variant="secondary"
                className="h-4 text-xs px-2 py-0 font-normal bg-gray-200 dark:bg-gray-700/80"
              >
                {month}
              </Badge>
            </div>
          </div>
        </div>

        <p className={`font-semibold text-base ${amountColor}`}>
          {amountString}
        </p>
      </CardContent>
    </Card>
  );
}
