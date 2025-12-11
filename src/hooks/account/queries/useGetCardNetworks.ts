import { getCardNetworks } from "@/api/account/getCardNetworks";
import { CardNetwork } from "@/di/account";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export function useGetCardNetworks(enabled: boolean) {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);
  const isEnabled = isAuthLoaded && tokens! && enabled;
  return useQuery({
    queryKey: ["card-networks"],
    queryFn: async (): Promise<CardNetwork[]> => {
      const cardNetworks = await getCardNetworks();
      return cardNetworks;
    },
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000,
  });
}
