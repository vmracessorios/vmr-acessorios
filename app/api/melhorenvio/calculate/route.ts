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

    // Por enquanto usamos um volume padrão para os acessórios.
    // Depois podemos ajustar isso conforme a embalagem real da VMR.
    const products = [
      {
        id: "vmr-acessorio",
        width: 15,
        height: 5,
        length: 20,
        weight: 0.3,
        insurance_value: 0,
        quantity: 1,
      },
    ];

    const accessToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "MELHOR_ENVIO_ACCESS_TOKEN não está configurado na Vercel.",
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
          "User-Agent": "VMR Acessórios",
        },
        body: JSON.stringify({
          from: {
            postal_code: ORIGIN_CEP,
          },
          to: {
            postal_code: destinationCep,
          },
          products,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Resposta do Melhor Envio:", data);

      return NextResponse.json(
        {
          error: "O Melhor Envio recusou a cotação.",
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
            deliveryTime: item.delivery_time ?? null,
            deliveryRange: item.delivery_range ?? null,
          }))
      : [];

    return NextResponse.json({
      success: true,
      options,
    });
  } catch (error) {
    console.error("Erro ao calcular frete:", error);

    return NextResponse.json(
      {
        error: "Não foi possível calcular o frete.",
      },
      { status: 500 }
    );
  }
}