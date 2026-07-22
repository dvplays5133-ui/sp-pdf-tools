import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://sp-pdf-tools.vercel.app";
const GA_MEASUREMENT_ID = "G-WPZ4ZGKSHV";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "SP PDF Tools",

  title: {
    default: "SP PDF Tools - Free Online PDF Tools",
    template: "%s | SP PDF Tools",
  },

  description:
    "Free online PDF tools to merge, split, compress and convert PDF files directly in your browser. Fast, simple and privacy-focused.",

  keywords: [
    "PDF tools",
    "free PDF tools",
    "online PDF tools",
    "merge PDF",
    "split PDF",
    "compress PDF",
    "JPG to PDF",
    "Word to PDF",
    "PDF converter",
    "manage PDF files",
    "browser PDF tools",
  ],

  authors: [
    {
      name: "SP PDF Tools",
      url: SITE_URL,
    },
  ],

  creator: "SP PDF Tools",
  publisher: "SP PDF Tools",
  category: "technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "SP PDF Tools",
    title: "SP PDF Tools - Free Online PDF Tools",
    description:
      "Merge, split, compress and convert PDF files online with simple, fast and privacy-focused tools.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "SP PDF Tools - Free Online PDF Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SP PDF Tools - Free Online PDF Tools",
    description:
      "Merge, split, compress and convert PDF files directly in your browser.",
    images: ["/og-image.svg"],
  },

  verification: {
    google: "rsModnJuDIpr6qpvhD_DvlQLDQ0XT7hsR84aevJTRUM",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
other: {
  "google-adsense-account": "ca-pub-5202287028759005",
},
  manifest: "/manifest.json",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SP PDF Tools",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE_URL}/contact`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5202287028759005"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(organizationSchema)}
        </Script>

        {children}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <Analytics />
      </body>
    </html>
  );
}