"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  TicketPercent,
  Image as ImageIcon,
  Settings,
} from "lucide-react";

const menu = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/produtos",
    label: "Produtos",
    icon: Package,
  },
  {
    href: "/admin/categorias",
    label: "Categorias",
    icon: Tags,
  },
  {
    href: "/admin/pedidos",
    label: "Pedidos",
    icon: ShoppingCart,
  },
  {
    href: "/admin/clientes",
    label: "Clientes",
    icon: Users,
  },
  {
    href: "/admin/cupons",
    label: "Cupons",
    icon: TicketPercent,
  },
  {
    href: "/admin/banners",
    label: "Banners",
    icon: ImageIcon,
  },
  {
    href: "/admin/configuracoes",
    label: "Configurações",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-neutral-200 flex flex-col">

      <div className="h-20 flex items-center px-8 border-b">

        <div>
          <h1 className="text-xl font-semibold">
            VMR Admin
          </h1>

          <p className="text-sm text-neutral-500">
            Painel Administrativo
          </p>
        </div>

      </div>

      <nav className="flex-1 py-6">

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-4 mb-2 flex items-center gap-3 rounded-xl px-5 py-3 transition ${
                active
                  ? "bg-[#C8A96A] text-white"
                  : "hover:bg-neutral-100"
              }`}
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}