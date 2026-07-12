"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  showBackButton?: boolean;
};

const navLinks = [
  { label: "Tools", href: "/#tools" },
  { label: "Features", href: "/#features" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  showBackButton = false,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-lg font-bold text-white shadow-lg shadow-purple-200">
            SP
          </div>

          <div>
            <p className="text-lg font-bold text-slate-950">SP PDF Tools</p>
            <p className="text-xs text-slate-500">
              Smart document solutions
            </p>
          </div>
        </Link>

        {showBackButton ? (
          <Link
            href="/"
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            ← Back to Home
          </Link>
        ) : (
          <>
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 transition hover:text-purple-700"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/#tools"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5"
              >
                Use PDF Tools
              </Link>
            </nav>

            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </>
        )}
      </div>

      {!showBackButton && isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-purple-50 hover:text-purple-700"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#tools"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Use PDF Tools
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}