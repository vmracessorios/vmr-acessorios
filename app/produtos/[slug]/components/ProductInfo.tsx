import ProductActions from "./ProductActions";

type Props = {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    image: string;
    categories?: {
      name: string;
    };
  };
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="flex flex-col gap-6">

      {/* Categoria */}
      {product.categories && (
        <span className="text-sm uppercase tracking-widest text-gray-500">
          {product.categories.name}
        </span>
      )}

      {/* Nome */}
      <h1 className="text-4xl font-light text-[#2D2D2D]">
        {product.name}
      </h1>

      {/* Preço */}
      <div>
        <p className="text-4xl font-semibold text-[#2D2D2D]">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <p className="mt-3 text-green-600 font-medium">
          💚 5% de desconto no PIX
        </p>

        <p className="mt-2 text-gray-600">
          💳 Pagamento no cartão de débito ou crédito
        </p>

        <p className="mt-2 text-emerald-700 font-medium">
          ✔ Em estoque
        </p>
      </div>

      <ProductActions product={product} />

    </div>
  );
}