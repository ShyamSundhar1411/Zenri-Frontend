import { api } from "../apiClient";
import type { components } from "@/types/api";

type GetMyBankAccountsResponse =
  components["schemas"]["GetMyBankAccountsResponse"];
type BankAccount = components["schemas"]["BankAccount"];

export async function getMyBankAccounts(): Promise<BankAccount[]> {
  const res = await api.get<GetMyBankAccountsResponse>(
    "/api/v1/ledger/my-bank-accounts",
  );
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch bank accounts");
  }
  return res.data.data!;
}
