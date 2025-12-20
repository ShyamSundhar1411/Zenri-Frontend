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

export function useCreateCard() {
  const queryClient = useQueryClient();

  const mutationFn = async (
    data: CreateCardRequest,
  ): Promise<DebitCard | CreditCard> => {
    const { type, ...payload } = data;
    if (type === "debit") {
      return await createDebitCard(payload as CreateDebitCardRequest);
    }
    return await createCreditCard(payload as CreateCreditCardRequest);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cards"] });
    },
  });
}
