import Link from "next/link";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute right-[-8%] bottom-10 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur">
          <FileQuestion className="h-10 w-10 text-purple-300" />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">
          The page you requested does not exist, may have been moved, or the
          address may be incorrect.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-950/40 transition hover:-translate-y-0.5"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>

          <Link
            href="/#tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            <ArrowLeft className="h-5 w-5" />
            View PDF Tools
          </Link>
        </div>
      </div>
    </main>
  );
}