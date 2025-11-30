import { BankAccount, GetMyBankAccountsResponse } from "@/di/account";
import { api } from "../apiClient";
import type { components } from "@/types/api";

export async function getMyBankAccounts(): Promise<BankAccount[]> {
  const res = await api.get<GetMyBankAccountsResponse>(
    "/api/v1/accounts/bank-accounts",
  );
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch bank accounts");
  }
  return res.data.data!;
}
