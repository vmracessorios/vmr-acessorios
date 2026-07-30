"use client";

import Link from "next/link";

export default function PendentePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-6">
      <div className="max-w-xl rounded-3xl bg-white p-10 shadow-lg text-center">

        <div className="text-6xl mb-6">⏳</div>

        <h1 className="text-4xl font-light text-[#2F2F2F]">
          Pagamento pendente
        </h1>

        <p className="mt-6 text-neutral-600 leading-7">
          Recebemos sua solicitação de pagamento.
          Assim que o Mercado Pago confirmar a operação, seu pedido será atualizado.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-[#C8A96A] px-8 py-4 text-white transition hover:opacity-90"
        >
          Voltar para a loja
        </Link>

      </div>
    </main>
  );
}