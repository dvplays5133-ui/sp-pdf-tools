import Link from "next/link";
import {
  ArrowLeft,
  Cookie,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    title: "Information we collect",
    icon: Database,
    content: [
      "SP PDF Tools does not require users to create an account to use the available tools.",
      "We may collect limited technical information such as browser type, device type, operating system, approximate location, pages visited and general usage data through analytics services.",
      "We do not intentionally collect sensitive personal information through the PDF tools.",
    ],
  },
  {
    title: "How files are processed",
    icon: LockKeyhole,
    content: [
      "Many tools on SP PDF Tools process files directly inside your browser.",
      "Where browser-based processing is used, files are not intentionally uploaded to our servers.",
      "Users should avoid uploading highly confidential, medical, financial, legal or identification documents unless they are comfortable using the selected tool.",
    ],
  },
  {
    title: "Analytics and cookies",
    icon: Cookie,
    content: [
      "We may use analytics services such as Google Analytics to understand website traffic and improve the user experience.",
      "Analytics services may use cookies or similar technologies to collect general usage information.",
      "You can control or disable cookies through your browser settings, although some website features may not work as expected.",
    ],
  },
  {
    title: "How information is used",
    icon: ShieldCheck,
    content: [
      "Technical and usage information may be used to maintain, secure and improve SP PDF Tools.",
      "We may use aggregated and non-personal information to identify errors, understand popular tools and improve website performance.",
      "We do not sell users' personal information.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 px-6 py-20 text-white sm:py-24">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-purple-200 backdrop-blur">
              Privacy and data protection
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This policy explains how SP PDF Tools handles website usage data,
              uploaded files and privacy-related information.
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Last updated: July 12, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
            <p className="text-base leading-8 text-slate-600">
              By using SP PDF Tools, you agree to the practices described in
              this Privacy Policy. Please stop using the website if you do not
              agree with this policy.
            </p>

            <div className="mt-10 space-y-8">
              {sections.map(({ title, icon: Icon, content }) => (
                <section key={title}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-950">
                      {title}
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-slate-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950">
                Third-party services
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                SP PDF Tools may use third-party services for website hosting,
                analytics, security and future advertising. These providers may
                process limited information according to their own privacy
                policies.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950">
                Data security
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We take reasonable steps to maintain the security of the
                website. However, no internet service, browser application or
                data transmission method can be guaranteed to be completely
                secure.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950">
                Children&apos;s privacy
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                SP PDF Tools is not intended to knowingly collect personal
                information from children. A parent or guardian should supervise
                use of the website where appropriate.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950">
                Changes to this policy
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                This Privacy Policy may be updated when the website, available
                tools, legal requirements or third-party services change. The
                updated date will appear near the top of this page.
              </p>
            </section>

            <section className="mt-10 rounded-2xl border border-purple-200 bg-purple-50 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-6 w-6 shrink-0 text-purple-700" />

                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    Privacy questions
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    For questions about this Privacy Policy, contact us through
                    the Contact page.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-4 inline-flex font-semibold text-purple-700 hover:underline"
                  >
                    Visit the Contact page
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>Reminder:</strong> Avoid processing highly sensitive or
            confidential files through any online service unless you fully
            understand and accept the privacy implications.
          </div>
        </div>
      </section>
    </main>
  );
}