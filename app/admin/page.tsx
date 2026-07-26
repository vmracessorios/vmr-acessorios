export default function AdminDashboard() {
  return (
    <div>

      <h1 className="text-3xl font-semibold text-neutral-900">
        Dashboard
      </h1>

      <p className="mt-2 text-neutral-500">
        Bem-vindo ao painel administrativo da VMR Acessórios.
      </p>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <p className="text-neutral-500">
            Produtos
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <p className="text-neutral-500">
            Categorias
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <p className="text-neutral-500">
            Pedidos
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <p className="text-neutral-500">
            Clientes
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            0
          </h2>
        </div>

      </div>

    </div>
  );
}