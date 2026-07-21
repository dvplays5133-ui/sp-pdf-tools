import type { Metadata } from "next";

const SITE_URL = "https://sp-pdf-tools.vercel.app";

export const metadata: Metadata = {
  title: "JPG to PDF Online Free",
  description:
    "Convert JPG images to PDF online for free. Merge multiple images into one PDF document quickly and securely.",
  keywords: [
    "JPG to PDF",
    "image to PDF",
    "convert JPG to PDF",
    "JPEG to PDF",
    "photo to PDF",
    "free JPG to PDF",
  ],
  alternates: {
    canonical: "/jpg-to-pdf",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/jpg-to-pdf`,
    siteName: "SP PDF Tools",
    title: "JPG to PDF Online Free | SP PDF Tools",
    description:
      "Convert JPG images into PDF documents directly in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Online Free | SP PDF Tools",
    description:
      "Convert images into PDF documents online for free.",
  },
};

export default function JpgToPdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}