import Image from "next/image";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/services/products";
import { getPublicUrl } from "@/services/storage";
import AddToCartButton from "@/app/components/AddToCartButton";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  console.log("SLUG DA PÁGINA:", slug);

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const image =
    product.product_images && product.product_images.length > 0
      ? getPublicUrl(product.product_images[0].storage_path)
      : "/placeholder.jpg";

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAF8F5]">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="uppercase tracking-[4px] text-[#C8A96A] text-sm">
            {product.categories?.name}
          </p>

          <h1 className="mt-4 text-5xl font-light">
            {product.name}
          </h1>

          <p className="mt-6 text-4xl font-semibold text-[#C8A96A]">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <div className="mt-10 leading-8 text-neutral-600">
            {product.description}
          </div>

          <div className="mt-12">
            <AddToCartButton
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}