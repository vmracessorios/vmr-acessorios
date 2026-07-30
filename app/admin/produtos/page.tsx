"use client";

import { useEffect, useMemo, useState } from "react";

import ProductModal from "@/app/components/admin/ProductModal";

import { Product } from "@/types/product";
import { Category } from "@/types/category";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from "@/services/products";

import { getCategories } from "@/services/categories";

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    setLoading(true);

    try {
      const data = await getProducts(true);

      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    const data = await getCategories();

    setCategories(data);
  }
    const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        !categoryFilter ||
        product.category_id === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    products,
    search,
    categoryFilter,
  ]);

  async function handleSaveProduct(
    data: any,
    images: File[]
  ) {
    try {
      if (selectedProduct) {
        await updateProduct(
          selectedProduct.id,
          data
        );
      } else {
        await createProduct(
          data,
          images
        );
      }

      await loadProducts();

      setSelectedProduct(null);

      setOpenModal(false);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ||
          JSON.stringify(error) ||
          "Erro ao salvar produto."
      );
    }
  }

  async function handleDelete(
    id: string
  ) {
    if (
      !confirm(
        "Deseja realmente excluir este produto?"
      )
    )
      return;

    try {
      await deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao excluir produto."
      );
    }
  }

  async function handleToggleStatus(
    product: Product
  ) {
    try {
      await toggleProductStatus(
        product.id,
        !product.active
      );

      await loadProducts();
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao alterar status."
      );
    }
  }
    if (loading) {
    return (
      <div className="p-8 text-center">
        Carregando produtos...
      </div>
    );
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
            onClick={() => {
              setSelectedProduct(null);
              setOpenModal(true);
            }}
            className="rounded-xl bg-[#C8A96A] px-6 py-3 text-white transition hover:opacity-90"
          >
            Novo Produto
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            className="h-12 rounded-xl border px-4"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="h-12 rounded-xl border px-4"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
          >

            <option value="">
              Todas as categorias
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
                            {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-neutral-500"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}

              {filteredProducts.map((product) => (
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
                    {Number(product.price).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleToggleStatus(product)
                      }
                      className={
                        product.active
                          ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                          : "rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                      }
                    >
                      {product.active
                        ? "Ativo"
                        : "Inativo"}
                    </button>
                  </td>

                  <td className="p-4">

                    <div className="flex justify-end gap-4">

                      <button
                        onClick={() => {
                          setSelectedProduct(
                            product
                          );

                          setOpenModal(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="text-red-600 hover:underline"
                      >
                        Excluir
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      <ProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
        categories={categories}
        product={selectedProduct}
      />

    </>
  );
}