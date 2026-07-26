import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <Image
              src="/logo/logo-vmr.png"
              alt="VMR Acessórios"
              width={170}
              height={70}
            />

            <p className="mt-6 text-neutral-400 leading-7">
              Elegância, delicadeza e sofisticação para acompanhar você em todos os momentos.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Categorias
            </h3>

            <ul className="space-y-3 text-neutral-400">
              <li>
                <Link href="/">Colares</Link>
              </li>

              <li>
                <Link href="/">Pulseiras</Link>
              </li>

              <li>
                <Link href="/">Conjuntos</Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contato
            </h3>

            <div className="space-y-3 text-neutral-400">
              <p>Campos dos Goytacazes - RJ</p>
              <p>(22) 99999-9999</p>
              <p>contato@vmracessorios.com.br</p>
            </div>
          </div>

          {/* Redes */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Redes Sociais
            </h3>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="inline-block rounded-full border border-[#C8A96A] px-6 py-3 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-white transition"
            >
              Instagram
            </Link>
          </div>

        </div>

        <div className="border-t border-neutral-700 mt-16 pt-8 text-center text-neutral-500 text-sm">
          © {new Date().getFullYear()} VMR Acessórios. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
}