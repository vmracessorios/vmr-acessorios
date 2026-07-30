import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { uploadProductImage } from "./storage";

export async function getProducts(
  showInactive = true
): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      ),
      product_images (
        id,
        storage_path,
        alt_text
      )
    `)
    .order("created_at", { ascending: false });

  if (!showInactive) {
    query = query.eq("active", true);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data as Product[];
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      ),
      product_images (
        id,
        storage_path,
        alt_text
      )
    `)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) throw error;

  return data as Product | null;
}

export async function createProduct(
  product: Omit<
    Product,
    "id" | "created_at" | "updated_at" | "categories" | "product_images"
  >,
  images: File[]
) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;

  for (const image of images) {
    const upload = await uploadProductImage(image);

    const { error: imageError } = await supabase
      .from("product_images")
      .insert({
        product_id: data.id,
        storage_path: upload.storagePath,
        alt_text: product.name,
      });

    if (imageError) throw imageError;
  }

  return data;
}

export async function updateProduct(
  id: string,
  product: Partial<Product>
) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function toggleProductStatus(
  id: string,
  active: boolean
) {
  const { error } = await supabase
    .from("products")
    .update({ active })
    .eq("id", id);

  if (error) throw error;
}

export async function updateProductStock(
  id: string,
  stock: number
) {
  const { error } = await supabase
    .from("products")
    .update({ stock })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}