import { getMyCards } from "@/api/account/getCards";
import { Card } from "@/di/account";
import { useAuthStore } from "@/store/auth-store";
import { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMyCards() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);

  return useQuery({
    queryKey: ["my-cards"],
    queryFn: async (): Promise<Card> => {
      const cards = await getMyCards();
      return cards;
    },
    enabled: isAuthLoaded && !!tokens?.accessToken,
  });
}
