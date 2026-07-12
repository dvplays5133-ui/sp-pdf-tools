import Link from "next/link";
import {
  FileArchive,
  FileImage,
  FileText,
  Mail,
  MapPin,
  Scissors,
  ShieldCheck,
} from "lucide-react";

const toolLinks = [
  {
    label: "Merge PDF",
    href: "/merge-pdf",
    icon: FileText,
  },
  {
    label: "Split PDF",
    href: "/split-pdf",
    icon: Scissors,
  },
  {
    label: "Compress PDF",
    href: "/compress-pdf",
    icon: FileArchive,
  },
  {
    label: "JPG to PDF",
    href: "/jpg-to-pdf",
    icon: FileImage,
  },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-950/40">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <p className="text-lg font-bold text-white">SP PDF Tools</p>
                <p className="text-xs text-slate-400">
                  Smart document utilities
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Free online tools to merge, split, compress and convert PDF files
              directly from your browser.
            </p>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Secure browser-based processing
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                Built for users worldwide
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-purple-400" />
                support@sp-pdf-tools.com
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              PDF Tools
            </h2>

            <ul className="mt-5 space-y-3">
              {toolLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                  >
                    <Icon className="h-4 w-4 transition group-hover:text-purple-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h2>

            <ul className="mt-5 space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Legal
            </h2>

            <ul className="mt-5 space-y-3">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm font-semibold text-white">
                Privacy-focused tools
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Most files are processed locally inside your browser and are
                not uploaded to our servers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SP PDF Tools. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link href="/disclaimer" className="transition hover:text-white">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}