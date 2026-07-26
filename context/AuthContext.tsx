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

      setUser(session?.user ?? null);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
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
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

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
    const { error } = await supabase.auth.signUp({
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