import Image from "next/image";
import Link from "next/link";

export default function AboutBrand() {
  return (
    <section className="bg-[#FAF8F5] py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Imagem */}

          <div className="relative overflow-hidden rounded-[40px]">

            <Image
              src="/about/about-vmr.jpg"
              alt="VMR Acessórios"
              width={700}
              height={850}
              className="w-full h-auto object-cover transition duration-700 hover:scale-105"
            />

          </div>

          {/* Texto */}

          <div>

            <span className="uppercase tracking-[5px] text-[#C8A96A] text-sm">
              Nossa Essência
            </span>

            <h2 className="mt-5 text-5xl font-light leading-tight text-[#2F2F2F]">
              Elegância que
              <br />
              acompanha você.
            </h2>

            <p className="mt-8 text-neutral-600 leading-8 text-lg">
              Na VMR Acessórios acreditamos que cada detalhe faz a diferença.
              Selecionamos peças modernas, delicadas e versáteis para mulheres
              que desejam expressar sua personalidade através da elegância.
            </p>

            <p className="mt-6 text-neutral-600 leading-8 text-lg">
              Mais do que acessórios, entregamos peças que valorizam momentos,
              fortalecem a autoestima e complementam cada estilo com
              sofisticação.
            </p>

            <Link
              href="/colecao"
              className="inline-flex mt-10 px-8 py-4 rounded-full bg-[#C8A96A] text-white uppercase tracking-[2px] hover:opacity-90 transition"
            >
              Conheça a coleção
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}