import Link from "next/link";
import {
  ArrowLeft,
  FileArchive,
  FileImage,
  FileText,
  Home,
  Scissors,
} from "lucide-react";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
    href: "/merge-pdf",
    icon: FileText,
  },
  {
    title: "Split PDF",
    description: "Separate selected pages from a PDF file.",
    href: "/split-pdf",
    icon: Scissors,
  },
  {
    title: "Compress PDF",
    description: "Reduce the size of compatible PDF documents.",
    href: "/compress-pdf",
    icon: FileArchive,
  },
  {
    title: "JPG to PDF",
    description: "Convert images into a downloadable PDF.",
    href: "/jpg-to-pdf",
    icon: FileImage,
  },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-600/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 text-3xl font-bold shadow-lg shadow-purple-950/40">
            SP
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
            Error 404
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Page not found
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            The page you requested may have been moved, deleted or entered
            incorrectly. Return to the homepage or continue with one of the PDF
            tools below.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Home className="h-5 w-5" />
              Go to homepage
            </Link>

            <Link
              href="/#tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/15"
            >
              <ArrowLeft className="h-5 w-5" />
              Explore PDF tools
            </Link>
          </div>
        </div>

        <section className="mt-10 w-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Popular PDF tools</h2>

            <p className="mt-3 text-slate-400">
              Continue working with one of the available tools.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-purple-400/50 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30">
                  <Icon className="h-6 w-6 text-purple-300" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-purple-300">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}