"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatDateTime } from "@/lib/date-utils";
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

const getIcon = (categoryName: string|undefined) => {
  if (!categoryName) return <IconWallet className="h-4 w-4 text-gray-500" />;
  const category = categoryName.toLowerCase();

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
const getCategoryDisplayName = (categoryName: string|undefined) => {
  if (!categoryName) return "General";
  return categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
};
export function TransactionItem({ transaction }: TransactionItemProps) {
  const isCredit = transaction.transactionType === "CREDIT";
  const description = transaction.description || "No description";
  const categoryDisplayName = getCategoryDisplayName(transaction.category?.categoryName);
  const dateString = formatDateTime(transaction.transactedOn);

  const month = formatDateTime(transaction.transactedOn, "MMM");

  const sign = isCredit ? "+" : "-";
  const amountString = `${sign} ${transaction.amount.toLocaleString("en-IN")} ${transaction.currencyCode} `;
  const amountColor = isCredit ? "text-green-500" : "text-foreground";
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`
                    p-2 rounded-lg flex items-center justify-center h-9 w-9
                ${
                  isCredit
                    ? "bg-green-100 dark:bg-green-900/40"
                    : "bg-gray-100 dark:bg-gray-700/50"
                }`}
          >
            {getIcon(transaction.category?.categoryName)}
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-semibold text-sm laeding-tight text-foreground">
              {description}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-xs">
                {categoryDisplayName}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {dateString}
              </span>
              <Badge variant="secondary" className="text-xs">
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
