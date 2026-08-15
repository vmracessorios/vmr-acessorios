import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Camera,
  ArrowLeft,
} from "lucide-react";

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-6xl">

        {/* CABEÇALHO */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>

          <h1 className="text-4xl font-light uppercase tracking-[4px] md:text-5xl">
            Contato
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C8A96A]" />

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-500">
            Estamos aqui para ouvir você. Envie uma mensagem, tire suas
            dúvidas ou fale diretamente conosco.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">

          {/* FORMULÁRIO */}
          <section className="rounded-2xl bg-white p-8 shadow-sm md:p-10">

            <h2 className="text-2xl font-light tracking-[2px]">
              Envie uma mensagem
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Sugestões, dúvidas, informações sobre produtos ou qualquer
              outro assunto. Será um prazer receber sua mensagem.
            </p>

            <form
              action="mailto:contato@vmracessorios.com.br"
              method="post"
              encType="text/plain"
              className="mt-8 space-y-5"
            >

              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-xs uppercase tracking-[2px] text-neutral-500"
                >
                  Nome
                </label>

                <input
                  id="nome"
                  name="Nome"
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-[2px] text-neutral-500"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  name="E-mail"
                  type="email"
                  required
                  placeholder="seuemail@email.com"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="mb-2 block text-xs uppercase tracking-[2px] text-neutral-500"
                >
                  Telefone / WhatsApp
                </label>

                <input
                  id="telefone"
                  name="Telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label
                  htmlFor="assunto"
                  className="mb-2 block text-xs uppercase tracking-[2px] text-neutral-500"
                >
                  Assunto
                </label>

                <input
                  id="assunto"
                  name="Assunto"
                  type="text"
                  required
                  placeholder="Como podemos ajudar?"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="mb-2 block text-xs uppercase tracking-[2px] text-neutral-500"
                >
                  Mensagem
                </label>

                <textarea
                  id="mensagem"
                  name="Mensagem"
                  required
                  rows={6}
                  placeholder="Escreva sua mensagem..."
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-[#FAF8F5] p-4 outline-none transition focus:border-[#C8A96A]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#C8A96A] py-4 text-xs uppercase tracking-[2px] text-white transition hover:opacity-90"
              >
                Enviar mensagem
              </button>

            </form>
          </section>

          {/* OUTROS CONTATOS */}
          <section className="flex flex-col justify-center">

            <h2 className="text-2xl font-light tracking-[2px]">
              Fale com a VMR
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Prefere falar diretamente conosco? Você também pode entrar
              em contato pelo WhatsApp ou acompanhar a VMR nas redes
              sociais.
            </p>

            <div className="mt-8 space-y-4">

              {/* WHATSAPP */}
              <a
                href="https://wa.me/SEUNUMERO"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-[#E7C7C8] bg-white p-5 transition hover:border-[#C8A96A]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E9E5] text-[#C8A96A]">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-neutral-400">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-sm">
                    Fale diretamente conosco
                  </p>
                </div>
              </a>

              {/* E-MAIL */}
              <a
                href="mailto:contato@vmracessorios.com.br"
                className="flex items-center gap-4 rounded-2xl border border-[#E7C7C8] bg-white p-5 transition hover:border-[#C8A96A]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E9E5] text-[#C8A96A]">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-neutral-400">
                    E-mail
                  </p>

                  <p className="mt-1 text-sm">
                    contato@vmracessorios.com.br
                  </p>
                </div>
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-[#E7C7C8] bg-white p-5 transition hover:border-[#C8A96A]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E9E5] text-[#C8A96A]">
                  <Camera size={21} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-neutral-400">
                    Instagram
                  </p>

                  <p className="mt-1 text-sm">
                    Acompanhe a VMR Acessórios
                  </p>
                </div>
              </a>

            </div>

            {/* VOLTAR PARA A LOJA */}
            <Link
              href="/"
              className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-[#C8A96A] transition hover:opacity-70"
            >
              <ArrowLeft size={16} />
              Voltar para a loja
            </Link>

          </section>

        </div>

      </div>
    </main>
  );
}