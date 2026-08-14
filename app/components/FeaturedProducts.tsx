"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";

import { getProducts } from "@/services/products";
import { Product } from "@/types/product";
import { getPublicUrl } from "@/services/storage";

import AddToCartButton from "@/app/components/AddToCartButton";
import { useFavorites } from "@/context/FavoritesContext";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { isFavorite, toggleFavorite, loading: favoritesLoading } =
    useFavorites();

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
        <div className="mx-auto max-w-7xl px-6 text-center">
          Carregando produtos...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-[5px] text-[#C8A96A]">
            MAIS VENDIDOS
          </span>

          <h2 className="mt-4 text-5xl font-light text-[#2F2F2F]">
            Escolha seu favorito
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-neutral-500">
            Cada colar foi escolhido para valorizar sua beleza com elegância,
            sofisticação e exclusividade.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const image = product.product_images?.length
              ? getPublicUrl(product.product_images[0].storage_path)
              : "";

            const pixPrice = product.price * 0.95;
            const favorite = isFavorite(String(product.id));

            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-[#EFE9DF] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF8F5]">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleFavorite(String(product.id));
                    }}
                    disabled={favoritesLoading}
                    aria-label={
                      favorite
                        ? `Remover ${product.name} dos favoritos`
                        : `Adicionar ${product.name} aos favoritos`
                    }
                    className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 disabled:cursor-wait disabled:opacity-70"
                  >
                    <Heart
                      size={18}
                      strokeWidth={1.8}
                      className={
                        favorite
                          ? "fill-[#C8A96A] text-[#C8A96A]"
                          : "text-[#C8A96A]"
                      }
                    />
                  </button>

                  <Link
                href={`/produtos/${product.slug}`}
                className="absolute inset-0"
              >
                {image ? (
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[#FAF8F5]" />
                )}
              </Link>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-medium text-[#2F2F2F]">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex text-yellow-400">
                    ★★★★★
                  </div>

                  <p className="mt-4 text-2xl font-semibold text-[#C8A96A]">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <p className="mt-1 text-sm font-medium text-green-600">
                    💚 PIX:{" "}
                    {pixPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <div className="mt-3">
                    {product.stock > 0 ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Em estoque
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        Indisponível
                      </span>
                    )}
                  </div>

                  <div className="mt-6">
                    <AddToCartButton
                      product={{
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        image,
                      }}
                    />
                  </div>

                  <Link
                    href={`/produtos/${product.slug}`}
                    className="mt-4 block text-center text-sm font-medium text-[#C8A96A] transition hover:underline"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
