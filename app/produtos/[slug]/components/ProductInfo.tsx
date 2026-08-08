"use client";

import { Heart } from "lucide-react";
import ProductActions from "./ProductActions";
import { useFavorites } from "@/context/FavoritesContext";

type Props = {
  product: {
    id: number | string;
    slug: string;
    name: string;
    price: number;
    image: string;
    categories?: {
      name: string;
    };
  };
};

export default function ProductInfo({ product }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(String(product.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          {product.categories && (
            <span className="text-sm uppercase tracking-widest text-gray-500">
              {product.categories.name}
            </span>
          )}

          <h1 className="mt-2 text-4xl font-light text-[#2D2D2D]">
            {product.name}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(String(product.id))}
          aria-label={
            favorite
              ? "Remover produto dos favoritos"
              : "Adicionar produto aos favoritos"
          }
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E7C7C8] transition hover:bg-[#FAF8F5]"
        >
          <Heart
            size={22}
            strokeWidth={1.5}
            className={
              favorite
                ? "fill-[#C8A96A] text-[#C8A96A]"
                : "text-[#C8A96A]"
            }
          />
        </button>
      </div>

      <div>
        <p className="text-4xl font-semibold text-[#2D2D2D]">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <p className="mt-3 font-medium text-green-600">
          💚 5% de desconto no PIX
        </p>

        <p className="mt-2 text-gray-600">
          💳 Pagamento no cartão de débito ou crédito
        </p>

        <p className="mt-2 font-medium text-emerald-700">
          ✔ Em estoque
        </p>
      </div>

      <ProductActions
        product={{
          ...product,
          id: String(product.id),
        }}
      />
    </div>
  );
}
