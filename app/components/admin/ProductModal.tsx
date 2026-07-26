"use client";

import { useEffect, useState } from "react";

import { Category } from "@/types/category";

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
}: Props) {

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<File[]>([]);

  const [form, setForm] =
    useState<ProductForm>(initialForm);

  useEffect(() => {
    setForm((old) => ({
      ...old,
      slug: old.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-"),
    }));
  }, [form.name]);

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
    setLoading(true);

    await onSave(form, images);

    setLoading(false);

    setImages([]);

    setForm(initialForm);

    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6 overflow-y-auto">

      <div className="w-full max-w-3xl rounded-2xl bg-white p-8">

        <h2 className="mb-8 text-2xl font-semibold">
          Novo Produto
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
            className="h-12 w-full rounded-xl border px-4"
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
    update("price", Number(e.target.value))
  }
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
              className="h-12 rounded-xl border px-4"
              placeholder="Estoque"
              value={form.stock}
              onChange={(e) =>
                update(
                  "stock",
                  Number(e.target.value)
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

                setImages(
                  Array.from(e.target.files)
                );
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
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}

                </div>

              </>
            )}

          </div>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                update(
                  "featured",
                  e.target.checked
                )
              }
            />

            Produto em destaque

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                update(
                  "active",
                  e.target.checked
                )
              }
            />

            Produto ativo

          </label>

          <div className="flex justify-end gap-3 mt-8">

            <button
              onClick={onClose}
              className="rounded-xl border px-6 py-3"
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-[#C8A96A] px-6 py-3 text-white"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}