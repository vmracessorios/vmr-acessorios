import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/services/products";
import { getPublicUrl } from "@/services/storage";

export default async function ColaresPage() {
  const products = (await getProducts(false)).filter(
    (product) =>
      product.categories?.name?.toLowerCase() === "colares"
  );

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>
          <h1 className="text-3xl font-light tracking-[3px] uppercase">
            Colares
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-500">
            Descubra os colares que selecionamos para realçar seu estilo.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            Nenhum colar disponível no momento.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const image = product.product_images?.[0]
                ? getPublicUrl(product.product_images[0].storage_path)
                : "";

              return (
                <Link
                  key={product.id}
                  href={`/produtos/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-white">
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-4">
                    <h2 className="text-sm">{product.name}</h2>
                    <p className="mt-1 text-sm text-[#C8A96A]">
                      R$ {Number(product.price).toFixed(2).replace(".", ",")}
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
