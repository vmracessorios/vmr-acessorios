import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vmracessorios.com.br"),

  title: {
    default: "VMR Acessórios",
    template: "%s | VMR Acessórios",
  },

  description:
    "VMR Acessórios — elegância em cada detalhe. Descubra acessórios que realçam você.",

  icons: {
    icon: "/logo/logo-vmr.png",
    shortcut: "/logo/logo-vmr.png",
    apple: "/logo/logo-vmr.png",
  },

  openGraph: {
    title: "VMR Acessórios",
    description:
      "Elegância em cada detalhe. Descubra acessórios que realçam você.",
    url: "https://www.vmracessorios.com.br",
    siteName: "VMR Acessórios",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo/logo-vmr.png",
        width: 1024,
        height: 1024,
        alt: "VMR Acessórios",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VMR Acessórios",
    description:
      "Elegância em cada detalhe. Descubra acessórios que realçam você.",
    images: ["/logo/logo-vmr.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAF8F5]">
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>{children}</CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}