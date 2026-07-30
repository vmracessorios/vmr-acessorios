import {
  ShieldCheck,
  Truck,
  Gem,
  BadgePercent,
} from "lucide-react";

const benefits = [
  {
    icon: Gem,
    title: "Qualidade Premium",
    description: "Peças selecionadas com acabamento impecável.",
  },
  {
    icon: Truck,
    title: "Enviamos para todo o Brasil",
    description: "Entrega rápida e segura para qualquer região.",
  },
  {
    icon: ShieldCheck,
    title: "Compra 100% Segura",
    description: "Pagamento protegido e seus dados em segurança.",
  },
  {
    icon: BadgePercent,
    title: "5% OFF no PIX",
    description: "Economize pagando via PIX.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-white border-y border-[#EFE9DF]">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF8F5]">
                  <Icon
                    size={30}
                    className="text-[#C8A96A]"
                  />
                </div>

                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}