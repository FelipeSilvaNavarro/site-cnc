import Script from "next/script";
import { ADS_ID, CHAVE_CONSENTIMENTO, GA_ID, medicaoAtiva } from "@/lib/analytics";

/**
 * Carrega o gtag uma única vez para GA4 e Google Ads.
 *
 * Server Component: só emite as tags, não precisa de estado. Sem os IDs em
 * variável de ambiente nada é injetado, então a página continua limpa em
 * desenvolvimento e em prévia.
 *
 * `afterInteractive` é o certo aqui: medição não é crítica para renderizar e
 * não pode competir com a fonte e a imagem do topo, que são o que a pessoa
 * vinda de anúncio espera ver.
 */
export default function Analytics() {
  if (!medicaoAtiva) return null;

  const idPrincipal = GA_ID || ADS_ID;

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${idPrincipal}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          // Consent Mode v2: tudo negado até a pessoa escolher no aviso de
          // cookies. Sem consentimento o Google só recebe sinal sem cookie,
          // e a escolha salva em visita anterior libera antes do config.
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('${CHAVE_CONSENTIMENTO}') === 'aceito') {
              gtag('consent', 'update', {
                ad_storage: 'granted',
                analytics_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
            }
          } catch (e) {}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
