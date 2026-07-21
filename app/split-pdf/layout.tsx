import type { Metadata } from "next";

const SITE_URL = "https://sp-pdf-tools.vercel.app";

export const metadata: Metadata = {
  title: "Split PDF Online Free",
  description:
    "Split PDF files online for free. Extract individual pages or page ranges and download them together as a new PDF document.",
  keywords: [
    "split PDF",
    "split PDF online",
    "extract PDF pages",
    "separate PDF pages",
    "free PDF splitter",
    "PDF page extractor",
  ],
  alternates: {
    canonical: "/split-pdf",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/split-pdf`,
    siteName: "SP PDF Tools",
    title: "Split PDF Online Free | SP PDF Tools",
    description:
      "Extract selected pages and page ranges from a PDF directly in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online Free | SP PDF Tools",
    description:
      "Extract selected PDF pages and download them as a new document.",
  },
};

export default function SplitPdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}