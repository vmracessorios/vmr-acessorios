import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    throw error;
  }

  return data as Category[];
}

export async function createCategory(
  category: Partial<Omit<Category, "id" | "created_at" | "updated_at">>
) {
  const { error } = await supabase
    .from("categories")
    .insert([
      {
        active: true,
        ...category,
      },
    ]);

  if (error) {
    throw error;
  }
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}