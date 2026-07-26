import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-[#FAF8F5] pt-24">
      <div className="max-w-7xl mx-auto px-4">

        <Image
          src="/banner/banner-vmr.png"
          alt="VMR Acessórios"
          width={1800}
          height={900}
          priority
          className="w-full h-auto rounded-2xl object-contain"
        />

      </div>
    </section>
  );
}