"use client";

import { useEffect, useState } from "react";

import ProductModal from "@/app/components/admin/ProductModal";

import { Product } from "@/types/product";
import { Category } from "@/types/category";

import {
  getProducts,
  createProduct,
  deleteProduct,
} from "@/services/products";

import { getCategories } from "@/services/categories";

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    setLoading(true);

    try {
      const data = await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  async function handleCreateProduct(
    data: any,
    images: File[]
  ) {
    try {
      await createProduct(data, images);

      await loadProducts();

      setOpenModal(false);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ||
          JSON.stringify(error) ||
          "Erro ao cadastrar produto."
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
      await deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.error(error);

      alert("Erro ao excluir produto.");
    }
  }
  return (
    <>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-semibold">
              Produtos
            </h1>

            <p className="mt-2 text-neutral-500">
              Gerencie os produtos da VMR Acessórios.
            </p>

          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-xl bg-[#C8A96A] px-6 py-3 text-white hover:opacity-90 transition"
          >
            Novo Produto
          </button>

        </div>

        <div className="overflow-hidden rounded-2xl border bg-white">

          <table className="w-full">

            <thead className="bg-neutral-50">

              <tr>

                <th className="p-4 text-left">
                  Produto
                </th>

                <th className="p-4 text-left">
                  Categoria
                </th>

                <th className="p-4 text-left">
                  Preço
                </th>

                <th className="p-4 text-left">
                  Estoque
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-right">
                  Ações
                </th>

              </tr>

            </thead>

            <tbody>
                {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center"
                  >
                    Carregando...
                  </td>
                </tr>
              )}

              {!loading &&
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t"
                  >
                    <td className="p-4 font-medium">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.categories?.name ?? "-"}
                    </td>

                    <td className="p-4">
                      {Number(product.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="p-4">
                      {product.stock}
                    </td>

                    <td className="p-4">
                      {product.active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Ativo
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Inativo
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-neutral-500"
                  >
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleCreateProduct}
        categories={categories}
      />
    </>
  );
}
           