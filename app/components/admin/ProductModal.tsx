"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

type ProductForm = {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  featured: boolean;
  active: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (
    data: ProductForm,
    images: File[]
  ) => Promise<void>;
  categories: Category[];
  product?: Product | null;
};

const initialForm: ProductForm = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  stock: 0,
  category_id: "",
  featured: false,
  active: true,
};

export default function ProductModal({
  open,
  onClose,
  onSave,
  categories,
  product,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<File[]>([]);

  const [form, setForm] =
    useState<ProductForm>(initialForm);

  useEffect(() => {
    if (!product) {
      setForm(initialForm);
      setImages([]);
      return;
    }

    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      category_id: product.category_id,
      featured: product.featured,
      active: product.active,
    });

    setImages([]);
  }, [product]);
    useEffect(() => {
    if (product) return;

    setForm((old) => ({
      ...old,
      slug: old.name
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-"),
    }));
  }, [form.name, product]);

  function update<K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) {
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  }

  async function handleSave() {
    try {
      setLoading(true);

      await onSave(form, images);

      setForm(initialForm);
      setImages([]);

      onClose();
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-6">

      <div className="w-full max-w-3xl rounded-2xl bg-white p-8">

        <h2 className="mb-8 text-2xl font-semibold">
          {product ? "Editar Produto" : "Novo Produto"}
        </h2>

        <div className="space-y-5">
                  <input
            className="h-12 w-full rounded-xl border px-4"
            placeholder="Nome do produto"
            value={form.name}
            onChange={(e) =>
              update("name", e.target.value)
            }
          />

          <input
            className="h-12 w-full rounded-xl border bg-neutral-100 px-4"
            placeholder="Slug"
            value={form.slug}
            readOnly
          />

          <textarea
            className="h-32 w-full rounded-xl border p-4"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) =>
              update(
                "description",
                e.target.value
              )
            }
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              step="0.01"
              min="0"
              className="h-12 rounded-xl border px-4"
              placeholder="Preço"
              value={form.price || ""}
              onChange={(e) =>
                update(
                  "price",
                  Number(
                    e.target.value.replace(",", ".")
                  ) || 0
                )
              }
            />

            <input
              type="number"
              min="0"
              className="h-12 rounded-xl border px-4"
              placeholder="Estoque"
              value={form.stock}
              onChange={(e) =>
                update(
                  "stock",
                  Number(e.target.value) || 0
                )
              }
            />

          </div>

          <select
            className="h-12 w-full rounded-xl border px-4"
            value={form.category_id}
            onChange={(e) =>
              update(
                "category_id",
                e.target.value
              )
            }
          >

            <option value="">
              Selecione uma categoria
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}

          </select>
                    <div className="space-y-3">

            <label className="text-sm font-medium">
              Imagens do produto
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files) return;

                setImages(Array.from(e.target.files));
              }}
            />

            {images.length > 0 && (
              <>
                <p className="text-sm text-emerald-600">
                  {images.length} imagem(ns) selecionada(s)
                </p>

                <div className="grid grid-cols-4 gap-3">

                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-xl border"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Imagem ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}

                </div>
              </>
            )}

          </div>

          <div className="grid grid-cols-2 gap-6">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  update("featured", e.target.checked)
                }
              />

              <span>Produto em destaque</span>

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  update("active", e.target.checked)
                }
              />

              <span>Produto ativo</span>

            </label>

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-6 py-3"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-[#C8A96A] px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading
                ? "Salvando..."
                : product
                ? "Atualizar Produto"
                : "Salvar Produto"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}