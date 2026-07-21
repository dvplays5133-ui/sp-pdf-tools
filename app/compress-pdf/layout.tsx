import type { Metadata } from "next";

const SITE_URL = "https://sp-pdf-tools.vercel.app";

export const metadata: Metadata = {
  title: "Compress PDF Online Free",
  description:
    "Compress PDF files online for free. Reduce PDF file size while maintaining document quality. Fast, secure and browser-based PDF compression.",
  keywords: [
    "compress PDF",
    "reduce PDF size",
    "PDF compressor",
    "compress PDF online",
    "free PDF compressor",
    "optimize PDF",
  ],
  alternates: {
    canonical: "/compress-pdf",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/compress-pdf`,
    siteName: "SP PDF Tools",
    title: "Compress PDF Online Free | SP PDF Tools",
    description:
      "Reduce PDF file size quickly and securely directly in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online Free | SP PDF Tools",
    description:
      "Compress PDF documents online without installing any software.",
  },
};

export default function CompressPdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}