"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  firstName: string;
  fullName: string;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    error: string | null;
  }>;
  signUp: (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<{
    error: string | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("SESSION AO CARREGAR:", session);

      setUser(session?.user ?? null);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AUTH EVENT:", event);
        console.log("AUTH SESSION:", session);

        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(
    email: string,
    password: string
  ) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log("SIGNIN DATA:", data);
    console.log("SIGNIN ERROR:", error);

    if (error) {
      return {
        error: error.message,
      };
    }

    return {
      error: null,
    };
  }

  async function signUp(
    name: string,
    lastName: string,
    email: string,
    password: string
  ) {
    console.log("==================================");
    console.log("INICIANDO CADASTRO");
    console.log("==================================");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          lastName,
          fullName: `${name} ${lastName}`,
        },
      },
    });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP USER:", data?.user);
    console.log("SIGNUP SESSION:", data?.session);
    console.log("SIGNUP ERROR:", error);

    if (error) {
      return {
        error: error.message,
      };
    }

    return {
      error: null,
    };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  const firstName =
    (user?.user_metadata?.name as string) ?? "";

  const fullName =
    (user?.user_metadata?.fullName as string) ?? "";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        firstName,
        fullName,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}