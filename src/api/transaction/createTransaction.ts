import { api } from "../apiClient";
import type { components } from "@/types/api";

type CreateTransactionRequest =
  components["schemas"]["TransactionCreateRequest"];
type CreateTransactionResponse =
  components["schemas"]["CreateTransactionResponse"];
type Transaction = components["schemas"]["Transaction"];

export async function createTransaction(
  data: CreateTransactionRequest,
): Promise<Transaction> {
  const res = await api.post<CreateTransactionResponse>(
    "/api/v1/transactions/",
    data,
  );
  console.log(res);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to create transaction");
  }
  return res.data.data!;
}
