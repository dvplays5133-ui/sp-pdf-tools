import { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "FAQ | SP PDF Tools",
  description:
    "Frequently asked questions about SP PDF Tools including security, privacy, supported browsers, file limits and PDF processing.",
};

const faqs = [
  {
    question: "Is SP PDF Tools free to use?",
    answer:
      "Yes. All current tools are completely free and can be used without creating an account.",
  },
  {
    question: "Are my PDF files uploaded to your servers?",
    answer:
      "Most tools process files directly inside your browser whenever possible. Your files remain private and are not permanently stored.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "SP PDF Tools works with Chrome, Edge, Firefox and Safari on desktop and mobile devices.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Large PDF files depend on your browser's available memory. Most common PDF documents work without issues.",
  },
  {
    question: "Can I use SP PDF Tools on mobile?",
    answer:
      "Yes. All tools are responsive and work on Android phones, iPhones and tablets.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. Everything runs online in your browser. No installation is required.",
  },
  {
    question: "Which PDF tools are currently available?",
    answer:
      "Currently available tools include Merge PDF, Split PDF, Compress PDF, JPG to PDF and Word to PDF. More tools will be added regularly.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your privacy is important to us. We do not permanently store your uploaded files.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar showBackButton />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="mt-5 text-lg text-slate-400">
            Everything you need to know about SP PDF Tools.
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-semibold text-white">
                {faq.question}
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}