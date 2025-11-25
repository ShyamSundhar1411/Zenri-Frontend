import { api } from "../apiClient";
import type { components } from "@/types/api";

type GetMyCategoriesResponse = components["schemas"]["GetMyCategoriesResponse"];
type Category = components["schemas"]["Category"];

export async function getMyCategories(): Promise<Category[]> {
  const res = await api.get<GetMyCategoriesResponse>("/api/v1/categories/");
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch categories");
  }
  return res.data.data!;
}
