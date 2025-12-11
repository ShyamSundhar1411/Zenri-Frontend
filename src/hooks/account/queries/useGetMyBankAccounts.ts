import { getMyBankAccounts } from "@/api/account/getAccounts";
import { BankAccount } from "@/di/account";
import { useAuthStore } from "@/store/auth-store";
import type { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMyBankAccounts(enabled: boolean = true) {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);
  const isEnabled = isAuthLoaded && !!tokens?.accessToken && enabled;
  return useQuery({
    queryKey: ["my-bank-accounts"],
    queryFn: async (): Promise<BankAccount[]> => {
      const accounts = await getMyBankAccounts();
      return accounts;
    },
    enabled: isEnabled,
  });
}
