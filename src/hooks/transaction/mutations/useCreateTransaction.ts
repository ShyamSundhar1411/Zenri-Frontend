"use client";

import { createTransaction } from "@/api/transaction/createTransaction";
import { components } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Transaction = components["schemas"]["Transaction"];
type CreateTransactionRequest =
  components["schemas"]["TransactionCreateRequest"];

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation<Transaction, Error, CreateTransactionRequest>({
    mutationFn: async (data) => await createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-transactions"] });
    },
  });
}
