"use client";

import { useEffect, useState } from "react";

import CategoryModal from "@/app/components/admin/CategoryModal";

import { Category } from "@/types/category";

import {
  getCategories,
  createCategory,
} from "@/services/categories";

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: {
    name: string;
    slug: string;
    description: string;
  }) {
    await createCategory(data);

    await loadCategories();
  }

  return (
    <>
      <CategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleCreate}
      />

      <div>

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-semibold">
              Categorias
            </h1>

            <p className="mt-2 text-neutral-500">
              Gerencie as categorias da VMR.
            </p>

          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-xl bg-[#C8A96A] px-6 py-3 text-white hover:opacity-90 transition"
          >
            Nova Categoria
          </button>

        </div>

        <div className="rounded-2xl bg-white border overflow-hidden">

          <table className="w-full">

            <thead className="bg-neutral-50">

              <tr>

                <th className="text-left p-4">
                  Nome
                </th>

                <th className="text-left p-4">
                  Slug
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td
                    colSpan={3}
                    className="p-6"
                  >
                    Carregando...
                  </td>
                </tr>
              )}

              {!loading &&
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {category.name}
                    </td>

                    <td className="p-4">
                      {category.slug}
                    </td>

                    <td className="p-4">
                      {category.active
                        ? "Ativa"
                        : "Inativa"}
                    </td>

                  </tr>
                ))}

              {!loading &&
                categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-8 text-center text-neutral-500"
                    >
                      Nenhuma categoria cadastrada.
                    </td>
                  </tr>
                )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}