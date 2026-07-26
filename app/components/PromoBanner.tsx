import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-24 bg-[#F5F0E8]">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="rounded-[40px] bg-[#2F2F2F] overflow-hidden">

          <div className="px-10 py-20 lg:px-20 text-center">

            <span className="uppercase tracking-[6px] text-[#C8A96A] text-sm">

              Exclusividade

            </span>

            <h2 className="mt-6 text-4xl lg:text-6xl font-light text-white leading-tight">

              Acessórios que valorizam
              <br />
              sua personalidade.

            </h2>

            <p className="mt-8 max-w-2xl mx-auto text-lg leading-8 text-neutral-300">

              Cada peça foi escolhida para unir elegância,
              delicadeza e sofisticação em todos os momentos.

            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full bg-[#C8A96A] text-white hover:bg-[#b89453] transition"
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