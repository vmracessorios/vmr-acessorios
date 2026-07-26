import Link from "next/link";

export default function InstagramSection() {
  return (
    <section className="bg-[#FAF8F5] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center">
          <span className="uppercase tracking-[5px] text-[#C8A96A] text-sm">
            Instagram
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-light">
            Acompanhe a VMR
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-neutral-600 leading-8">
            Em breve você encontrará aqui nossas novidades,
            lançamentos e inspirações.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square rounded-3xl bg-gradient-to-br from-[#F7F2EA] to-[#EADFCB]"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="inline-block rounded-full border border-[#C8A96A] px-8 py-4 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-white transition"
          >
            Seguir no Instagram
          </Link>
        </div>

      </div>
    </section>
  );
}