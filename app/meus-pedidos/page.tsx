"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Package, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  created_at: string;
  status: string | null;
  payment_status: string | null;
  subtotal: number;
  freight: number;
  discount: number;
  total: number;
};

type OrderItem = {
  id: string;
  order_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
};

export default function MeusPedidosPage() {
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    async function loadOrders() {
      setLoading(true);
      setError("");

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(
          "id, created_at, status, payment_status, subtotal, freight, discount, total"
        )
        .eq("profile_id", user!.id)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error(ordersError);
        setError("Não foi possível carregar seus pedidos.");
        setLoading(false);
        return;
      }

      const orderList = ordersData ?? [];
      setOrders(orderList);

      if (orderList.length > 0) {
        const orderIds = orderList.map((order) => order.id);

        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select(
            "id, order_id, product_name, product_price, quantity, subtotal"
          )
          .in("order_id", orderIds);

        if (itemsError) {
          console.error(itemsError);
        } else {
          setItems(itemsData ?? []);
        }
      } else {
        setItems([]);
      }

      setLoading(false);
    }

    loadOrders();
  }, [user, authLoading]);

  function money(value: number) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function date(value: string) {
    return new Date(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function statusLabel(status: string | null) {
    switch (status?.toUpperCase()) {
      case "PENDENTE":
        return "Pedido recebido";
      case "PAGO":
      case "APROVADO":
        return "Pagamento aprovado";
      case "PROCESSANDO":
        return "Em preparação";
      case "ENVIADO":
        return "Enviado";
      case "ENTREGUE":
        return "Entregue";
      case "CANCELADO":
        return "Cancelado";
      default:
        return status || "Aguardando atualização";
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-neutral-500">Carregando seus pedidos...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
        <div className="mx-auto max-w-lg text-center">
          <Package
            size={46}
            strokeWidth={1}
            className="mx-auto text-[#C8A96A]"
          />

          <h1 className="mt-6 text-3xl font-light uppercase tracking-[3px]">
            Meus Pedidos
          </h1>

          <p className="mt-4 text-neutral-500">
            Entre na sua conta para acompanhar suas compras.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-block rounded-full bg-[#C8A96A] px-8 py-3 text-sm text-white transition hover:opacity-90"
          >
            Entrar na minha conta
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>

          <h1 className="mt-3 text-3xl font-light uppercase tracking-[3px]">
            Meus Pedidos
          </h1>

          <p className="mt-3 text-neutral-500">
            Acompanhe aqui suas compras realizadas.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && orders.length === 0 && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center">
            <Package
              size={46}
              strokeWidth={1}
              className="mx-auto text-[#C8A96A]"
            />

            <h2 className="mt-6 text-xl font-medium">
              Você ainda não realizou nenhum pedido
            </h2>

            <p className="mt-3 text-sm text-neutral-500">
              Quando você fizer uma compra, ela aparecerá nesta área.
            </p>

            <Link
              href="/colecao"
              className="mt-7 inline-block rounded-full bg-[#C8A96A] px-8 py-3 text-sm text-white transition hover:opacity-90"
            >
              Conhecer a coleção
            </Link>
          </div>
        )}

        <div className="space-y-5">
          {orders.map((order) => {
            const orderItems = items.filter(
              (item) => item.order_id === order.id
            );

            return (
              <details
                key={order.id}
                className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400">
                      Pedido
                    </p>

                    <p className="mt-1 font-medium">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      Realizado em {date(order.created_at)}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <p className="text-xs text-neutral-400">Total</p>
                      <p className="font-semibold text-[#C8A96A]">
                        {money(order.total)}
                      </p>
                    </div>

                    <ChevronDown
                      size={20}
                      className="text-neutral-400 transition group-open:rotate-180"
                    />
                  </div>
                </summary>

                <div className="border-t border-neutral-200 px-6 pb-6 pt-5">
                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#FAF8F5] px-4 py-2 text-xs">
                      {statusLabel(order.status)}
                    </span>

                    <span className="rounded-full bg-[#FAF8F5] px-4 py-2 text-xs">
                      Pagamento: {statusLabel(order.payment_status)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-4"
                      >
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="mt-1 text-sm text-neutral-500">
                            {item.quantity} × {money(item.product_price)}
                          </p>
                        </div>

                        <p className="font-medium">
                          {money(item.subtotal)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between text-neutral-500">
                      <span>Subtotal</span>
                      <span>{money(order.subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-neutral-500">
                      <span>Frete</span>
                      <span>
                        {Number(order.freight) === 0
                          ? "Grátis"
                          : money(order.freight)}
                      </span>
                    </div>

                    {Number(order.discount) > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto</span>
                        <span>- {money(order.discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold">
                      <span>Total</span>
                      <span className="text-[#C8A96A]">
                        {money(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </main>
  );
}
