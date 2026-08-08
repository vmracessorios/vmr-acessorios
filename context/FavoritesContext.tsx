"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

type FavoritesContextType = {
  favorites: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("product_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Erro ao carregar favoritos:", error);
      setFavorites([]);
    } else {
      setFavorites((data ?? []).map((item) => item.product_id));
    }

    setLoading(false);
  }

  useEffect(() => {
    loadFavorites();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadFavorites();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function toggleFavorite(productId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const alreadyFavorite = favorites.includes(productId);

    if (alreadyFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) {
        console.error("Erro ao remover favorito:", error);
        return;
      }

      setFavorites((current) =>
        current.filter((id) => id !== productId)
      );

      return;
    }

    const { error } = await supabase.from("favorites").insert({
      user_id: user.id,
      product_id: productId,
    });

    if (error) {
      console.error("Erro ao adicionar favorito:", error);
      return;
    }

    setFavorites((current) => [...current, productId]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite: (productId) => favorites.includes(productId),
        toggleFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de FavoritesProvider"
    );
  }

  return context;
}
