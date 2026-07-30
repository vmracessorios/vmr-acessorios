import { supabase } from "@/lib/supabase";

export type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  subtotal: number;
  freight: number;
  discount: number;
  total: number;
  status: string;
};

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      created_at,
      customer_name,
      customer_email,
      total,
      status
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data as Order[];
}

export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        id,
        quantity,
        price,
        products(
          id,
          name,
          price,
          image_url
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateOrderStatus(
  id: string,
  status: string
) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}