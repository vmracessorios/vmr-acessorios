"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function CadastroPage() {
  const router = useRouter();

  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (
      !name ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const result = await signUp(
      name,
      lastName,
      email,
      password
    );

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl p-8">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-light">
            Criar conta
          </h1>

          <p className="mt-3 text-neutral-500">
            Cadastre-se para comprar na VMR Acessórios
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm mb-2">
              Nome
            </label>

            <div className="flex items-center border rounded-xl px-4 h-12">

              <User
                size={18}
                className="text-neutral-400"
              />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Seu nome"
                className="flex-1 ml-3 outline-none bg-transparent"
              />

            </div>

          </div>

          <div>

            <label className="block text-sm mb-2">
              Sobrenome
            </label>

            <div className="flex items-center border rounded-xl px-4 h-12">

              <User
                size={18}
                className="text-neutral-400"
              />

              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                placeholder="Seu sobrenome"
                className="flex-1 ml-3 outline-none bg-transparent"
              />

            </div>

          </div>

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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Crie uma senha"
                className="flex-1 ml-3 outline-none bg-transparent"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="text-neutral-400"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-neutral-400"
                  />
                )}
              </button>

            </div>

          </div>

          <div>

            <label className="block text-sm mb-2">
              Confirmar senha
            </label>

            <div className="flex items-center border rounded-xl px-4 h-12">

              <Lock
                size={18}
                className="text-neutral-400"
              />

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirme sua senha"
                className="flex-1 ml-3 outline-none bg-transparent"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                {showConfirm ? (
                  <EyeOff
                    size={18}
                    className="text-neutral-400"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-neutral-400"
                  />
                )}
              </button>

            </div>

          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#C8A96A] text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Criando conta..."
              : "Criar conta"}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-neutral-600">

          Já possui uma conta?{" "}

          <Link
            href="/login"
            className="text-[#C8A96A] font-medium hover:underline"
          >
            Entrar
          </Link>

        </div>

      </div>

    </main>
  );
}