"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { components } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { maskNumber } from "@/lib/string-utils";
import { formatDate, formatExpiry } from "@/lib/date-utils";

type PaymentMethod = components["schemas"]["PaymentMethod"];

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function PaymentMethodCard({
  method,
  onEdit,
  onDelete,
  onSetDefault,
}: PaymentMethodCardProps) {
  const typeName = method.paymentMethodType?.paymentMethodTypeName || "Unknown";

  return (
    <Card className="border border-foreground">
      <div className="flex flex-col justify-center pl-4">
        <CardHeader className="p-2">
          <CardTitle className="flex items-center">
            <span>{typeName}</span>
          </CardTitle>
          <div className="flex flex-row justify-start gap-2">
            {method.providerName && (
              <Badge className="bg-foreground text-primary-foreground">
                {method.providerName}
              </Badge>
            )}
            {method.externalHandle && (
              <Badge variant="outline" className="font-mono text-xs">
                {method.externalHandle}
              </Badge>
            )}
            {method.isDefault && (
              <Badge className="backdrop-blur-md text-foreground-primary bg-green-500/20   border  border-green-500/30   shadow-sm">
                Default
              </Badge>
            )}
          </div>
          {method.notes && (
            <CardDescription className="text-sm">
              {method.notes}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          {method.creditCard && (
            <div>
              {method.creditCard.issuer && (
                <p className="font-mono">
                  {maskNumber(method.creditCard.issuer)}
                </p>
              )}
              {method.creditCard.cardNumber && (
                <p className="font-mono">
                  {maskNumber(method.creditCard.cardNumber)}
                </p>
              )}
              <p className="text-sm">
                Exp: {formatExpiry(method.creditCard.expiresAt)}
              </p>
            </div>
          )}

          {method.debitCard && (
            <div>
              {method.debitCard.cardNumber && (
                <p className="font-mono">
                  {maskNumber(method.debitCard.cardNumber)}
                </p>
              )}
              <p className="text-sm">
                Exp: {formatExpiry(method.debitCard.expiresAt)}
              </p>
            </div>
          )}

          {method.bankAccount && (
            <div>
              <p className="font-semibold">{method.bankAccount.bankName}</p>
              {method.bankAccount.accountNumber && (
                <p className="font-mono">
                  Account: ****{method.bankAccount.accountNumber.slice(-4)}
                </p>
              )}
            </div>
          )}

          <p className="text-xs text-gray-400">
            Added: {formatDate(method.createdAt, "DD/MM/YYYY")}
          </p>
        </CardContent>
        <div className="flex flex-row gap-2 pl-2 justify-start">
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(method.id!)}
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onDelete(method.id!)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
