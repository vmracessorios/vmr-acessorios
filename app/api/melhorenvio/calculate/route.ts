import { NextResponse } from "next/server";

const ORIGIN_CEP = "28015220";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const destinationCep = String(body.cep || "").replace(/\D/g, "");

    if (destinationCep.length !== 8) {
      return NextResponse.json(
        {
          error: "CEP de destino inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const accessToken =
      process.env.MELHOR_ENVIO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "MELHOR_ENVIO_ACCESS_TOKEN não está configurado na Vercel.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Embalagem padrão da VMR Acessórios.
     *
     * Dimensões:
     * largura: 15 cm
     * altura: 5 cm
     * comprimento: 20 cm
     * peso: 0,3 kg
     */
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

    /*
     * IMPORTANTE:
     * Este é o endpoint de PRODUÇÃO do Melhor Envio.
     *
     * Não usar sandbox aqui, pois o token configurado
     * na Vercel é de produção.
     */
    const response = await fetch(
      "https://melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "User-Agent":
            "VMR Acessórios ([email protected])",
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
      console.error(
        "Erro retornado pelo Melhor Envio:",
        {
          status: response.status,
          data,
        }
      );

      return NextResponse.json(
        {
          error:
            data?.message ||
            data?.error ||
            "O Melhor Envio recusou a cotação.",
          details: data,
        },
        {
          status: response.status,
        }
      );
    }

    const options = Array.isArray(data)
      ? data
          .filter(
            (item) =>
              !item.error &&
              (item.custom_price || item.price)
          )
          .map((item) => ({
            id: item.id,

            name:
              item.name ||
              item.service ||
              "Opção de entrega",

            company:
              item.company?.name ||
              "",

            price: Number(
              item.custom_price ??
                item.price ??
                0
            ),

            deliveryTime:
              item.custom_delivery_time ??
              item.delivery_time ??
              null,

            deliveryRange:
              item.delivery_range ??
              null,
          }))
      : [];

    if (options.length === 0) {
      return NextResponse.json(
        {
          error:
            "Não encontramos opções de entrega para este CEP.",
          details: data,
        },
        {
          status: 422,
        }
      );
    }

    return NextResponse.json({
      success: true,
      options,
    });
  } catch (error) {
    console.error(
      "Erro interno ao calcular frete:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível calcular o frete.",
      },
      {
        status: 500,
      }
    );
  }
}