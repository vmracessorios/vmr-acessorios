"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
const router = useRouter();

 function finalizarCompra() {
  onClose();
  router.push("/checkout");
}

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white z-50 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-light">Meu Carrinho</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 && (
            <p className="text-neutral-500">
              Seu carrinho está vazio.
            </p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">

              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#FAF8F5]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">

                <h3 className="font-medium">
                  {item.name}
                </h3>

                <p className="text-[#C8A96A] font-semibold mt-1">
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <div className="flex items-center gap-3 mt-3">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>

        <div className="border-t p-6">

          <div className="flex justify-between text-lg mb-6">
            <span>Subtotal</span>

            <strong>
              {cartTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          <button
            onClick={finalizarCompra}
            className="w-full rounded-full bg-[#C8A96A] text-white py-4 hover:bg-[#b18f55] transition"
          >
            Finalizar Compra
          </button>

        </div>

      </aside>
    </>
  );
}