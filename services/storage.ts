import { supabase } from "@/lib/supabase";

const BUCKET = "products";

export async function uploadProductImage(file: File) {
  const extension = file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const storagePath = fileName;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file);

  if (error) throw error;

  return {
    storagePath,
    publicUrl: getPublicUrl(storagePath),
  };
}

export function getPublicUrl(storagePath: string) {
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(storagePath);

  return data.publicUrl;
}