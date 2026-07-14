import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileArchive,
  FileImage,
  FileText,
  LockKeyhole,
  MousePointerClick,
  ShieldCheck,
  Upload,
} from "lucide-react";

import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ToolGrid from "@/components/ToolGrid";

const steps = [
  {
    title: "Choose a PDF tool",
    description:
      "Select Merge PDF, Split PDF, Compress PDF or one of the available conversion tools.",
    icon: MousePointerClick,
  },
  {
    title: "Add your document",
    description:
      "Upload or drag your compatible files into the tool directly from your device.",
    icon: Upload,
  },
  {
    title: "Process and download",
    description:
      "Complete the required task and download the newly created document.",
    icon: Download,
  },
];

const popularTools = [
  {
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into one organized document.",
    href: "/merge-pdf",
    icon: FileText,
  },
  {
    title: "Split PDF",
    description:
      "Extract selected pages or separate a PDF into smaller files.",
    href: "/split-pdf",
    icon: FileText,
  },
  {
    title: "Compress PDF",
    description:
      "Reduce the size of compatible PDF files for easier sharing.",
    href: "/compress-pdf",
    icon: FileArchive,
  },
  {
    title: "JPG to PDF",
    description:
      "Convert compatible image files into a downloadable PDF.",
    href: "/jpg-to-pdf",
    icon: FileImage,
  },
  {
    title: "Word to PDF",
    description:
      "Convert compatible Word documents into PDF format.",
    href: "/word-to-pdf",
    icon: FileText,
  },
];

const faqItems = [
  {
    question: "Is SP PDF Tools free to use?",
    answer:
      "Yes. The currently available tools can be used without payment or account registration.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can open a tool and begin processing compatible documents without registering.",
  },
  {
    question: "Are my documents uploaded to a server?",
    answer:
      "Many available operations are performed directly inside your browser. Processing methods may vary between tools, so avoid using highly confidential files on any online service.",
  },
  {
    question: "Can I use the tools on a mobile phone?",
    answer:
      "The website is designed to work across modern desktop and mobile browsers. Large documents may process more smoothly on a computer with additional memory.",
  },
  {
    question: "Which PDF tools are available?",
    answer:
      "SP PDF Tools currently includes Merge PDF, Split PDF, Compress PDF, JPG to PDF and Word to PDF.",
  },
  {
    question: "Should I keep a backup of my original file?",
    answer:
      "Yes. Always keep an original backup of important documents before editing, converting or compressing them.",
  },
];

const trustItems = [
  "No registration required",
  "Responsive on mobile and desktop",
  "Clear and straightforward controls",
  "Privacy-focused document processing",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero />

      <ToolGrid />

      <section className="bg-slate-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              How it works
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Complete common PDF tasks in three simple steps
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              SP PDF Tools provides clear browser-based utilities designed to
              make document processing simple and accessible.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>

                  <span className="text-5xl font-bold text-slate-100">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Features />

      <section className="bg-slate-950 px-6 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-purple-200">
              <ShieldCheck className="h-4 w-4" />
              Privacy and security
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Manage documents with privacy in mind
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Many SP PDF Tools operations are completed directly inside your
              browser. This reduces the need to transfer files to a remote
              server and gives you greater control over your documents.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                  <span className="text-sm leading-6 text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5">
              <div className="flex items-start gap-3">
                <LockKeyhole className="mt-1 h-5 w-5 shrink-0 text-amber-300" />

                <p className="text-sm leading-7 text-amber-100">
                  Keep backup copies of important documents. Avoid processing
                  highly confidential files through any online service unless
                  you understand and accept the privacy implications.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <h3 className="text-2xl font-bold">Available PDF tools</h3>

            <p className="mt-3 leading-7 text-slate-400">
              Select a tool below and start working with your documents.
            </p>

            <div className="mt-7 space-y-4">
              {popularTools.map(
                ({ title, description, href, icon: Icon }) => (
                  <Link
                    key={title}
                    href={href}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-purple-400/50 hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30">
                      <Icon className="h-6 w-6 text-purple-300" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white">{title}</h4>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {description}
                      </p>
                    </div>

                    <ArrowRight className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-purple-300" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Frequently asked questions
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Questions about SP PDF Tools
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Learn more about file processing, privacy and supported devices.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition open:bg-white open:shadow-lg"
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-950">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}

                    <span className="text-2xl font-light text-purple-600 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-4 max-w-4xl leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-purple-400 hover:text-purple-700"
            >
              View all frequently asked questions
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label="Advertisement"
        className="bg-slate-50 px-6 py-10"
      >
        <div className="mx-auto flex min-h-28 max-w-7xl items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Advertisement space
          </p>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}