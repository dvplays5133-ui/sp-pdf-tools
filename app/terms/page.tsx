import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions for using SP PDF Tools and our online PDF services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">

        <h1 className="text-4xl font-bold mb-8">
          Terms & Conditions
        </h1>

        <p className="text-slate-300 mb-8">
          Last Updated: July 2026
        </p>

        <div className="space-y-10 text-slate-300 leading-8">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using SP PDF Tools, you agree to comply with
              these Terms & Conditions. If you do not agree, please discontinue
              using our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Use of Services
            </h2>
            <p>
              SP PDF Tools provides free online PDF utilities including merging,
              splitting, compressing and converting PDF files. You agree to use
              these services only for lawful purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Privacy
            </h2>
            <p>
              Your uploaded files are processed securely. We do not intentionally
              store personal files longer than necessary for processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Intellectual Property
            </h2>
            <p>
              All website content including design, branding and source code
              belongs to SP PDF Tools unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Disclaimer
            </h2>
            <p>
              The services are provided "as is" without warranties of any kind.
              We are not responsible for any direct or indirect damages arising
              from the use of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Changes
            </h2>
            <p>
              We may update these Terms & Conditions at any time. Continued use
              of the website constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Contact
            </h2>
            <p>
              For questions regarding these Terms & Conditions, please visit our
              Contact page.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}