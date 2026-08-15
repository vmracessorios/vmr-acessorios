"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/lib/orderService";
import { getProfileById, updateProfile } from "@/services/profiles";

type ShippingOption = {
  id: number | string;
  name: string;
  company: string;
  price: number;
  deliveryTime?: number | null;
  deliveryRange?: {
    min?: number;
    max?: number;
  } | null;
};

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loadingFreight, setLoadingFreight] = useState(false);

  const [shippingOptions, setShippingOptions] = useState<
    ShippingOption[]
  >([]);

  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);

  const [freightError, setFreightError] = useState("");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    observacoes: "",
  });

  const freeShipping = cartTotal >= 300;

  const frete = freeShipping
    ? 0
    : selectedShipping?.price ?? 0;

  const total = cartTotal + frete;

  useEffect(() => {
    if (!user) return;

    const userId = user.id;
    const userEmail = user.email;

    async function loadProfile() {
      try {
        const profile = await getProfileById(userId);

        setForm((current) => ({
          ...current,
          nome: profile.full_name ?? "",
          email: profile.email ?? userEmail ?? "",
          telefone: profile.phone ?? "",
          cpf: profile.cpf ?? "",
          cep: profile.cep ?? "",
          rua: profile.street ?? "",
          numero: profile.number ?? "",
          complemento: profile.complement ?? "",
          bairro: profile.neighborhood ?? "",
          cidade: profile.city ?? "",
          estado: profile.state ?? "",
        }));
      } catch (error) {
        console.error(
          "Erro ao carregar perfil:",
          error
        );
      }
    }

    loadProfile();
  }, [user]);

  async function calculateFreight(cep: string) {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      return;
    }

    if (freeShipping) {
      setShippingOptions([]);
      setSelectedShipping(null);
      setFreightError("");
      return;
    }

    try {
      setLoadingFreight(true);
      setFreightError("");
      setShippingOptions([]);
      setSelectedShipping(null);

      const response = await fetch(
        "/api/melhorenvio/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cep: cleanCep,
            cart: cart.map((item) => ({
              id: item.id,
              name: item.name,
              price: Number(item.price),
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Não foi possível calcular o frete."
        );
      }

      const options = Array.isArray(data.options)
        ? data.options
        : [];

      if (options.length === 0) {
        throw new Error(
          "Não encontramos opções de entrega para este CEP."
        );
      }

      setShippingOptions(options);
      setSelectedShipping(options[0]);
    } catch (error) {
      console.error(
        "Erro ao calcular frete:",
        error
      );

      setFreightError(
        error instanceof Error
          ? error.message
          : "Não foi possível calcular o frete."
      );
    } finally {
      setLoadingFreight(false);
    }
  }

  async function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (name !== "cep") {
      return;
    }

    const cleanCep = value.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setShippingOptions([]);
      setSelectedShipping(null);
      setFreightError("");
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível consultar o CEP."
        );
      }

      const data = await response.json();

      if (data.erro) {
        setFreightError("CEP não encontrado.");
        return;
      }

      setForm((current) => ({
        ...current,
        cep: cleanCep,
        rua: data.logradouro ?? "",
        bairro: data.bairro ?? "",
        cidade: data.localidade ?? "",
        estado: data.uf ?? "",
      }));

      await calculateFreight(cleanCep);
    } catch (error) {
      console.error(
        "Erro ao consultar CEP:",
        error
      );

      setFreightError(
        "Não foi possível consultar o CEP. Tente novamente."
      );
    }
  }

  async function handleCheckout() {
    try {
      setLoading(true);

      if (!user) {
        throw new Error(
          "Você precisa estar logado para finalizar o pedido."
        );
      }

      const userId = user.id;

      const cleanCep = form.cep.replace(/\D/g, "");

      if (cleanCep.length !== 8) {
        throw new Error(
          "Informe um CEP válido antes de continuar."
        );
      }

      if (!freeShipping && !selectedShipping) {
        throw new Error(
          "Calcule e selecione uma opção de frete antes de continuar."
        );
      }

      await updateProfile(userId, {
        full_name: form.nome,
        email: form.email,
        phone: form.telefone || null,
        cpf: form.cpf || null,
        cep: cleanCep,
        street: form.rua || null,
        number: form.numero || null,
        complement: form.complemento || null,
        neighborhood: form.bairro || null,
        city: form.cidade || null,
        state: form.estado || null,
      });

      const order = await createOrder({
        profileId: userId,

        customerName: form.nome,
        customerEmail: form.email,
        customerPhone: form.telefone,

        cpf: form.cpf,

        cep: cleanCep,
        street: form.rua,
        number: form.numero,
        complement: form.complemento,
        neighborhood: form.bairro,
        city: form.cidade,
        state: form.estado,

        observations: form.observacoes,

        subtotal: cartTotal,
        freight: frete,
        discount: 0,
        total,

        items: cart.map((item) => ({
          productId: item.id,
          productName: item.name,
          productPrice: item.price,
          quantity: item.quantity,
          subtotal:
            item.price * item.quantity,
        })),
      });

      const paymentItems = cart.map((item) => ({
        id: item.id,
        title: item.name,
        quantity: item.quantity,
        currency_id: "BRL",
        unit_price: Number(item.price),
      }));

      if (frete > 0 && selectedShipping) {
        paymentItems.push({
          id: "frete",
          title: `Frete - ${selectedShipping.name}`,
          quantity: 1,
          currency_id: "BRL",
          unit_price: Number(frete),
        });
      }

      const response = await fetch(
        "/api/mercadopago/preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order.id,

            payer: {
              name: form.nome,
              email: form.email,
            },

            items: paymentItems,
          }),
        }
      );

      const preference = await response.json();

      if (!response.ok) {
        throw new Error(
          preference.error ||
            "Erro ao criar pagamento."
        );
      }

      if (!preference.init_point) {
        throw new Error(
          "O Mercado Pago não retornou o endereço de pagamento."
        );
      }

      clearCart();

      window.location.href =
        preference.init_point;
    } catch (error) {
      console.error(
        "ERRO COMPLETO:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível finalizar o pedido."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] pt-36 pb-20">
        <div className="max-w-xl mx-auto px-6">
          <section className="bg-white rounded-3xl shadow-sm p-10 text-center">
            <h1 className="text-3xl font-light text-[#2F2F2F]">
              Entre para continuar
            </h1>

            <p className="mt-4 text-gray-600">
              Para finalizar sua compra, você precisa estar
              cadastrado ou entrar na sua conta.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="/login"
                className="rounded-full bg-[#C8A96A] px-6 py-3 text-white transition hover:opacity-90"
              >
                Entrar na minha conta
              </a>

              <a
                href="/cadastro"
                className="rounded-full border border-[#C8A96A] px-6 py-3 text-[#C8A96A] transition hover:bg-[#C8A96A] hover:text-white"
              >
                Criar minha conta
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-light text-center mb-12">
          Finalizar Compra
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-10">
            <h2 className="text-2xl font-medium mb-8">
              Dados do Cliente
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Nome Completo
                </label>

                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  E-mail
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Telefone
                </label>

                <input
                  type="text"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="(22) 99999-9999"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  CPF (opcional)
                </label>

                <input
                  type="text"
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>
            </div>

            <h2 className="text-2xl font-medium mt-12 mb-8">
              Endereço de Entrega
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  CEP
                </label>

                <div className="flex gap-3">
                  <input
                    type="text"
                    name="cep"
                    value={form.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                    maxLength={9}
                    className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                  />

                  {loadingFreight && (
                    <div className="flex items-center px-4 text-sm text-neutral-500">
                      Calculando...
                    </div>
                  )}
                </div>

                <p className="mt-2 text-xs text-neutral-500">
                  Digite seu CEP para preencher o endereço e
                  calcular o frete.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Rua
                </label>

                <input
                  type="text"
                  name="rua"
                  value={form.rua}
                  onChange={handleChange}
                  placeholder="Rua"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Número
                </label>

                <input
                  type="text"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  placeholder="Número"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Complemento
                </label>

                <input
                  type="text"
                  name="complemento"
                  value={form.complemento}
                  onChange={handleChange}
                  placeholder="Apartamento, bloco, etc."
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Bairro
                </label>

                <input
                  type="text"
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                  placeholder="Bairro"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Cidade
                </label>

                <input
                  type="text"
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  placeholder="Cidade"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Estado
                </label>

                <input
                  type="text"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  placeholder="Estado"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#C8A96A]"
                />
              </div>
            </div>

            {freeShipping && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
                <p className="font-medium text-green-700">
                  🎉 Frete grátis!
                </p>

                <p className="text-sm text-green-600 mt-1">
                  Seu pedido atingiu R$ 300,00 e o frete é por nossa conta.
                </p>
              </div>
            )}

            {!freeShipping && shippingOptions.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-medium mb-5">
                  Escolha o frete
                </h2>

                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between gap-4 rounded-2xl border p-4 cursor-pointer transition ${
                        selectedShipping?.id === option.id
                          ? "border-[#C8A96A] bg-[#FAF8F5]"
                          : "border-neutral-200 hover:border-[#C8A96A]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={
                            selectedShipping?.id === option.id
                          }
                          onChange={() =>
                            setSelectedShipping(option)
                          }
                        />

                        <div>
                          <p className="font-medium">
                            {option.name}
                          </p>

                          {option.company && (
                            <p className="text-sm text-neutral-500">
                              {option.company}
                            </p>
                          )}

                          {option.deliveryTime && (
                            <p className="text-xs text-neutral-500 mt-1">
                              Prazo estimado:{" "}
                              {option.deliveryTime} dias úteis
                            </p>
                          )}
                        </div>
                      </div>

                      <strong className="text-[#C8A96A] whitespace-nowrap">
                        {option.price.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </strong>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {freightError && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">
                  {freightError}
                </p>
              </div>
            )}

            <h2 className="text-2xl font-medium mt-12 mb-8">
              Observações
            </h2>

            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows={5}
              placeholder="Alguma observação para seu pedido?"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none resize-none focus:border-[#C8A96A]"
            />
          </section>

          <aside className="bg-white rounded-3xl shadow-sm p-8 h-fit sticky top-36">
            <h2 className="text-2xl font-medium mb-8">
              Resumo do Pedido
            </h2>

            <div className="space-y-6">
              {cart.length === 0 ? (
                <p className="text-neutral-500">
                  Seu carrinho está vazio.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-neutral-200 pb-5"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F7F7F7]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="text-sm text-neutral-500 mt-1">
                        Quantidade: {item.quantity}
                      </p>

                      <p className="mt-2 font-semibold text-[#C8A96A]">
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-neutral-200 pt-6 mt-8 space-y-4">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>

                <span>
                  {cartTotal.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Frete</span>

                <span>
                  {freeShipping
                    ? "Grátis"
                    : frete > 0
                    ? frete.toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    : "Informe o CEP"}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-semibold pt-4 border-t border-neutral-200">
                <span>Total</span>

                <span className="text-[#C8A96A]">
                  {total.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm text-green-700">
                💚 <strong>5% de desconto</strong> para pagamentos via PIX.
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={
                loading ||
                loadingFreight ||
                cart.length === 0 ||
                (!freeShipping &&
                  !selectedShipping)
              }
              className="mt-6 w-full rounded-full bg-[#C8A96A] py-4 text-white font-medium transition hover:bg-[#b8944f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Processando..."
                : loadingFreight
                ? "Calculando frete..."
                : "Ir para o pagamento"}
            </button>

            <div className="mt-6 rounded-2xl bg-[#FAF8F5] p-4">
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>🔒 Ambiente seguro</li>
                <li>📦 Envio para todo o Brasil</li>
                <li>💳 PIX, débito e crédito</li>
              </ul>
            </div>

            <p className="mt-5 text-center text-xs text-neutral-500">
              Ao prosseguir, você será direcionado para um ambiente seguro de
              pagamento.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}