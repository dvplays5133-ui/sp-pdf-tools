import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Online Free | SP PDF Tools",
  description:
    "Merge multiple PDF files online for free. Combine PDFs securely inside your browser with SP PDF Tools.",
  alternates: {
    canonical: "/merge-pdf",
  },
  openGraph: {
    title: "Merge PDF Online Free | SP PDF Tools",
    description:
      "Merge multiple PDF files online for free. Combine PDFs securely inside your browser.",
    url: "https://sp-pdf-tools.vercel.app/merge-pdf",
    type: "website",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}