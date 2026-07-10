import Navbar from "@/components/Navbar";
const tools = [
  {
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
    icon: "📚",
    link: "/merge-pdf",
  },
  {
    name: "Split PDF",
    description: "Separate selected pages into new PDF files.",
    icon: "✂️",
    link: "/split-pdf",
  },
  {
    name: "Compress PDF",
    description: "Reduce PDF size while maintaining quality.",
    icon: "🗜️",
    link: "#",
  },
  {
    name: "PDF to JPG",
    description: "Convert PDF pages into high-quality images.",
    icon: "🖼️",
    link: "#",
  },
  {
    name: "JPG to PDF",
    description: "Turn multiple images into one PDF document.",
    icon: "📄",
    link: "#",
  },
  {
    name: "Rotate PDF",
    description: "Rotate PDF pages quickly and securely.",
    icon: "🔄",
    link: "#",
  },
  {
    name: "Watermark PDF",
    description: "Add text or image watermarks to your PDF.",
    icon: "💧",
    link: "#",
  },
  {
    name: "Protect PDF",
    description: "Secure your PDF with password protection.",
    icon: "🔐",
    link: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-24 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
            ✨ Fast, private and easy-to-use document tools
          </div>

          <h2 className="mx-auto max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Powerful tools for every
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              PDF and document task
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Merge, split, compress, convert and protect your files directly in
            your browser.
          </p>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-2xl border border-dashed border-purple-400/50 bg-slate-900/50 px-8 py-12">
              <div className="mb-5 text-6xl">📁</div>

              <h3 className="text-2xl font-semibold">
                Drop your PDF files here
              </h3>

              <p className="mt-3 text-slate-400">
                Or choose a tool below to get started
              </p>

              <a
                href="/merge-pdf"
                className="mt-7 inline-block rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 font-semibold shadow-lg shadow-purple-500/20 transition hover:scale-105"
              >
                Try Merge PDF
              </a>
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-12 text-center">
            <p className="mb-3 font-semibold text-purple-400">PDF TOOLKIT</p>

            <h2 className="text-4xl font-bold">
              Everything you need in one place
            </h2>

            <p className="mt-4 text-slate-400">
              Select a tool and process your documents in seconds.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-3xl transition group-hover:scale-110">
                  {tool.icon}
                </div>

                <h3 className="text-xl font-semibold">{tool.name}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-purple-400">
                  Open tool →
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="features" className="border-y border-white/10 bg-white/5">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl">🔒</div>
              <h3 className="text-xl font-semibold">Private processing</h3>
              <p className="mt-3 text-slate-400">
                Files are processed directly inside your browser.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="text-xl font-semibold">Fast and simple</h3>
              <p className="mt-3 text-slate-400">
                Complete document tasks with only a few clicks.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 text-4xl">💻</div>
              <h3 className="text-xl font-semibold">Works everywhere</h3>
              <p className="mt-3 text-slate-400">
                Fully responsive on desktop, tablet and mobile.
              </p>
            </div>
          </div>
        </section>

        <footer className="px-6 py-10 text-center text-sm text-slate-500">
          © 2026 SP PDF Tools. All rights reserved.
        </footer>
      </div>
    </main>
  );
}