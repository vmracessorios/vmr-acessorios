import { NextResponse } from "next/server";

const ORIGIN_CEP = "28015220";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const destinationCep = String(body.cep || "").replace(/\D/g, "");

    if (destinationCep.length !== 8) {
      return NextResponse.json(
        { error: "CEP de destino inválido." },
        { status: 400 }
      );
    }

    const accessToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "MELHOR_ENVIO_ACCESS_TOKEN não configurado na Vercel.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "User-Agent":
            "VMR Acessórios (contato@vmracessorios.com.br)",
        },
        body: JSON.stringify({
          from: {
            postal_code: ORIGIN_CEP,
          },

          to: {
            postal_code: destinationCep,
          },

          products: [
            {
              id: "vmr-acessorios",
              width: 15,
              height: 5,
              length: 20,
              weight: 0.3,
              insurance_value: 0,
              quantity: 1,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Melhor Envio:", data);

      return NextResponse.json(
        {
          error: "Erro ao calcular o frete.",
          details: data,
        },
        { status: response.status }
      );
    }

    const options = Array.isArray(data)
      ? data
          .filter((item) => !item.error && item.price)
          .map((item) => ({
            id: item.id,
            name: item.name,
            company: item.company?.name ?? "",
            price: Number(item.price),
            deliveryTime: item.delivery_time,
            deliveryRange: item.delivery_range,
          }))
      : [];

    return NextResponse.json({
      success: true,
      options,
    });
  } catch (error) {
    console.error("Erro interno ao calcular frete:", error);

    return NextResponse.json(
      {
        error: "Não foi possível calcular o frete.",
      },
      { status: 500 }
    );
  }
}