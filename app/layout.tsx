import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "./context/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const META_PIXEL_ID = "1524983748727453";

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://www.henriqueantony.com.br/"),
  title: {
    default: "Henrique Antony | Web Developer Portfolio",
    template: "%s | Henrique Antony",
  },
  description:
    "Henrique Antony é um desenvolvedor web brasileiro especializando-se em builds performantes e amigáveis ao SEO com React e Next.js. Explore projetos selecionados, habilidades e detalhes de contato.",
  keywords: [
    "Henrique Antony",
    "web developer",
    "Next.js developer",
    "React developer",
    "frontend engineer",
    "South Africa developer",
    "portfolio",
  ],
  authors: [{ name: "Henrique Antony" }],
  creator: "Henrique Antony",
  publisher: "Henrique Antony",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Henrique Antony | Web Developer Portfolio",
    description:
      "Explore Henrique Antony's selected work, technical skills, and contact details for collaboration on performant web experiences.",
    url: "https://www.henriqueantony.com.br/",
    siteName: "Henrique Antony Portfolio",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image-1200x630.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Antony | Web Developer Portfolio",
    description:
      "A frontend developer from South Africa building fast, accessible, SEO-ready React and Next.js products.",
    images: ["/og-image-1200x600.jpg"],
    creator: "@HenriqueAntony",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="VqZgBZPUnVZWGmKd7QTkznbrs0ClrxODP13ot0sRP5Q"
        />
        <meta name="theme-color" content="#25292e" />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://vitals.vercel-insights.com"
          crossOrigin="anonymous"
        />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="16x16 32x32" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* GA4 + Google Ads (gtag) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17828795650"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;

            gtag('js', new Date());

            // GA4
            gtag('config', 'G-6PH3GS6DSK');

            // Google Ads
            gtag('config', 'AW-17828795650');

            // Conversão (snippet)
            window.gtag_report_conversion = function(url) {
              // (Opcional) também conta no Meta Pixel quando houver clique no WhatsApp
              if (typeof window.fbq === 'function') {
                window.fbq('track', 'Contact');
                // ou, se preferir:
                // window.fbq('trackCustom', 'WhatsAppClick');
              }

              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };

              gtag('event', 'conversion', {
                'send_to': 'AW-17828795650/_XXeCMCXitkbEIKqt7VC',
                'event_callback': callback
              });

              return false;
            }
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* End Meta Pixel Code */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Henrique Antony",
                jobTitle: "Web Developer",
                url: "https://henriqueantony.com.br/",
                image: "https://henriqueantony.com.br/og-image-1200x630.jpg",
                sameAs: [
                  "https://www.linkedin.com/in/henrique-antony-8574a3171/",
                  "https://github.com/HenriqueAntony07",
                  "mailto:henriqueantony@gmail.com",
                ],
                knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
                worksFor: {
                  "@type": "Organization",
                  name: "Natmed Medical Defence",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Portfolio",
                url: "https://henriqueantony.com.br/",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://henriqueantony.com.br/?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]).replace(/</g, "\\u003c"),
          }}
        />

        {/* Set theme from localStorage or system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const stored = localStorage.getItem('theme');
                const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = stored === 'light' || stored === 'dark' ? stored : systemPref;
                const root = document.documentElement;
                root.dataset.theme = theme;
                if (theme === 'dark') root.classList.add('dark');
                else root.classList.remove('dark');
              } catch (e) {}
            })();`,
          }}
        />
      </head>

      <body className={`${geist.className} ${geist.variable}`}>
        {/* Meta Pixel (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />

        <FloatingWhatsApp
          phoneE164="5548999362572"
          brand="Henrique Antony"
          contactSectionId="contact"
        />

        <ScrollToTop />
      </body>
    </html>
  );
}
