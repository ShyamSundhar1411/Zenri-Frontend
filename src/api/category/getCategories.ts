import { Category, GetMyCategoriesResponse } from "@/di/category";
import { api } from "../apiClient";
import type { components } from "@/types/api";

export async function getMyCategories(): Promise<Category[]> {
  const res = await api.get<GetMyCategoriesResponse>("/api/v1/categories/");
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch categories");
  }
  return res.data.data!;
}
