import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

const benefits = [
  "No registration required",
  "Files processed securely",
  "Works on mobile and desktop",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 pb-24 pt-20 text-white sm:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute right-[-8%] top-28 h-80 w-80 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute bottom-[-15%] left-1/3 h-72 w-72 rounded-full bg-pink-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
            <Sparkles className="h-4 w-4 text-purple-300" />
            Fast, secure and completely free
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Powerful tools for every{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              PDF task
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Merge, split, compress, convert, rotate and manage PDF files
            directly in your browser. Simple tools with no complicated setup.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-950/40 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore PDF Tools
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/merge-pdf"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              <FileText className="h-5 w-5" />
              Merge PDF
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:flex-wrap">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="rounded-2xl border border-dashed border-white/25 bg-slate-900/70 px-6 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
                <Upload className="h-8 w-8 text-white" />
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Choose a PDF tool to get started
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                Your documents are processed securely. Most tools work directly
                inside your browser.
              </p>

              <Link
                href="#tools"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                View all tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold">Secure</p>
                  <p className="text-xs text-slate-400">Privacy focused</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
                <LockKeyhole className="h-6 w-6 text-blue-400" />
                <div>
                  <p className="text-sm font-semibold">Private</p>
                  <p className="text-xs text-slate-400">No account needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}