"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  async function cadastrarEmail(e: React.FormEvent) {
    e.preventDefault();

    setMensagem("");
    setErro(false);

    if (!email.trim()) {
      setErro(true);
      setMensagem("Digite seu e-mail.");
      return;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      setErro(true);
      setMensagem("Digite um e-mail válido.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("newsletter")
      .insert([{ email: email.toLowerCase().trim() }]);

    setLoading(false);

    if (error) {
      if (
        error.message.toLowerCase().includes("duplicate") ||
        error.message.toLowerCase().includes("unique")
      ) {
        setErro(true);
        setMensagem("Este e-mail já está cadastrado.");
      } else {
        setErro(true);
        setMensagem("Erro ao realizar o cadastro.");
      }

      return;
    }

    setMensagem("Cadastro realizado com sucesso!");
    setErro(false);
    setEmail("");
  }

  return (
    <section className="py-24 bg-[#2F2F2F]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="uppercase tracking-[5px] text-[#C8A96A] text-sm">
          Newsletter
        </span>

        <h2 className="mt-6 text-4xl lg:text-5xl font-light text-white">
          Receba nossas novidades
        </h2>

        <p className="mt-6 text-neutral-300 leading-8">
          Cadastre seu e-mail para receber lançamentos,
          promoções exclusivas e novidades da VMR Acessórios.
        </p>

        <form
          onSubmit={cadastrarEmail}
          className="mt-10 flex flex-col md:flex-row gap-4"
        >
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="flex-1 rounded-full bg-white border border-gray-200 px-6 py-4 text-neutral-800 placeholder:text-gray-500 outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#C8A96A] px-8 py-4 text-white hover:bg-[#b89453] transition disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Inscrever-se"}
          </button>
        </form>

        {mensagem && (
          <p
            className={`mt-6 text-sm ${
              erro ? "text-red-400" : "text-green-400"
            }`}
          >
            {mensagem}
          </p>
        )}
      </div>
    </section>
  );
}