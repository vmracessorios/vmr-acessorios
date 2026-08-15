import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="bg-[#F5F0E8] py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="overflow-hidden rounded-[40px] bg-[#2F2F2F]">

          <div className="px-10 py-20 text-center lg:px-20">

            <span className="text-sm uppercase tracking-[6px] text-[#C8A96A]">
              Exclusividade
            </span>

            <h2 className="mt-6 text-4xl font-light leading-tight text-white lg:text-6xl">
              Acessórios que valorizam
              <br />
              sua personalidade.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-300">
              Cada peça foi escolhida para unir elegância,
              delicadeza e sofisticação em todos os momentos.
            </p>

            <Link
              href="/colecao"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#C8A96A] px-8 py-4 text-white transition hover:bg-[#b89453]"
            >
              Conhecer a coleção
              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}