import Link from "next/link";

const categories = [
  {
    title: "Colares",
    description: "Conheça nossa coleção exclusiva.",
  },
  {
    title: "Pulseiras",
    description: "Lançamento em breve.",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#FAF8F5] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="uppercase tracking-[4px] text-[#C8A96A] text-sm">
            Categorias
          </span>

          <h2 className="mt-4 text-4xl font-light">
            Encontre seu estilo
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {categories.map((category) => (

            <Link
              key={category.title}
              href="/"
              className="group rounded-3xl border border-neutral-200 bg-white p-10 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <h3 className="text-2xl font-light">
                {category.title}
              </h3>

              <p className="mt-3 text-neutral-500">
                {category.description}
              </p>

              <span className="mt-8 inline-block text-[#C8A96A] group-hover:translate-x-2 transition">
                Explorar →
              </span>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}