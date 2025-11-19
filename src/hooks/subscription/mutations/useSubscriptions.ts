import { getMySubscriptions } from "@/api/subscription/getSubscriptions";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import type { components } from "@/types/api";
type Subscriptions = components["schemas"]["Subscriptions"];
export function useSubscriptions() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);
  return useQuery({
    queryKey: ["my-subscriptions"],
    queryFn: async (): Promise<Subscriptions> => {
      const subscriptions = await getMySubscriptions();
      return subscriptions;
    },
    enabled: isAuthLoaded && !!tokens?.accessToken,
  });
}
