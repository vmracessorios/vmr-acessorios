"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
} from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Produtos",
      href: "/admin/produtos",
      icon: Package,
    },
    {
      name: "Categorias",
      href: "/admin/categorias",
      icon: FolderTree,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
            <aside className="hidden w-72 border-r bg-white lg:flex lg:flex-col">

        <div className="border-b p-8">

          <h1 className="text-2xl font-bold text-[#C8A96A]">
            VMR
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Painel Administrativo
          </p>

        </div>

        <nav className="flex-1 space-y-2 p-4">

          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  active
                    ? "bg-[#C8A96A] text-white"
                    : "text-neutral-600 hover:bg-[#FAF8F5]"
                }`}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.name}
                </span>

              </Link>
            );
          })}

        </nav>

      </aside>
            <div className="flex min-h-screen flex-1 flex-col">

        <header className="flex h-20 items-center justify-between border-b bg-white px-8">

          <div>

            <h2 className="text-xl font-semibold">
              Painel Administrativo
            </h2>

            <p className="text-sm text-neutral-500">
              VMR Acessórios
            </p>

          </div>

        </header>

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>
  );
}
