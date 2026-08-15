import { NextResponse } from "next/server";
import { Preference } from "mercadopago";

import { mercadoPago } from "@/lib/mercadopago";

const SITE_URL = "https://www.vmracessorios.com.br";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.orderId) {
      return NextResponse.json(
        {
          error: "Pedido não informado.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        {
          error: "Nenhum produto foi informado para o pagamento.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.payer?.name || !body.payer?.email) {
      return NextResponse.json(
        {
          error: "Nome e e-mail do cliente são obrigatórios.",
        },
        {
          status: 400,
        }
      );
    }

    const preference = new Preference(mercadoPago);

    const response = await preference.create({
      body: {
        items: body.items,

        payer: {
          name: body.payer.name,
          email: body.payer.email,
        },

        external_reference: String(body.orderId),

        back_urls: {
          success: `${SITE_URL}/sucesso`,
          failure: `${SITE_URL}/falha`,
          pending: `${SITE_URL}/pendente`,
        },

        auto_return: "approved",

        notification_url: `${SITE_URL}/api/mercadopago/webhook`,
      },
    });

    console.log("==================================");
    console.log("MERCADO PAGO - PREFERÊNCIA CRIADA");
    console.log("ID:", response.id);
    console.log("INIT POINT:", response.init_point);
    console.log("==================================");

    if (!response.init_point) {
      return NextResponse.json(
        {
          error:
            "O Mercado Pago criou a preferência, mas não retornou o endereço de pagamento.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("==================================");
    console.error("ERRO AO CRIAR PREFERÊNCIA DO MERCADO PAGO");
    console.error(error);
    console.error("==================================");

    return NextResponse.json(
      {
        error: "Erro ao criar preferência.",
      },
      {
        status: 500,
      }
    );
  }
}