import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Globe2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const values = [
  {
    title: "Simple to use",
    description:
      "Our tools are designed to help users complete common PDF tasks without complicated software or technical knowledge.",
    icon: Sparkles,
  },
  {
    title: "Privacy focused",
    description:
      "Where possible, documents are processed directly in the browser so users retain greater control over their files.",
    icon: LockKeyhole,
  },
  {
    title: "Fast and accessible",
    description:
      "SP PDF Tools works on modern desktop and mobile browsers without requiring account registration.",
    icon: Zap,
  },
  {
    title: "Available worldwide",
    description:
      "Our online document utilities are designed for individuals, students, professionals and businesses around the world.",
    icon: Globe2,
  },
];

const availableTools = [
  "Merge multiple PDF documents",
  "Split PDF files into smaller documents",
  "Optimize and compress PDF structure",
  "Convert JPG and PNG images into PDF",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FileText className="h-5 w-5 text-purple-600" />
            About SP PDF Tools
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 px-6 py-20 text-white sm:py-24">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-purple-200 backdrop-blur">
              About our platform
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple online tools for everyday PDF work
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              SP PDF Tools provides free and easy-to-use document utilities for
              merging, splitting, compressing and converting PDF files directly
              from a modern web browser.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                Our mission
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Making document tasks easier for everyone
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Many people need to manage PDF documents but do not want to
                install expensive or complicated desktop software. SP PDF Tools
                was created to provide straightforward online utilities that
                work quickly and clearly.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Our goal is to continue improving the platform with useful,
                secure and accessible tools while keeping the experience simple
                for everyday users.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-950">
                What you can do with SP PDF Tools
              </h2>

              <div className="mt-6 space-y-4">
                {availableTools.map((tool) => (
                  <div key={tool} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="text-sm leading-6 text-slate-600">{tool}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/#tools"
                className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Explore PDF tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Our values
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built around simplicity, speed and privacy
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-purple-700 to-blue-700 px-8 py-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold">Need help using SP PDF Tools?</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-purple-100">
            Visit our contact page to report a problem, share feedback or ask a
            question about the website.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-slate-100"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}