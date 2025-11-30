"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Subscription } from "@/di/subscription";
import { formatDate } from "@/lib/date-utils";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface SusbcriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SusbcriptionCardProps) {
  return (
    <Card className="rounded-lg border border-foreground hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16  rounded-lg bg-primary/10 flex items-center justify-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {subscription.subscriptionName.charAt(0)}
            </h1>
          </div>
          <div className="flex-1">
            <CardTitle className="text-base font-semibold">
              {subscription.subscriptionName}
            </CardTitle>

            {subscription.category && (
              <p className="text-sm text-muted-foreground mt-1">
                {subscription.category.categoryName}
              </p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-lg font-semibold">
              {subscription.amount} {subscription.currencyCode}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Billing</span>
            <Badge variant="outline">{subscription.paymentCycle}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span
              className={`font-semibold ${
                subscription.status === "SUBSCRIBED"
                  ? "text-green-600"
                  : subscription.status === "BILL_OVERDUE"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {subscription.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm pt-2">
            <div>
              <span className="text-muted-foreground">Subscribed On</span>
              <p>{formatDate(subscription.subscribedOn)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Expires On</span>
              <p>{formatDate(subscription.expiresOn)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Billed At</span>
              <p>{formatDate(subscription.lastBilledAt)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Next Billing Date</span>
              <p>{formatDate(subscription.nextBillingDate)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
