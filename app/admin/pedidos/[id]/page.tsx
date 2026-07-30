"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getOrderById,
  updateOrderStatus,
} from "@/services/orders";

export default function PedidoDetalhesPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const data = await getOrderById(id as string);
      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(
    status: string
  ) {
    try {
      await updateOrderStatus(
        id as string,
        status
      );

      await loadOrder();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar o status.");
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Carregando pedido...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        Pedido não encontrado.
      </div>
    );
  }

  return (
    <main className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-semibold">
            Pedido
          </h1>

          <p className="text-neutral-500">
            #{order.id}
          </p>

        </div>

        <button
          onClick={() => router.back()}
          className="rounded-lg border px-4 py-2"
        >
          Voltar
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Cliente
          </h2>

          <p><strong>Nome:</strong> {order.customer_name}</p>
          <p><strong>E-mail:</strong> {order.customer_email}</p>
          <p><strong>Telefone:</strong> {order.customer_phone}</p>
          <p><strong>CPF:</strong> {order.cpf}</p>

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Endereço
          </h2>

          <p>{order.street}, {order.number}</p>

          {order.complement && (
            <p>{order.complement}</p>
          )}

          <p>{order.neighborhood}</p>

          <p>
            {order.city} - {order.state}
          </p>

          <p>CEP: {order.cep}</p>

        </div>

      </div>

      <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Produtos
        </h2>

        <div className="space-y-4">

          {order.order_items?.map((item: any) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div className="flex items-center gap-4">

                <Image
                  src={
                    item.products?.image_url ||
                    "/placeholder.png"
                  }
                  alt={item.products?.name}
                  width={70}
                  height={70}
                  className="rounded-lg object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {item.products?.name}
                  </h3>

                  <p>
                    Quantidade: {item.quantity}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p>

                  {item.price.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}

                </p>

                <p className="font-semibold">

                  {(item.quantity * item.price).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Status
        </h2>

        <select
          value={order.status}
          onChange={(e) =>
            handleStatusChange(
              e.target.value
            )
          }
          className="rounded-lg border px-4 py-2"
        >
          <option>Pendente</option>
          <option>Pago</option>
          <option>Em Separação</option>
          <option>Enviado</option>
          <option>Entregue</option>
          <option>Cancelado</option>
        </select>

      </div>

      <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Resumo Financeiro
        </h2>

        <p>
          <strong>Subtotal:</strong>{" "}
          {order.subtotal.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}
        </p>

        <p>
          <strong>Frete:</strong>{" "}
          {order.freight.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}
        </p>

        <p>
          <strong>Desconto:</strong>{" "}
          {order.discount.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}
        </p>

        <p className="mt-3 text-2xl font-bold">
          Total:{" "}
          {order.total.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}
        </p>

      </div>

    </main>
  );
}