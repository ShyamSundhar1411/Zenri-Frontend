"use client";

import { createTransaction } from "@/api/transaction/createTransaction";
import { CreateTransactionRequest, Transaction } from "@/di/transaction";
import { components } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation<Transaction, Error, CreateTransactionRequest>({
    mutationFn: async (data) => await createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-transactions"] });
    },
  });
}
