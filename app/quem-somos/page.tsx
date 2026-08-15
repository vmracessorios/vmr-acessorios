import Link from "next/link";

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>

          <h1 className="text-4xl font-light uppercase tracking-[4px] md:text-5xl">
            Quem Somos
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C8A96A]" />
        </div>

        <section className="grid gap-12 md:grid-cols-2 md:items-center">

          <div className="relative overflow-hidden bg-white">
            <div className="flex aspect-[4/5] items-center justify-center bg-[#F3E9E5]">
              <div className="text-center px-8">
                <p className="text-5xl font-light tracking-[6px] text-[#C8A96A]">
                  VMR
                </p>

                <p className="mt-3 text-xs uppercase tracking-[4px] text-neutral-500">
                  Acessórios
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-neutral-600">

            <h2 className="text-2xl font-light tracking-[2px] text-neutral-900">
              Elegância em cada detalhe.
            </h2>

            <p className="leading-7">
              A VMR Acessórios nasceu com o propósito de valorizar a beleza
              e a personalidade de cada mulher através de acessórios
              escolhidos com cuidado.
            </p>

            <p className="leading-7">
              Acreditamos que um acessório vai muito além de um detalhe.
              Ele pode transformar uma produção, transmitir personalidade
              e fazer com que cada mulher se sinta ainda mais confiante.
            </p>

            <p className="leading-7">
              Por isso, buscamos unir elegância, qualidade e versatilidade
              em cada peça que chega até você.
            </p>

            <p className="leading-7">
              A VMR é feita para mulheres que gostam de se expressar,
              descobrir seu próprio estilo e encontrar beleza nos pequenos
              detalhes.
            </p>

          </div>

        </section>

        <section className="mt-20 border-t border-[#E7C7C8] pt-16 text-center">

          <p className="mx-auto max-w-2xl text-neutral-600 leading-7">
            Mais do que acessórios, queremos fazer parte dos momentos em
            que você escolhe se cuidar, se presentear e realçar aquilo que
            já existe de mais bonito em você.
          </p>

          <Link
            href="/colares"
            className="mt-8 inline-flex items-center justify-center bg-[#C8A96A] px-8 py-4 text-xs uppercase tracking-[2px] text-white transition hover:opacity-90"
          >
            Conheça nossos acessórios
          </Link>

        </section>

      </div>
    </main>
  );
}