import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] px-6 py-32">
      <div className="mx-auto max-w-4xl">

        {/* CABEÇALHO */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#C8A96A]">
            VMR Acessórios
          </p>

          <h1 className="text-3xl font-light uppercase tracking-[3px] md:text-4xl">
            Política de Privacidade
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C8A96A]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500">
            A VMR Acessórios valoriza a privacidade, a segurança e a
            transparência no tratamento das informações de seus clientes.
          </p>
        </div>

        {/* CONTEÚDO */}
        <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">

          <section>
            <h2 className="text-xl font-medium">
              1. Sobre esta política
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Esta Política de Privacidade explica como a VMR Acessórios
              trata as informações fornecidas pelos usuários durante a
              navegação e utilização da nossa loja virtual.
            </p>

            <p className="mt-4 leading-7 text-neutral-600">
              Nosso objetivo é oferecer uma experiência segura, transparente
              e adequada às necessidades dos nossos clientes.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              2. Informações que podemos coletar
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Dependendo da utilização da loja, poderão ser solicitadas
              informações necessárias para identificação, contato,
              processamento de pedidos e atendimento ao cliente.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-neutral-600">
              <li>Nome e informações de contato;</li>
              <li>Endereço para entrega dos pedidos;</li>
              <li>Informações relacionadas aos pedidos realizados;</li>
              <li>Dados necessários para atendimento e suporte;</li>
              <li>Informações fornecidas voluntariamente pelo usuário.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              3. Finalidade do uso das informações
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              As informações fornecidas poderão ser utilizadas para
              possibilitar a compra e entrega dos produtos, prestar
              atendimento, acompanhar pedidos e melhorar a experiência
              oferecida pela VMR Acessórios.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              4. Pagamentos
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Os pagamentos realizados através da loja são processados por
              serviços especializados de pagamento. A VMR Acessórios não
              solicita nem armazena diretamente dados completos de cartão
              de crédito dos clientes.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              5. Compartilhamento de informações
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Quando necessário para a realização do pedido, algumas
              informações poderão ser compartilhadas com empresas e
              prestadores envolvidos no processamento do pagamento, envio,
              entrega e funcionamento da loja.
            </p>

            <p className="mt-4 leading-7 text-neutral-600">
              Essas informações serão utilizadas exclusivamente para as
              finalidades relacionadas à prestação dos serviços necessários
              ao funcionamento da loja.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              6. Segurança
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Adotamos medidas técnicas e organizacionais destinadas a
              proteger as informações contra acessos não autorizados,
              utilização indevida, alteração ou divulgação indevida.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              7. Cookies e tecnologias semelhantes
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              A loja poderá utilizar cookies e tecnologias semelhantes para
              melhorar a navegação, manter funcionalidades essenciais e
              compreender como os usuários utilizam o site.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              8. Direitos do usuário
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              O usuário poderá solicitar informações sobre o tratamento de
              seus dados e, quando aplicável, exercer os direitos previstos
              na legislação de proteção de dados.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              9. Contato
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Para dúvidas, solicitações ou assuntos relacionados à
              privacidade, entre em contato com a VMR Acessórios através
              da nossa página de contato.
            </p>

            <Link
              href="/contato"
              className="mt-5 inline-flex text-sm font-medium text-[#C8A96A] transition hover:underline"
            >
              Falar com a VMR →
            </Link>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium">
              10. Atualizações desta política
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Esta política poderá ser atualizada sempre que necessário para
              refletir alterações nos serviços, nas práticas da VMR
              Acessórios ou nas exigências aplicáveis.
            </p>
          </section>

          {/* VOLTAR */}
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