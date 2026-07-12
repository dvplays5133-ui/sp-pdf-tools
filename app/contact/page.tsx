import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  FileText,
  HelpCircle,
  Mail,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

const contactOptions = [
  {
    title: "General support",
    description:
      "Ask questions about using SP PDF Tools or report an issue with the website.",
    icon: HelpCircle,
    email: "support@sp-pdf-tools.com",
  },
  {
    title: "Feedback and suggestions",
    description:
      "Share ideas for improvements, new features or better user experience.",
    icon: MessageSquareText,
    email: "support@sp-pdf-tools.com",
  },
  {
    title: "Privacy questions",
    description:
      "Contact us regarding file processing, privacy or data protection.",
    icon: ShieldCheck,
    email: "support@sp-pdf-tools.com",
  },
];

export default function ContactPage() {
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
            Contact SP PDF Tools
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 px-6 py-20 text-white sm:py-24">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-purple-200 backdrop-blur">
              Contact us
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              How can we help?
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Contact SP PDF Tools to report a problem, ask a question or share
              feedback about our online document utilities.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {contactOptions.map(
              ({ title, description, icon: Icon, email }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-950">
                    {title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {description}
                  </p>

                  <a
                    href={`mailto:${email}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-700 transition hover:text-purple-900"
                  >
                    <Mail className="h-4 w-4" />
                    {email}
                  </a>
                </div>
              )
            )}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">
                Send us an email
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Include a clear description of the issue, the tool you were
                using and any relevant error message. Please do not send
                confidential documents or sensitive personal information.
              </p>

              <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-6 w-6 shrink-0 text-purple-700" />

                  <div>
                    <p className="font-bold text-slate-950">
                      Primary support email
                    </p>

                    <a
                      href="mailto:support@sp-pdf-tools.com"
                      className="mt-2 inline-block text-purple-700 hover:underline"
                    >
                      support@sp-pdf-tools.com
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="mailto:support@sp-pdf-tools.com?subject=SP%20PDF%20Tools%20Support"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                <Mail className="h-5 w-5" />
                Open email application
              </a>
            </div>

            <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-8">
              <Clock3 className="h-8 w-8 text-purple-400" />

              <h2 className="mt-5 text-2xl font-bold">Response time</h2>

              <p className="mt-4 leading-7 text-slate-300">
                We aim to review genuine support requests as soon as reasonably
                possible. Response times may vary depending on the nature and
                volume of enquiries.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">
                  Before contacting us
                </p>

                <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                  <li>• Refresh the page and try again.</li>
                  <li>• Check that the selected file is supported.</li>
                  <li>• Try a smaller or non-password-protected document.</li>
                  <li>• Use an updated browser such as Chrome or Edge.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>Important:</strong> Never email passwords, identification
            documents, banking records, medical records or other confidential
            files. Describe the issue without attaching sensitive content.
          </div>
        </div>
      </section>
    </main>
  );
}