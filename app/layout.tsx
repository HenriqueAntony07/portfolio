import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "./context/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://chad-probert-portfolio.vercel.app"),
  title: {
    default: "Chad Probert | Web Developer Portfolio",
    template: "%s | Chad Probert",
  },
  description:
    "Chad Probert is a web developer based in South Africa specialising in performant, SEO-friendly React and Next.js builds. Explore selected projects, skills, and contact details.",
  keywords: [
    "Chad Probert",
    "web developer",
    "Next.js developer",
    "React developer",
    "frontend engineer",
    "South Africa developer",
    "portfolio",
  ],
  authors: [{ name: "Chad Probert" }],
  creator: "Chad Probert",
  publisher: "Chad Probert",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Chad Probert | Web Developer Portfolio",
    description:
      "Explore Chad Probert's selected work, technical skills, and contact details for collaboration on performant web experiences.",
    url: "https://chad-probert-portfolio.vercel.app",
    siteName: "Chad Probert Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image-1200x630.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chad Probert | Web Developer Portfolio",
    description:
      "A frontend developer from South Africa building fast, accessible, SEO-ready React and Next.js products.",
    images: ["/og-image-1200x600.jpg"],
    creator: "@ChadProbert",
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
        <meta name="theme-color" content="#25292e" />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://vitals.vercel-insights.com"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
          sizes="16x16 32x32"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Chad Probert",
                jobTitle: "Web Developer",
                url: "https://chad-probert-portfolio.vercel.app/",
                image: "https://chad-probert-portfolio.vercel.app/og-image-1200x630.jpg",
                sameAs: [
                  "https://www.linkedin.com/in/chad-probert-6421b321b/",
                  "https://github.com/ChadProbert",
                  "mailto:chadcprobert@gmail.com",
                ],
                knowsAbout: [
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                ],
                worksFor: {
                  "@type": "Organization",
                  name: "Natmed Medical Defence",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Chad Probert Portfolio",
                url: "https://chad-probert-portfolio.vercel.app/",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://chad-probert-portfolio.vercel.app/?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]).replace(/</g, "\\u003c"),
          }}
        />{/* Set theme from localStorage or system preference. Although dangerouslySetInnerHTML is not recommended, 
        it is the recommended way to set the theme in this case. The practice is safe when the injected code is static
        and does not contain any user-provided data. */}
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
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
