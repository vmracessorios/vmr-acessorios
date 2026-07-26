"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    const result = await signIn(email, password);

    setLoading(false);

    if (result.error) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-light">
            Entrar
          </h1>

          <p className="mt-3 text-neutral-500">
            Acesse sua conta VMR Acessórios
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm mb-2">
              E-mail
            </label>

            <div className="flex items-center border rounded-xl px-4 h-12">

              <Mail
                size={18}
                className="text-neutral-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Digite seu e-mail"
                className="flex-1 ml-3 outline-none bg-transparent"
              />

            </div>

          </div>

          <div>

            <label className="block text-sm mb-2">
              Senha
            </label>

            <div className="flex items-center border rounded-xl px-4 h-12">

              <Lock
                size={18}
                className="text-neutral-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Digite sua senha"
                className="flex-1 ml-3 outline-none bg-transparent"
              />

            </div>

          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <div className="text-right">

            <Link
              href="/recuperar-senha"
              className="text-sm text-[#C8A96A] hover:underline"
            >
              Esqueci minha senha
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#C8A96A] text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Entrando..."
              : "Entrar"}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-neutral-600">

          Ainda não possui uma conta?{" "}

          <Link
            href="/cadastro"
            className="text-[#C8A96A] font-medium hover:underline"
          >
            Criar conta
          </Link>

        </div>

      </div>

    </main>
  );
} 