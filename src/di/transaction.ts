import { components } from "@/types/api";

export type CreateTransactionRequest =
  components["schemas"]["TransactionCreateRequest"];
export type CreateTransactionResponse =
  components["schemas"]["CreateTransactionResponse"];
export type Transaction = components["schemas"]["Transaction"];

export type GetMyTransactionResponse =
  components["schemas"]["GetMyTransactionsResponse"];

export type TransactionDetail = components["schemas"]["TransactionDetail"]