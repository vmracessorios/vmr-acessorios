import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.MELHOR_ENVIO_CLIENT_ID;
  const redirectUri = process.env.MELHOR_ENVIO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Credenciais do Melhor Envio não configuradas." },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "shipping-calculate",
  });

  return NextResponse.redirect(
    `https://sandbox.melhorenvio.com.br/oauth/authorize?${params.toString()}`
  );
}
