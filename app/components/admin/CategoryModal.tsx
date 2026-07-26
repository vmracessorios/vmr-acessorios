"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    slug: string;
    description: string;
  }) => Promise<void>;
};

export default function CategoryModal({
  open,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    setLoading(true);

    await onSave({
      name,
      slug,
      description,
    });

    setLoading(false);

    setName("");
    setSlug("");
    setDescription("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8">

        <h2 className="text-2xl font-semibold">
          Nova Categoria
        </h2>

        <div className="mt-6 space-y-5">

          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl px-4 h-12"
          />

          <input
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border rounded-xl px-4 h-12"
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-4 h-32"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-[#C8A96A] text-white"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

        </div>

      </div>

    </div>
  );
}