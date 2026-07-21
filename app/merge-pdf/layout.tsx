import type { Metadata } from "next";

const SITE_URL = "https://sp-pdf-tools.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Merge PDF Online Free | SP PDF Tools",

  description:
    "Merge multiple PDF files into one document online for free. Combine PDF files quickly, securely and directly in your browser.",

  keywords: [
    "merge PDF",
    "combine PDF",
    "merge PDF online",
    "combine PDF files",
    "free PDF merger",
    "online PDF merger",
    "SP PDF Tools",
  ],

  alternates: {
    canonical: "/merge-pdf",
  },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/merge-pdf`,
    siteName: "SP PDF Tools",
    title: "Merge PDF Online Free | SP PDF Tools",
    description:
      "Combine multiple PDF files into one document securely in your browser.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Online Free | SP PDF Tools",
    description:
      "Merge multiple PDF documents quickly and securely online.",
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
};

export default function MergePdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}