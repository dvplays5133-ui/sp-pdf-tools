import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Combine,
  FileArchive,
  ImagePlus,
  LockKeyhole,
  Scissors,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";

const benefits = [
  "No registration required",
  "Browser-based processing",
  "Works on mobile and desktop",
];

const availableTools = [
  {
    title: "Merge PDF",
    description: "Combine PDF files",
    href: "/merge-pdf",
    icon: Combine,
  },
  {
    title: "Split PDF",
    description: "Separate PDF pages",
    href: "/split-pdf",
    icon: Scissors,
  },
  {
    title: "Compress PDF",
    description: "Optimize PDF files",
    href: "/compress-pdf",
    icon: FileArchive,
  },
  {
    title: "JPG to PDF",
    description: "Convert images to PDF",
    href: "/jpg-to-pdf",
    icon: ImagePlus,
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 px-6 pb-24 pt-20 text-white sm:pb-28 sm:pt-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.20),transparent_32%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(219,39,119,0.12),transparent_35%)]" />

        <div className="absolute left-[-8%] top-16 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-18%] left-1/3 h-72 w-72 rounded-full bg-pink-600/15 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-400/10 px-4 py-2 text-sm font-medium text-purple-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-purple-300" />
            Free online PDF tools for everyday work
          </div>

          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Manage your documents with{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              fast and simple PDF tools
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Merge, split, optimize and convert documents directly from your
            browser. SP PDF Tools is designed to make common PDF tasks easy,
            private and accessible on every device.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#tools"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-purple-950/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Explore all tools
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/merge-pdf"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition duration-300 hover:border-white/30 hover:bg-white/15"
            >
              <Combine className="h-5 w-5 text-purple-300" />
              Merge PDF now
            </Link>
          </div>

          <div className="mt-9 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
              <p className="text-xl font-bold text-white">4</p>
              <p className="mt-1 text-xs text-slate-400">Working tools</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
              <p className="text-xl font-bold text-white">Free</p>
              <p className="mt-1 text-xs text-slate-400">No subscription</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
              <p className="text-xl font-bold text-white">Private</p>
              <p className="mt-1 text-xs text-slate-400">Browser focused</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
              <p className="text-xl font-bold text-white">Fast</p>
              <p className="mt-1 text-xs text-slate-400">Simple workflow</p>
            </div>
          </div>
        </div>

        {/* Right tool panel */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-blue-600/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-semibold text-white">
                  Choose a PDF tool
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Start processing your document
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-950/40">
                <Upload className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {availableTools.map(
                ({ title, description, href, icon: Icon }) => (
                  <Link
                    key={title}
                    href={href}
                    className="group rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-purple-400/40 hover:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/80 to-blue-600/80 text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-purple-300" />
                    </div>

                    <h2 className="mt-4 text-sm font-bold text-white">
                      {title}
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {description}
                    </p>
                  </Link>
                )
              )}
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-slate-900/50 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Upload className="h-6 w-6 text-purple-300" />
              </div>

              <p className="mt-4 text-sm font-semibold text-white">
                Select a tool, then upload your file
              </p>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-400">
                Most document processing happens locally in your browser for
                better privacy and control.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                <ShieldCheck className="mx-auto h-5 w-5 text-emerald-400" />
                <p className="mt-2 text-xs font-semibold text-white">Secure</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                <LockKeyhole className="mx-auto h-5 w-5 text-blue-400" />
                <p className="mt-2 text-xs font-semibold text-white">Private</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                <Zap className="mx-auto h-5 w-5 text-amber-400" />
                <p className="mt-2 text-xs font-semibold text-white">Fast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}