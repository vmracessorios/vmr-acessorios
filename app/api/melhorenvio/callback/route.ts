import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Código de autorização não recebido." },
        { status: 400 }
      );
    }

    const clientId = process.env.MELHOR_ENVIO_CLIENT_ID;
    const clientSecret = process.env.MELHOR_ENVIO_CLIENT_SECRET;
    const redirectUri = process.env.MELHOR_ENVIO_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json(
        { error: "Credenciais do Melhor Envio não configuradas." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/oauth/token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "VMR Acessórios",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro ao obter token do Melhor Envio:", data);

      return NextResponse.json(
        {
          error: "Erro ao obter token do Melhor Envio.",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Melhor Envio autorizado com sucesso.",
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    console.error("Erro no callback Melhor Envio:", error);

    return NextResponse.json(
      { error: "Erro interno no callback." },
      { status: 500 }
    );
  }
}