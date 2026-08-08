"use client";

import Link from "next/link";
import { Heart, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useFavorites } from "@/context/FavoritesContext";
import { supabase } from "@/lib/supabase";
import { getPublicUrl } from "@/services/storage";

type FavoriteProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  product_images?: {
    id: string;
    storage_path: string;
    alt_text?: string | null;
  }[];
};

export default function FavoritosPage() {
  const { favorites, toggleFavorite, loading: favoritesLoading } =
    useFavorites();

  const [products, setProducts] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavoriteProducts() {
      if (favoritesLoading) return;

      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          price,
          product_images (
            id,
            storage_path,
            alt_text
          )
        `)
        .in("id", favorites)
        .eq("active", true);

      if (error) {
        console.error("Erro ao carregar produtos favoritos:", error);
        setProducts([]);
      } else {
        setProducts((data ?? []) as FavoriteProduct[]);
      }

      setLoading(false);
    }

    loadFavoriteProducts();
  }, [favorites, favoritesLoading]);

  if (favoritesLoading || loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
        <div className="flex items-center justify-center gap-3 text-neutral-500">
          <Loader2 className="animate-spin" size={20} />
          <span>Carregando favoritos...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Heart
            size={42}
            strokeWidth={1}
            className="mx-auto text-[#C8A96A]"
          />

          <h1 className="mt-6 text-3xl font-light uppercase tracking-[3px]">
            Favoritos
          </h1>

          <p className="mx-auto mt-4 max-w-md text-neutral-500">
            {products.length > 0
              ? "Os produtos que você escolheu estão aqui."
              : "Você ainda não possui produtos favoritos."}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="mt-12 text-center">
            <Link
              href="/colecao"
              className="inline-block rounded-full bg-[#C8A96A] px-8 py-3 text-sm text-white transition hover:opacity-90"
            >
              Conhecer a coleção
            </Link>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const image =
                product.product_images &&
                product.product_images.length > 0
                  ? getPublicUrl(product.product_images[0].storage_path)
                  : "/placeholder.jpg";

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl bg-white"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Link href={`/produtos/${product.slug}`}>
                      <Image
                        src={image}
                        alt={
                          product.product_images?.[0]?.alt_text ||
                          product.name
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`Remover ${product.name} dos favoritos`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:bg-white"
                    >
                      <Heart
                        size={19}
                        strokeWidth={1.5}
                        className="fill-[#C8A96A] text-[#C8A96A]"
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <Link href={`/produtos/${product.slug}`}>
                      <h2 className="text-lg font-light text-[#2D2D2D]">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="mt-2 text-xl font-medium text-[#2D2D2D]">
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      className="mt-4 flex items-center gap-2 text-sm text-neutral-500 transition hover:text-[#C8A96A]"
                    >
                      <Trash2 size={16} />
                      Remover dos favoritos
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
