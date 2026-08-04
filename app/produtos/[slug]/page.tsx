import { notFound } from "next/navigation";

import { getProductBySlug } from "@/services/products";
import { getPublicUrl } from "@/services/storage";

import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images =
    product.product_images && product.product_images.length > 0
      ? product.product_images.map((img) =>
          getPublicUrl(img.storage_path)
        )
      : ["/placeholder.jpg"];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <a
          href="/"
          className="text-sm text-neutral-500 transition hover:text-[#C8A96A]"
        >
          ← Voltar para os produtos
        </a>
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        <ProductGallery
          images={images}
          name={product.name}
        />

        <ProductInfo
          product={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: images[0],
            categories: product.categories,
          }}
        />
      </div>
    </main>
  );
}