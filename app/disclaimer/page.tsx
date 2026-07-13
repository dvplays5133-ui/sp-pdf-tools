import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the disclaimer for using SP PDF Tools and understand the limitations of our online PDF services.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">

        <h1 className="text-4xl font-bold mb-8">
          Disclaimer
        </h1>

        <p className="text-slate-300 mb-8">
          Last Updated: July 2026
        </p>

        <div className="space-y-10 text-slate-300 leading-8">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              General Information
            </h2>
            <p>
              SP PDF Tools provides free online PDF utilities for educational,
              personal, and business use. The information and services on this
              website are provided in good faith for general purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              No Warranty
            </h2>
            <p>
              We make no warranties regarding the completeness, reliability,
              accuracy, or availability of our services. Your use of this website
              is entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              File Processing
            </h2>
            <p>
              Although we strive to process files securely and accurately, we
              cannot guarantee that every uploaded document will be processed
              without errors. Always keep a backup of important files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              External Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the content, privacy policies, or practices of
              those external websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Limitation of Liability
            </h2>
            <p>
              SP PDF Tools shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from the use or
              inability to use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Contact
            </h2>
            <p>
              If you have any questions regarding this Disclaimer, please visit
              our Contact page.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}