"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

import { getProducts } from "@/services/products";
import { Product } from "@/types/product";
import { getPublicUrl } from "@/services/storage";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          Carregando produtos...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#C8A96A] text-sm">
            MAIS VENDIDOS
          </span>

          <h2 className="mt-4 text-5xl font-light text-[#2F2F2F]">
            Escolha seu favorito
          </h2>

          <p className="mt-5 text-neutral-500 max-w-2xl mx-auto leading-7">
            Cada colar foi escolhido para valorizar sua beleza com elegância,
            sofisticação e exclusividade.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => {

            const image =
              product.product_images?.length
                ? getPublicUrl(product.product_images[0].storage_path)
                : "/placeholder.jpg";

            return (
              <div
                key={product.id}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-[#FAF8F5] aspect-[4/5]">

                  <button className="absolute right-5 top-5 z-20 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center">
                    <Heart size={18} />
                  </button>

                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 w-full p-5 translate-y-full group-hover:translate-y-0 transition duration-500">

                    <Link
                      href={`/produtos/${product.slug}`}
                      className="flex items-center justify-center gap-2 rounded-full bg-[#C8A96A] py-3 text-white font-medium"
                    >
                      <ShoppingBag size={18} />
                      Ver Produto
                    </Link>

                  </div>
                </div>

                <div className="mt-6 text-center">

                  <h3 className="text-xl text-[#2F2F2F]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-2xl font-semibold text-[#C8A96A]">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}