import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TrocasEDevolucoesPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-4xl">

        {/* CABEÇALHO */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>

          <h1 className="text-3xl font-light uppercase tracking-[3px] md:text-4xl">
            Trocas e Devoluções
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C8A96A]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500">
            Queremos que sua experiência com a VMR Acessórios seja
            tranquila, segura e especial. Confira abaixo as orientações
            para trocas e devoluções.
          </p>
        </div>

        {/* CONTEÚDO */}
        <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-medium">
              1. Nossa política
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              A VMR Acessórios busca oferecer produtos de qualidade e uma
              experiência de compra segura e transparente. Caso seja
              necessário solicitar uma troca ou devolução, entre em contato
              conosco para receber as orientações adequadas ao seu pedido.
            </p>
          </section>

          {/* 2 */}
          <section className="mt-10">
            <h2 className="text-xl font-medium">
              2. Solicitação de troca ou devolução
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              A solicitação deverá ser realizada através dos nossos canais
              oficiais de atendimento, informando os dados do pedido e o
              motivo da solicitação.
            </p>

            <p className="mt-4 leading-7 text-neutral-600">
              Nossa equipe analisará a solicitação e informará os próximos
              passos para que o procedimento seja realizado da forma
              adequada.
            </p>
          </section>

          {/* 3 */}
          <section className="mt-10">
            <h2 className="text-xl font-medium">
              3. Condições do produto
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Para que uma troca ou devolução possa ser analisada, o produto
              deverá ser encaminhado nas condições adequadas, acompanhado
              dos itens e acessórios que tenham sido enviados junto com o
              pedido.
            </p>

            <p className="mt-4 leading-7 text-neutral-600">
              Produtos que apresentem sinais de uso inadequado, alterações,
              danos provocados pelo cliente ou outras condições que
              comprometam a análise poderão estar sujeitos à avaliação
              específica.
            </p>
          </section>

          {/* 4 */}
          <section className="mt-10">
            <h2 className="text-xl font-medium">
              4. Produto com defeito
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Caso o produto apresente algum defeito, entre em contato com
              a VMR Acessórios assim que identificar o problema.
            </p>

            <p className="mt-4 leading-7 text-neutral-600">
              A situação será analisada pela nossa equipe e, quando
              aplicável, serão fornecidas as orientações para troca,
              reparo ou outra solução adequada.
            </p>
          </section>

          {/* 5 */}
          <section className="mt-10">
            <h2 className="text-xl font-medium">
              5. Devolução
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Caso seja necessária a devolução de um produto, nossa equipe
              informará o procedimento e as orientações de envio após o
              recebimento da solicitação.
            </p>
          </section>

          {/* 6 */}
          <section className="mt-10">
            <h2 className="text-xl font-medium">
              6. Reembolso
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Quando houver direito ao reembolso, o procedimento será
              realizado de acordo com a forma de pagamento utilizada no
              pedido e após a conclusão da análise correspondente.
            </p>
          </section>

          {/* 7 */}
          <section className="mt-10">
            <h2 className="text-xl font-medium">
              7. Como entrar em contato
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Para solicitar uma troca, devolução ou esclarecer qualquer
              dúvida relacionada ao seu pedido, entre em contato com a VMR
              Acessórios através da nossa página de contato.
            </p>

            <Link
              href="/contato"
              className="mt-5 inline-flex text-sm font-medium text-[#C8A96A] transition hover:underline"
            >
              Falar com a VMR →
            </Link>
          </section>

          {/* 8 */}
          <section className="mt-10">
            <h2 className="text-xl font-medium">
              8. Importante
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              As condições específicas aplicáveis a cada solicitação serão
              informadas pela nossa equipe de atendimento, considerando o
              pedido realizado e a situação apresentada pelo cliente.
            </p>

            <p className="mt-4 leading-7 text-neutral-600">
              Esta página poderá ser atualizada para refletir a política
              comercial definitiva da VMR Acessórios.
            </p>
          </section>

          {/* VOLTAR PARA A LOJA */}
          <div className="mt-14 border-t border-neutral-100 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-[#C8A96A] transition hover:opacity-80"
            >
              <ArrowLeft size={16} />
              Voltar para a loja
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}