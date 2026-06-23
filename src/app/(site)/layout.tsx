import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/**
 * Layout do site institucional. Envolve todas as páginas públicas com header,
 * footer e o botão flutuante de WhatsApp.
 *
 * A futura área logada fica em outro route group — (area-cliente) — com layout
 * próprio e isolado, sem este header/footer. // FUTURO: ver (area-cliente).
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Link de pular para o conteúdo (acessibilidade / teclado). */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
