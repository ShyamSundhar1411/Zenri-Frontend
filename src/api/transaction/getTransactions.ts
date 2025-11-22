import { api } from "../apiClient";
import type { components } from "@/types/api";

type GetMyTransactionResponse =
  components["schemas"]["GetMyTransactionsResponse"];
type Transaction = components["schemas"]["Transaction"];

export async function getMyTransactions(): Promise<Transaction[]> {
  const res = await api.get<GetMyTransactionResponse>("/transactions");
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch transactions");
  }
  return res.data.data!;
}
