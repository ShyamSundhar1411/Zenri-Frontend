import { getMyCategories } from "@/api/category/getCategories";
import { useAuthStore } from "@/store/auth-store";
import { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
type Category = components["schemas"]["Category"];

export function useGetMyCategories() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const tokens = useAuthStore((state) => state.tokens);
  return useQuery({
    queryKey: ["my-category"],
    queryFn: async (): Promise<Category[]> => {
      const categories = await getMyCategories();
      return categories;
    },
    enabled: isAuthLoaded && !!tokens?.accessToken,
  });
}
