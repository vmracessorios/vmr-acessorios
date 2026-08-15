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
  X,
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

  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  function closeMobileMenu() {
    setOpenMobileMenu(false);
  }

  function handleHomeClick(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    closeMobileMenu();

    // Se já estiver na página inicial,
    // apenas volta para o topo.
    if (window.location.pathname === "/") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  async function handleLogout() {
    await signOut();

    setOpenUserMenu(false);
    closeMobileMenu();

    router.push("/");
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">

        <div className="max-w-7xl mx-auto h-24 px-6 lg:px-8 flex items-center justify-between">

          {/* LOGO */}
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center"
            aria-label="Ir para o início"
          >
            <Image
              src="/logo/logo-vmr.png"
              alt="VMR Acessórios"
              width={220}
              height={80}
              priority
              className="h-16 w-auto object-contain"
            />
          </a>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8 uppercase tracking-[2px] text-sm">

            <a
              href="/"
              onClick={handleHomeClick}
              className="hover:text-[#C8A96A] transition"
            >
              Início
            </a>

            <Link
              href="/colares"
              className="hover:text-[#C8A96A] transition"
            >
              Colares
            </Link>

            <Link
              href="/pulseiras"
              className="hover:text-[#C8A96A] transition"
            >
              Pulseiras
            </Link>

            <Link
              href="/quem-somos"
              className="hover:text-[#C8A96A] transition"
            >
              Quem Somos
            </Link>

            <Link
              href="/contato"
              className="hover:text-[#C8A96A] transition"
            >
              Contato
            </Link>

          </nav>

          {/* AÇÕES DESKTOP */}
          <div className="hidden lg:flex items-center gap-5">

            {/* BUSCA */}
            <button
              type="button"
              onClick={() => setOpenSearch(true)}
              aria-label="Pesquisar"
              className="hover:text-[#C8A96A] transition"
            >
              <Search size={20} />
            </button>

            {/* FAVORITOS */}
            <Link
              href="/favoritos"
              aria-label="Favoritos"
              className="hover:text-[#C8A96A] transition"
            >
              <Heart size={20} />
            </Link>

            {/* CONTA */}
            {isAuthenticated ? (
              <div
                ref={menuRef}
                className="relative"
              >
                <button
                  type="button"
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
                      type="button"
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
                aria-label="Entrar"
                className="hover:text-[#C8A96A] transition"
              >
                <User size={20} />
              </Link>
            )}

            {/* CARRINHO */}
            <button
              type="button"
              onClick={() => setOpenCart(true)}
              aria-label="Carrinho"
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

          {/* AÇÕES MOBILE */}
          <div className="flex lg:hidden items-center gap-4">

            <button
              type="button"
              onClick={() => setOpenSearch(true)}
              aria-label="Pesquisar"
              className="hover:text-[#C8A96A] transition"
            >
              <Search size={21} />
            </button>

            <Link
              href="/favoritos"
              aria-label="Favoritos"
              className="hover:text-[#C8A96A] transition"
            >
              <Heart size={21} />
            </Link>

            <button
              type="button"
              onClick={() => setOpenCart(true)}
              aria-label="Carrinho"
              className="relative hover:text-[#C8A96A] transition"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-[#C8A96A] text-white text-[10px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setOpenMobileMenu(!openMobileMenu)
              }
              aria-label={
                openMobileMenu
                  ? "Fechar menu"
                  : "Abrir menu"
              }
              className="hover:text-[#C8A96A] transition"
            >
              {openMobileMenu ? (
                <X size={27} />
              ) : (
                <Menu size={27} />
              )}
            </button>

          </div>

        </div>

        {/* MENU MOBILE */}
        {openMobileMenu && (
          <div className="lg:hidden border-t border-neutral-200 bg-white shadow-lg">

            <nav className="px-6 py-6 flex flex-col uppercase tracking-[2px] text-sm">

              <a
                href="/"
                onClick={handleHomeClick}
                className="py-4 border-b border-neutral-100 hover:text-[#C8A96A] transition"
              >
                Início
              </a>

              <Link
                href="/colares"
                onClick={closeMobileMenu}
                className="py-4 border-b border-neutral-100 hover:text-[#C8A96A] transition"
              >
                Colares
              </Link>

              <Link
                href="/pulseiras"
                onClick={closeMobileMenu}
                className="py-4 border-b border-neutral-100 hover:text-[#C8A96A] transition"
              >
                Pulseiras
              </Link>

              <Link
                href="/quem-somos"
                onClick={closeMobileMenu}
                className="py-4 border-b border-neutral-100 hover:text-[#C8A96A] transition"
              >
                Quem Somos
              </Link>

              <Link
                href="/contato"
                onClick={closeMobileMenu}
                className="py-4 hover:text-[#C8A96A] transition"
              >
                Contato
              </Link>

              <div className="mt-4 pt-4 border-t border-neutral-200">

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/minha-conta"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 py-3 hover:text-[#C8A96A] transition"
                    >
                      <User size={18} />
                      Minha Conta
                    </Link>

                    <Link
                      href="/meus-pedidos"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 py-3 hover:text-[#C8A96A] transition"
                    >
                      <Package size={18} />
                      Meus Pedidos
                    </Link>

                    <Link
                      href="/favoritos"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 py-3 hover:text-[#C8A96A] transition"
                    >
                      <Heart size={18} />
                      Favoritos
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-3 text-red-600"
                    >
                      <LogOut size={18} />
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-3 hover:text-[#C8A96A] transition"
                  >
                    <User size={18} />
                    Entrar
                  </Link>
                )}

              </div>

            </nav>

          </div>
        )}

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