"use client";

import Link from "next/link";
import {
  Package,
  FolderTree,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="space-y-8">

      <div>

        <h1 className="text-3xl font-semibold">
          Dashboard
        </h1>

        <p className="mt-2 text-neutral-500">
          Bem-vindo ao painel administrativo da VMR Acessórios.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Link
          href="/admin/produtos"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF8F5]">
            <Package
              size={28}
              className="text-[#C8A96A]"
            />
          </div>

          <h2 className="text-xl font-semibold">
            Produtos
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Gerencie todos os produtos.
          </p>

        </Link>

        <Link
          href="/admin/categorias"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF8F5]">
            <FolderTree
              size={28}
              className="text-[#C8A96A]"
            />
          </div>

          <h2 className="text-xl font-semibold">
            Categorias
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Organize as categorias.
          </p>

        </Link>

        <Link
          href="/admin/pedidos"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF8F5]">
            <ShoppingCart
              size={28}
              className="text-[#C8A96A]"
            />
          </div>

          <h2 className="text-xl font-semibold">
            Pedidos
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Gerencie os pedidos da loja.
          </p>

        </Link>

        <Link
          href="/admin/clientes"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF8F5]">
            <Users
              size={28}
              className="text-[#C8A96A]"
            />
          </div>

          <h2 className="text-xl font-semibold">
            Clientes
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Visualize todos os clientes cadastrados.
          </p>

        </Link>

      </div>

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6">

          <p className="text-sm text-neutral-500">
            Faturamento
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            R$ 0,00
          </h2>

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <p className="text-sm text-neutral-500">
            Pedidos
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            0
          </h2>

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <p className="text-sm text-neutral-500">
            Clientes
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            0
          </h2>

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <p className="text-sm text-neutral-500">
            Ticket Médio
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            R$ 0,00
          </h2>

        </div>

      </div>

    </main>
  );
}