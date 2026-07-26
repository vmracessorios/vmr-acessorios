import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F7F8] flex">

      <Sidebar />

      <main className="flex-1 flex flex-col">

        <Header />

        <div className="flex-1 p-8">
          {children}
        </div>

      </main>

    </div>
  );
}