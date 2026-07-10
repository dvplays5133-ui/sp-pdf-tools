import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "SP PDF Tools - Free Online PDF Tools",
    template: "%s | SP PDF Tools",
  },
  description:
    "Free online PDF tools to merge, split, compress, convert, rotate and manage PDF files securely in your browser.",
  keywords: [
    "PDF",
    "Merge PDF",
    "Split PDF",
    "Compress PDF",
    "PDF Tools",
    "Free PDF Tools",
    "Online PDF Editor",
  ],
  authors: [{ name: "SP PDF Tools" }],
  creator: "SP PDF Tools",
  publisher: "SP PDF Tools",

  openGraph: {
    title: "SP PDF Tools",
    description:
      "Fast, secure and free online PDF tools.",
    url: "https://sp-pdf-tools.vercel.app",
    siteName: "SP PDF Tools",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
