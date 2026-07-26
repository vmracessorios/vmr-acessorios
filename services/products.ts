import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { uploadProductImage } from "./storage";

export async function getProducts(): Promise<Product[]> {
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
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ERRO getProducts:");
    console.error(JSON.stringify(error, null, 2));
    throw error;
  }

  return data as Product[];
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  console.log("================================");
  console.log("SLUG RECEBIDO:", slug);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  console.log("DADOS:", data);
  console.log("ERRO:", error);
  console.log("================================");

  if (error) {
    throw error;
  }

  return data as Product | null;
}
export async function createProduct(
  product: Omit<Product, "id" | "created_at" | "updated_at" | "categories" | "product_images">,
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

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}