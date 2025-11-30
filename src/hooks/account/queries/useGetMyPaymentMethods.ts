import { getMyPaymentMethods } from "@/api/account/getPaymentMethods";
import { PaymentMethod } from "@/di/account";
import { useAuthStore } from "@/store/auth-store";
import { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMyPaymentMethods() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: async (): Promise<PaymentMethod[]> => {
      const paymentMethods = await getMyPaymentMethods();
      return paymentMethods;
    },
    enabled: isAuthLoaded && !!tokens?.accessToken,
  });
}
