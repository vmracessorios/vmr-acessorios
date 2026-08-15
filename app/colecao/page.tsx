import Link from "next/link";
import Image from "next/image";

import { getProducts } from "@/services/products";
import { getPublicUrl } from "@/services/storage";

export default async function ColecaoPage() {
  const products = await getProducts(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-7xl">

        {/* CABEÇALHO */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>

          <h1 className="text-3xl font-light uppercase tracking-[3px]">
            Conheça a coleção
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-500">
            Descubra nossas peças e encontre os acessórios que combinam
            com o seu estilo.
          </p>
        </div>

        {/* PRODUTOS */}
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-neutral-500">
              Nossa coleção está sendo preparada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const image = product.product_images?.[0]
                ? getPublicUrl(
                    product.product_images[0].storage_path
                  )
                : null;

              return (
                <Link
                  key={product.id}
                  href={`/produtos/${product.slug}`}
                  className="group"
                >
                  {/* IMAGEM */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-white">

                    {image ? (
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#F5F0E8]">
                        <span className="text-xs uppercase tracking-[3px] text-[#C8A96A]">
                          VMR Acessórios
                        </span>
                      </div>
                    )}

                  </div>

                  {/* INFORMAÇÕES */}
                  <div className="pt-4">

                    <h2 className="text-sm text-[#2F2F2F]">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-sm text-[#C8A96A]">
                      {Number(product.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}