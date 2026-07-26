"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    observacoes: "",
  });

  const frete = 0;
  const total = cartTotal + frete;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-36 pb-20">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-light text-center mb-12">
          Finalizar Compra
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-10">

            <h2 className="text-2xl font-medium mb-8">
              Dados do Cliente
            </h2>
            <div className="grid md:grid-cols-2 gap-5">

  <div className="md:col-span-2">
    <label className="text-sm font-medium mb-2 block">
      Nome Completo
    </label>

    <input
      type="text"
      name="nome"
      value={form.nome}
      onChange={handleChange}
      placeholder="Digite seu nome"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-2 block">
      E-mail
    </label>

    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="seu@email.com"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-2 block">
      Telefone
    </label>

    <input
      type="text"
      name="telefone"
      value={form.telefone}
      onChange={handleChange}
      placeholder="(22) 99999-9999"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div className="md:col-span-2">
    <label className="text-sm font-medium mb-2 block">
      CPF (opcional)
    </label>

    <input
      type="text"
      name="cpf"
      value={form.cpf}
      onChange={handleChange}
      placeholder="000.000.000-00"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

</div>

<h2 className="text-2xl font-medium mt-12 mb-8">
  Endereço de Entrega
</h2>
<div className="grid md:grid-cols-2 gap-5">

  <div>
    <label className="text-sm font-medium mb-2 block">
      CEP
    </label>

    <input
      type="text"
      name="cep"
      value={form.cep}
      onChange={handleChange}
      placeholder="00000-000"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-2 block">
      Rua
    </label>

    <input
      type="text"
      name="rua"
      value={form.rua}
      onChange={handleChange}
      placeholder="Rua"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-2 block">
      Número
    </label>

    <input
      type="text"
      name="numero"
      value={form.numero}
      onChange={handleChange}
      placeholder="Número"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-2 block">
      Complemento
    </label>

    <input
      type="text"
      name="complemento"
      value={form.complemento}
      onChange={handleChange}
      placeholder="Apartamento, bloco, etc."
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-2 block">
      Bairro
    </label>

    <input
      type="text"
      name="bairro"
      value={form.bairro}
      onChange={handleChange}
      placeholder="Bairro"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-2 block">
      Cidade
    </label>

    <input
      type="text"
      name="cidade"
      value={form.cidade}
      onChange={handleChange}
      placeholder="Cidade"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

  <div className="md:col-span-2">
    <label className="text-sm font-medium mb-2 block">
      Estado
    </label>

    <input
      type="text"
      name="estado"
      value={form.estado}
      onChange={handleChange}
      placeholder="Estado"
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
    />
  </div>

</div>

<h2 className="text-2xl font-medium mt-12 mb-8">
  Observações
</h2>
<textarea
  name="observacoes"
  value={form.observacoes}
  onChange={handleChange}
  rows={5}
  placeholder="Alguma observação para seu pedido?"
  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none resize-none focus:border-[#C8A96A]"
/>

</section>

<aside className="bg-white rounded-3xl shadow-sm p-8 h-fit sticky top-36">

  <h2 className="text-2xl font-medium mb-8">
    Resumo do Pedido
  </h2>

  <div className="space-y-6">

    {cart.length === 0 ? (

      <p className="text-neutral-500">
        Seu carrinho está vazio.
      </p>

    ) : (

      cart.map((item) => (

        <div
          key={item.id}
          className="flex gap-4 border-b border-neutral-200 pb-5"
        >

          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F7F7F7]">

            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />

          </div>

          <div className="flex-1">

            <h3 className="font-medium">
              {item.name}
            </h3>

            <p className="text-sm text-neutral-500 mt-1">
              Quantidade: {item.quantity}
            </p>

            <p className="mt-2 font-semibold text-[#C8A96A]">
              {(item.price * item.quantity).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

          </div>

        </div>

      ))

    )}

  </div>
  <div className="border-t border-neutral-200 pt-6 mt-8 space-y-4">

  <div className="flex justify-between text-neutral-600">
    <span>Subtotal</span>

    <span>
      {cartTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </span>
  </div>

  <div className="flex justify-between text-neutral-600">
    <span>Frete</span>

    <span>
      {frete === 0
        ? "Grátis"
        : frete.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
    </span>
  </div>

  <div className="flex justify-between text-2xl font-semibold pt-4 border-t border-neutral-200">
    <span>Total</span>

    <span className="text-[#C8A96A]">
      {total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </span>
  </div>

</div>

<button
  className="mt-8 w-full bg-[#C8A96A] hover:bg-[#b8944f] transition text-white font-medium py-4 rounded-full"
>
  Ir para o pagamento
</button>

<p className="text-xs text-neutral-500 text-center mt-5">
  Ao prosseguir, você será direcionado para um ambiente seguro de pagamento.
</p>

</aside>

</div>

</div>

</main>

  );
}