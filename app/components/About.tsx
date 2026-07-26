import { Award, ShieldCheck, Truck } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Lado Esquerdo */}

          <div>

            <span className="uppercase tracking-[5px] text-[#C8A96A] text-sm">

              Sobre a VMR

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-light leading-tight">

              Elegância que acompanha
              cada momento da sua vida.

            </h2>

            <p className="mt-8 text-neutral-600 leading-8">

              A VMR Acessórios nasceu para oferecer peças sofisticadas,
              modernas e atemporais, escolhidas com cuidado para valorizar
              a beleza feminina e transformar pequenos detalhes em grandes
              experiências.

            </p>

            <p className="mt-6 text-neutral-600 leading-8">

              Nosso compromisso é proporcionar qualidade, atendimento
              diferenciado e uma experiência de compra segura do início ao fim.

            </p>

          </div>

          {/* Lado Direito */}

          <div className="grid gap-6">

            <div className="flex items-start gap-5 rounded-3xl border border-neutral-200 p-8">

              <Award
                className="text-[#C8A96A] flex-shrink-0"
                size={34}
              />

              <div>

                <h3 className="text-xl font-medium">

                  Curadoria Exclusiva

                </h3>

                <p className="mt-3 text-neutral-600 leading-7">

                  Selecionamos peças que unem elegância,
                  qualidade e estilo.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-5 rounded-3xl border border-neutral-200 p-8">

              <ShieldCheck
                className="text-[#C8A96A] flex-shrink-0"
                size={34}
              />

              <div>

                <h3 className="text-xl font-medium">

                  Compra Segura

                </h3>

                <p className="mt-3 text-neutral-600 leading-7">

                  Ambiente protegido para você comprar
                  com total tranquilidade.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-5 rounded-3xl border border-neutral-200 p-8">

              <Truck
                className="text-[#C8A96A] flex-shrink-0"
                size={34}
              />

              <div>

                <h3 className="text-xl font-medium">

                  Entrega para Todo o Brasil

                </h3>

                <p className="mt-3 text-neutral-600 leading-7">

                  Levamos a elegância da VMR para qualquer
                  lugar do país.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}