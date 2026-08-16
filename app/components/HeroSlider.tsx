"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  "/banner/banner-1.PNG",
  "/banner/banner-2.PNG",
  "/banner/banner-3.PNG",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">

      {/* ÁREA DOS SLIDES */}
      <div className="relative aspect-[4/5] w-full md:aspect-[1920/900]">

        {banners.map((banner, index) => (
          <div
            key={banner}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-[65%_center] md:object-cover md:object-center"
            />
          </div>
        ))}

      </div>

      {/* GRADIENTE */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-transparent" />

      {/* CONTEÚDO */}
      <div className="absolute inset-0 z-20 flex items-center">

        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-16">

          <div className="max-w-xl">

            <p className="mb-4 text-xs uppercase tracking-[4px] text-[#C8A96A] sm:text-sm md:mb-5 md:tracking-[5px]">
              NOVA COLEÇÃO
            </p>

            <h1 className="text-4xl font-light leading-[1.08] text-[#2F2F2F] sm:text-5xl md:text-6xl lg:text-7xl">
              A beleza
              <br />
              está nos
              <br />
              detalhes.
            </h1>

            <p className="mt-5 max-w-[340px] text-base leading-7 text-neutral-600 sm:max-w-md sm:text-lg sm:leading-8 md:mt-8">
              Descubra colares exclusivos produzidos para mulheres que
              valorizam elegância, autenticidade e sofisticação.
            </p>

            <Link
              href="/colecao"
              className="mt-7 inline-flex rounded-full bg-[#C8A96A] px-8 py-3.5 text-xs font-medium uppercase tracking-[2px] text-white transition duration-300 hover:scale-105 hover:shadow-xl sm:mt-8 sm:px-10 sm:py-4"
            >
              Comprar Agora
            </Link>

          </div>

        </div>

      </div>

      {/* INDICADORES */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:bottom-8 md:gap-3">

        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir para o banner ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? "h-2.5 w-7 bg-[#C8A96A] md:h-3 md:w-8"
                : "h-2.5 w-2.5 border border-[#C8A96A] bg-white md:h-3 md:w-3"
            }`}
          />
        ))}

      </div>

    </section>
  );
}