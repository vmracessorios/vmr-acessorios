"use client";

import { Bell, Search } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { firstName } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-semibold text-neutral-900">
          Painel Administrativo
        </h2>

        <p className="text-sm text-neutral-500">
          Bem-vindo de volta{firstName ? `, ${firstName}` : ""}.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition">
          <Search size={18} />
        </button>

        <button className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition">
          <Bell size={18} />
        </button>

        <div className="w-11 h-11 rounded-full bg-[#C8A96A] text-white flex items-center justify-center font-semibold">
          {firstName?.charAt(0).toUpperCase() ?? "A"}
        </div>

      </div>

    </header>
  );
}