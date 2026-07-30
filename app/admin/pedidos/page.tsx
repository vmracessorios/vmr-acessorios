"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getOrders,
  Order,
} from "@/services/orders";

export default function PedidosPage() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);

    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-700";

      case "Enviado":
        return "bg-blue-100 text-blue-700";

      case "Entregue":
        return "bg-emerald-100 text-emerald-700";

      case "Cancelado":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        Carregando pedidos...
      </div>
    );
  }

  return (
    <main className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-semibold">
            Pedidos
          </h1>

          <p className="mt-2 text-neutral-500">
            Gerencie todos os pedidos da loja.
          </p>

        </div>

        <div className="rounded-xl bg-neutral-100 px-4 py-2">
          Total: {orders.length}
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-neutral-50">

            <tr>

              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                E-mail
              </th>

              <th className="p-4 text-left">
                Data
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="p-10 text-center text-neutral-500"
                >
                  Nenhum pedido encontrado.
                </td>

              </tr>

            )}

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-t hover:bg-neutral-50"
              >

                <td className="p-4 font-medium">
                  {order.customer_name}
                </td>

                <td className="p-4">
                  {order.customer_email}
                </td>

                <td className="p-4">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString("pt-BR")}
                </td>

                <td className="p-4 font-semibold">
                  {order.total.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <Link
                    href={`/admin/pedidos/${order.id}`}
                    className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-neutral-800"
                  >
                    Visualizar
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}