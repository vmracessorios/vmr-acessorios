"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getProfiles,
  Profile,
} from "@/services/profiles";

export default function ClientesPage() {
  const [customers, setCustomers] =
    useState<Profile[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    setLoading(true);

    try {
      const data =
        await getProfiles();

      setCustomers(data);
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers =
    useMemo(() => {
      return customers.filter(
        (customer) => {
          return (
            (customer.full_name ?? "")
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            customer.email
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      );
    }, [customers, search]);
      if (loading) {
    return (
      <div className="p-8 text-center">
        Carregando clientes...
      </div>
    );
  }

  return (
    <main className="space-y-8">

      <div>

        <h1 className="text-3xl font-semibold">
          Clientes
        </h1>

        <p className="mt-2 text-neutral-500">
          Clientes cadastrados na VMR Acessórios.
        </p>

      </div>

      <div className="rounded-2xl border bg-white p-6">

        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="h-12 w-full rounded-xl border px-4"
        />

      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">

        <table className="w-full">

          <thead className="bg-neutral-50">

            <tr>

              <th className="p-4 text-left">
                Nome
              </th>

              <th className="p-4 text-left">
                E-mail
              </th>

              <th className="p-4 text-left">
                Telefone
              </th>

            </tr>

          </thead>

          <tbody>
                        {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="p-8 text-center text-neutral-500"
                >
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}

            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t"
              >
                <td className="p-4 font-medium">
                  {customer.full_name || "-"}
                </td>

                <td className="p-4">
                  {customer.email}
                </td>

                <td className="p-4">
                  {customer.phone || "-"}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
    