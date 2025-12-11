"use client";

import { createDebitCard, createCreditCard } from "@/api/account/createCards";
import {
  CreateDebitCardRequest,
  CreateCreditCardRequest,
  Card,
  CreateCardRequest,
  DebitCard,
  CreditCard,
} from "@/di/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCard(type: "credit" | "debit" = "credit") {
  const queryClient = useQueryClient();

  const mutationFn = async (
    data: CreateCardRequest,
  ): Promise<DebitCard | CreditCard> => {
    if (type === "debit") {
      return await createDebitCard(data as CreateDebitCardRequest);
    }
    return await createCreditCard(data as CreateCreditCardRequest);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cards"] });
    },
  });
}
