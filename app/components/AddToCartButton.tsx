"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={added}
      className={`w-full rounded-xl px-6 py-4 font-medium text-white transition-all duration-300 ${
        added
          ? "bg-green-600"
          : "bg-[#C8A96A] hover:opacity-90"
      }`}
    >
      {added ? "✓ Adicionado ao carrinho" : "Adicionar ao carrinho"}
    </button>
  );
}