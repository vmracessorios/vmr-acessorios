import { supabase } from "@/lib/supabase";

export type CreateOrderData = {
  profileId: string | null;

  customerName: string;
  customerEmail: string;
  customerPhone?: string;

  cpf?: string;

  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;

  observations?: string;

  subtotal: number;
  freight: number;
  discount: number;
  total: number;

  items: {
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    subtotal: number;
  }[];
};

export async function createOrder(data: CreateOrderData) {
  console.log("========================================");
  console.log("INICIANDO CREATE ORDER");
  console.log("========================================");

  console.log("PROFILE ID RECEBIDO:", data.profileId);

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log("SESSION ERROR:", sessionError);
  console.log("SESSION:", session);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("USER ERROR:", userError);
  console.log("USER:", user);

  console.log("AUTH UID:", user?.id);
  console.log("PROFILE ID:", data.profileId);

  console.log(
    "AUTH UID == PROFILE ID ?",
    user?.id === data.profileId
  );

  console.log("JWT:", session?.access_token);

  const orderPayload = {
    profile_id: data.profileId,

    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,

    cpf: data.cpf,

    cep: data.cep,
    street: data.street,
    number: data.number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state,

    observations: data.observations,

    subtotal: data.subtotal,
    freight: data.freight,
    discount: data.discount,
    total: data.total,

    status: "PENDENTE",
    payment_status: "PENDENTE",
  };

  console.log("========================================");
  console.log("PAYLOAD DO PEDIDO");
  console.log(orderPayload);
  console.log("========================================");

  console.log("REALIZANDO INSERT EM ORDERS...");

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert(orderPayload)
    .select()
    .single();

  console.log("ORDER:", order);
  console.log("ORDER ERROR:", orderError);

  if (orderError) {
    console.error("ERRO AO INSERIR PEDIDO");
    console.error(orderError);

    throw orderError;
  }

  const items = data.items.map((item) => ({
    order_id: order.id,

    product_id: item.productId,

    product_name: item.productName,

    product_price: item.productPrice,

    quantity: item.quantity,

    subtotal: item.subtotal,
  }));

  console.log("========================================");
  console.log("ITENS DO PEDIDO");
  console.log(items);
  console.log("========================================");

  console.log("REALIZANDO INSERT EM ORDER_ITEMS...");

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items);

  console.log("ITEMS ERROR:", itemsError);

  if (itemsError) {
    console.error("ERRO AO INSERIR ITENS");
    console.error(itemsError);

    throw itemsError;
  }

  console.log("========================================");
  console.log("PEDIDO FINALIZADO COM SUCESSO");
  console.log("========================================");

  return order;
}