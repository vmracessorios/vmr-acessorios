"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { products } from "@/lib/products";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchModal({ open, onClose }: Props) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-start justify-center pt-24">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">

        <div className="flex items-center border-b px-6 py-4">

          <Search className="text-neutral-400" size={20} />

          <input
            autoFocus
            type="text"
            placeholder="Pesquisar colares..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 outline-none text-lg"
          />

          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black"
          >
            <X size={22} />
          </button>

        </div>

        <div className="max-h-[400px] overflow-y-auto">

          {search === "" && (
            <p className="p-6 text-neutral-500">
              Digite o nome de um produto.
            </p>
          )}

          {search !== "" && filteredProducts.length === 0 && (
            <p className="p-6 text-neutral-500">
              Nenhum produto encontrado.
            </p>
          )}

          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/produtos/${product.slug}`}
              onClick={onClose}
              className="block px-6 py-4 hover:bg-neutral-100 transition"
            >
              <div className="font-medium">{product.name}</div>

              <div className="text-sm text-neutral-500 mt-1">
                R$ {product.price.toFixed(2)}
              </div>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}