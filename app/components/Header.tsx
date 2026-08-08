"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

export default function Header() {
  const router = useRouter();

  const { cartCount } = useCart();

  const {
    isAuthenticated,
    firstName,
    signOut,
  } = useAuth();

  const [openCart, setOpenCart] =
    useState(false);

  const [openSearch, setOpenSearch] =
    useState(false);

  const [openUserMenu, setOpenUserMenu] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenUserMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function handleLogout() {
    await signOut();

    setOpenUserMenu(false);

    router.push("/");
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">

        <div className="max-w-7xl mx-auto h-24 px-6 lg:px-8 flex items-center justify-between">

          <Link
            href="/colares"
            className="flex items-center"
          >
            <Image
              src="/logo/logo-vmr.png"
              alt="VMR Acessórios"
              width={220}
              height={80}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10 uppercase tracking-[2px] text-sm">

            <Link
              href="/pulseiras"
              className="hover:text-[#C8A96A] transition"
            >
              Início
            </Link>

            <Link
              href="/"
              className="hover:text-[#C8A96A] transition"
            >
              Colares
            </Link>

            <Link
              href="/"
              className="hover:text-[#C8A96A] transition"
            >
              Pulseiras
            </Link>

          </nav>

          <div className="hidden lg:flex items-center gap-5">

            <button
              onClick={() => setOpenSearch(true)}
              className="hover:text-[#C8A96A] transition"
            >
              <Search size={20} />
            </button>

            <button className="hover:text-[#C8A96A] transition">
              <Heart size={20} />
            </button>
            {isAuthenticated ? (
              <div
                ref={menuRef}
                className="relative"
              >
                <button
                  onClick={() =>
                    setOpenUserMenu(!openUserMenu)
                  }
                  className="flex items-center gap-2 hover:text-[#C8A96A] transition"
                >
                  <User size={20} />

                  <span className="text-sm">
                    Olá, {firstName}
                  </span>

                  <ChevronDown size={16} />
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-4 w-64 rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">

                    <div className="px-5 py-4 border-b">
                      <p className="text-xs uppercase tracking-widest text-neutral-400">
                        Minha Conta
                      </p>

                      <p className="mt-1 font-medium">
                        {firstName}
                      </p>
                    </div>

                    <Link
                      href="/minha-conta"
                      onClick={() =>
                        setOpenUserMenu(false)
                      }
                      className="flex items-center gap-3 px-5 py-4 hover:bg-neutral-50 transition"
                    >
                      <User size={18} />

                      Minha Conta
                    </Link>

                    <Link
                      href="/meus-pedidos"
                      onClick={() =>
                        setOpenUserMenu(false)
                      }
                      className="flex items-center gap-3 px-5 py-4 hover:bg-neutral-50 transition"
                    >
                      <Package size={18} />

                      Meus Pedidos
                    </Link>

                    <Link
                      href="/favoritos"
                      onClick={() =>
                        setOpenUserMenu(false)
                      }
                      className="flex items-center gap-3 px-5 py-4 hover:bg-neutral-50 transition"
                    >
                      <Heart size={18} />

                      Favoritos
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={18} />

                      Sair
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hover:text-[#C8A96A] transition"
              >
                <User size={20} />
              </Link>
            )}

            <button
              onClick={() => setOpenCart(true)}
              className="relative hover:text-[#C8A96A] transition"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-[#C8A96A] text-white text-[10px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

          <button className="lg:hidden">
            <Menu size={28} />
          </button>

        </div>

      </header>
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />

      <SearchModal
        open={openSearch}
        onClose={() => setOpenSearch(false)}
      />
    </>
  );
}