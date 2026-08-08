"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function MinhaContaPage() {
  const { user, loading, firstName, fullName, signOut } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-neutral-500">Carregando...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-light uppercase tracking-[3px]">
            Minha Conta
          </h1>

          <p className="mt-4 text-neutral-500">
            Entre na sua conta para acessar seus dados e pedidos.
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

  async function handleLogout() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>

          <h1 className="mt-3 text-3xl font-light uppercase tracking-[3px]">
            Minha Conta
          </h1>

          <p className="mt-3 text-neutral-500">
            Olá, {firstName || fullName || "cliente"}.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-medium">Meus dados</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400">
                  Nome
                </p>
                <p className="mt-1">{fullName || firstName || "—"}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400">
                  E-mail
                </p>
                <p className="mt-1">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-medium">Acesso rápido</h2>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/meus-pedidos"
                className="rounded-xl border border-neutral-200 px-5 py-3 text-sm transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
              >
                Meus Pedidos
              </Link>

              <Link
                href="/favoritos"
                className="rounded-xl border border-neutral-200 px-5 py-3 text-sm transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
              >
                Favoritos
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-red-200 px-5 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                Sair da conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
