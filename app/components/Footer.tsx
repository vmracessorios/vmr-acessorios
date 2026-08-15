import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* MARCA */}
          <div>
            <Image
              src="/logo/logo-vmr.png"
              alt="VMR Acessórios"
              width={180}
              height={70}
              className="h-auto w-[180px]"
            />

            <p className="mt-6 leading-7 text-neutral-400">
              Acessórios pensados para valorizar sua beleza com elegância,
              delicadeza e sofisticação em todos os momentos.
            </p>

            {/* INSTAGRAM */}
            <div className="mt-8">
              <Link
                href="https://instagram.com/vmracessorios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da VMR Acessórios"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96A] text-[#C8A96A] transition hover:bg-[#C8A96A] hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* INSTITUCIONAL */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Institucional
            </h3>

            <ul className="space-y-3 text-neutral-400">

              <li>
                <Link
                  href="/quem-somos"
                  className="transition hover:text-white"
                >
                  Quem Somos
                </Link>
              </li>

              <li>
                <Link
                  href="/contato"
                  className="transition hover:text-white"
                >
                  Contato
                </Link>
              </li>

              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="transition hover:text-white"
                >
                  Política de Privacidade
                </Link>
              </li>

              <li>
                <Link
                  href="/trocas-e-devolucoes"
                  className="transition hover:text-white"
                >
                  Trocas e Devoluções
                </Link>
              </li>

            </ul>
          </div>

          {/* ATENDIMENTO */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Atendimento
            </h3>

            <div className="space-y-4 text-neutral-400">

              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-1 shrink-0 text-[#C8A96A]"
                />

                <span>
                  WhatsApp
                  <br />
                  <span className="text-neutral-500">
                    Número em atualização
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-1 shrink-0 text-[#C8A96A]"
                />

                <span>
                  contato@vmracessorios.com.br
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-[#C8A96A]"
                />

                <span>
                  Campos dos Goytacazes - RJ
                </span>
              </div>

            </div>
          </div>

          {/* COMPRA SEGURA */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Compre com Segurança
            </h3>

            <div className="space-y-5 text-neutral-400">

              <div className="flex gap-3">
                <ShieldCheck
                  size={22}
                  className="shrink-0 text-[#C8A96A]"
                />

                <p>
                  Ambiente protegido com tecnologia de segurança para suas
                  compras.
                </p>
              </div>

              <div className="flex gap-3">
                <CreditCard
                  size={22}
                  className="shrink-0 text-[#C8A96A]"
                />

                <p>
                  Pagamentos via PIX e cartão de crédito.
                </p>
              </div>

              <div className="rounded-xl border border-[#C8A96A]/30 bg-[#2A2A2A] p-4 text-sm">
                <strong className="text-[#C8A96A]">
                  5% de desconto
                </strong>

                <br />

                para pagamentos via PIX.
              </div>

            </div>
          </div>

        </div>

        {/* RODAPÉ INFERIOR */}
        <div className="mt-16 border-t border-neutral-700 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-neutral-500 md:flex-row md:text-left">

            <span>
              © {new Date().getFullYear()} VMR Acessórios. Todos os direitos
              reservados.
            </span>

            <span>
              Desenvolvido com ❤️ para oferecer uma experiência premium.
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}