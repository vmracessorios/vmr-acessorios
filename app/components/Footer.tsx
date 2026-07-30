import Image from "next/image";
import Link from "next/link";
import {
  BadgeIcon,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Image
              src="/logo/logo-vmr.png"
              alt="VMR Acessórios"
              width={180}
              height={70}
            />

            <p className="mt-6 text-neutral-400 leading-7">
              Acessórios pensados para valorizar sua beleza com elegância,
              delicadeza e sofisticação em todos os momentos.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="https://instagram.com/vmracessorios"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96A] text-[#C8A96A] transition hover:bg-[#C8A96A] hover:text-white"
              >
                Instagram
              </Link>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">Institucional</h3>

            <ul className="space-y-3 text-neutral-400">
              <li>
                <Link href="/sobre" className="hover:text-white transition">
                  Sobre Nós
                </Link>
              </li>

              <li>
                <Link href="/contato" className="hover:text-white transition">
                  Contato
                </Link>
              </li>

              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="hover:text-white transition"
                >
                  Política de Privacidade
                </Link>
              </li>

              <li>
                <Link
                  href="/trocas-e-devolucoes"
                  className="hover:text-white transition"
                >
                  Trocas e Devoluções
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">Atendimento</h3>

            <div className="space-y-4 text-neutral-400">
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-1 text-[#C8A96A]"
                />
                <span>(22) 99999-9999</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-1 text-[#C8A96A]"
                />
                <span>contato@vmracessorios.com.br</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 text-[#C8A96A]"
                />
                <span>Campos dos Goytacazes - RJ</span>
              </div>
            </div>
          </div>

          {/* Compra Segura */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">Compre com Segurança</h3>

            <div className="space-y-5 text-neutral-400">
              <div className="flex gap-3">
                <ShieldCheck
                  size={22}
                  className="text-[#C8A96A]"
                />

                <p>
                  Ambiente protegido com tecnologia de segurança para suas
                  compras.
                </p>
              </div>

              <div className="flex gap-3">
                <CreditCard
                  size={22}
                  className="text-[#C8A96A]"
                />

                <p>
                  Pagamentos via PIX, cartão de crédito e cartão de débito.
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

        <div className="mt-16 border-t border-neutral-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
            <span>
              © {new Date().getFullYear()} VMR Acessórios. Todos os direitos
              reservados.
            </span>

            <span>Desenvolvido com ❤️ para oferecer uma experiência premium.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}