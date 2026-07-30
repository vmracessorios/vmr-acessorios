import { NextResponse } from "next/server";
import { Preference } from "mercadopago";

import { mercadoPago } from "@/lib/mercadopago";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const preference = new Preference(mercadoPago);

    const response = await preference.create({
      body: {
        items: body.items,

        payer: {
          name: body.payer.name,
          email: body.payer.email,
        },

        external_reference: body.orderId,

        back_urls: {
          success: "http://localhost:3000/sucesso",
          failure: "http://localhost:3000/falha",
          pending: "http://localhost:3000/pendente",
        },

        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
      },
    });

    console.log("==================================");
    console.log("PREFERENCE RESPONSE:");
    console.dir(response, { depth: null });
    console.log("==================================");

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("ERRO AO CRIAR PREFERÊNCIA:");
    console.error(error);

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