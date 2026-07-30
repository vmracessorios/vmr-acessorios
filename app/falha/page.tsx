"use client";

import Link from "next/link";

export default function FalhaPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-6">
      <div className="max-w-xl rounded-3xl bg-white p-10 shadow-lg text-center">

        <div className="text-6xl mb-6">❌</div>

        <h1 className="text-4xl font-light text-[#2F2F2F]">
          Pagamento não concluído
        </h1>

        <p className="mt-6 text-neutral-600 leading-7">
          Seu pagamento foi cancelado ou não pôde ser processado.
          Você pode tentar novamente quando desejar.
        </p>

        <Link
          href="/checkout"
          className="mt-10 inline-block rounded-full bg-[#C8A96A] px-8 py-4 text-white transition hover:opacity-90"
        >
          Tentar novamente
        </Link>

      </div>
    </main>
  );
}