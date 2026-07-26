import { supabase } from "@/lib/supabase";

export default async function Teste() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  return (
    <pre style={{ whiteSpace: "pre-wrap", padding: 20 }}>
      {JSON.stringify({ data, error }, null, 2)}
    </pre>
  );
}