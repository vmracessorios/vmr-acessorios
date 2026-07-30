"use client";

import { useState } from "react";
import AddToCartButton from "@/app/components/AddToCartButton";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function ProductActions({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto:\n\n${product.name}\n\nQuantidade: ${quantity}`
  );

  // Substitua pelo número da VMR quando formos publicar
  const whatsappLink = `https://wa.me/55SEUNUMEROAQUI?text=${whatsappMessage}`;

  return (
    <div className="space-y-6">

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">
          Quantidade
        </p>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">

          <button
            type="button"
            onClick={decrease}
            className="px-4 py-3 text-xl hover:bg-gray-100"
          >
            −
          </button>

          <span className="min-w-12 text-center font-semibold">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increase}
            className="px-4 py-3 text-xl hover:bg-gray-100"
          >
            +
          </button>

        </div>
      </div>

      <AddToCartButton product={product} />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl border border-green-600 py-4 text-center font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
      >
        Comprar pelo WhatsApp
      </a>

    </div>
  );
}