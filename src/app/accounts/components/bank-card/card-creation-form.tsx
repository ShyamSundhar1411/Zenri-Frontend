"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DebitCardSchema = z.object({
  type: z.literal("debit"),
  cardNumber: z.string().max(19, "Card Number cannot be more than 16"),
  cardHolderName: z.string(),
  cardNetwork: z.string(),
  bankAccount: z.string(),
  expiresAt: z.string(),
});

export const CreditCardSchema = z.object({
  type: z.literal("credit"),
  cardNumber: z.string().max(19, "Card Number cannot be more than 16"),
  cardHolderName: z.string(),
  cardNetwork: z.string(),
  issuer: z.string(),
  limit: z.coerce.number<number>().min(0, "Limit must be positive"),
  balance: z.coerce.number<number>().min(0, "Balance must be positive"),
  expiresAt: z.string(),
});

export const CardSchema = z.discriminatedUnion("type", [
  DebitCardSchema,
  CreditCardSchema,
]);

export type CardFormData = z.infer<typeof CardSchema>;

export function useCardForm() {
  const form = useForm<CardFormData>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      type: "debit",
      cardNumber: "",
      cardHolderName: "",
      expiresAt: "",
      cardNetwork: "",
      bankAccount: "",
    },
  });
  return form;
}
