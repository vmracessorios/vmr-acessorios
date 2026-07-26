"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

      {/* Slides */}
      <div className="relative w-full">
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
              width={1920}
              height={900}
              priority={index === 0}
              className="w-full h-auto"
            />
          </div>
        ))}

        {/* Mantém a altura do banner */}
        <Image
          src={banners[current]}
          alt=""
          width={1920}
          height={900}
          className="w-full h-auto invisible"
        />
      </div>

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-transparent z-10" />

      {/* Conteúdo Fixo */}
      <div className="absolute inset-0 z-20 flex items-center">

        <div className="max-w-7xl mx-auto w-full px-8 lg:px-16">

          <div className="max-w-xl">

            <p className="uppercase tracking-[5px] text-[#C8A96A] text-sm mb-5">
              NOVA COLEÇÃO
            </p>

            <h1 className="text-5xl lg:text-7xl font-light leading-tight text-[#2F2F2F]">
              A beleza
              <br />
              está nos
              <br />
              detalhes.
            </h1>

            <p className="mt-8 text-lg leading-8 text-neutral-600">
              Descubra colares exclusivos produzidos para mulheres
              que valorizam elegância, autenticidade e sofisticação.
            </p>

            <button className="mt-10 px-10 py-4 rounded-full bg-[#C8A96A] text-white uppercase tracking-[2px] font-medium transition duration-300 hover:scale-105 hover:shadow-xl">
              Comprar Agora
            </button>

          </div>

        </div>

      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-8 h-3 bg-[#C8A96A]"
                : "w-3 h-3 bg-white border border-[#C8A96A]"
            }`}
          />
        ))}
      </div>

    </section>
  );
}