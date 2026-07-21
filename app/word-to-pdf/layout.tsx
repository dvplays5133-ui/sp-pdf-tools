import type { Metadata } from "next";

const SITE_URL = "https://sp-pdf-tools.vercel.app";

export const metadata: Metadata = {
  title: "Word to PDF Online Free",
  description:
    "Convert Microsoft Word documents to PDF online for free. Fast, secure and browser-based Word to PDF conversion.",
  keywords: [
    "Word to PDF",
    "DOCX to PDF",
    "DOC to PDF",
    "convert Word to PDF",
    "Word converter",
    "free Word to PDF",
  ],
  alternates: {
    canonical: "/word-to-pdf",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/word-to-pdf`,
    siteName: "SP PDF Tools",
    title: "Word to PDF Online Free | SP PDF Tools",
    description:
      "Convert Word documents into PDF files online in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF Online Free | SP PDF Tools",
    description:
      "Free online Word to PDF converter.",
  },
};

export default function WordToPdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}