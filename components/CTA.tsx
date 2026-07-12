export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold">
          Ready to simplify your PDF workflow?
        </h2>

        <p className="mt-5 text-lg text-blue-100">
          Merge, split, compress and manage PDF documents online with SP PDF
          Tools. Fast, secure and completely free.
        </p>

        <div className="mt-10">
          <a
            href="#tools"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition hover:scale-105"
          >
            Explore PDF Tools
          </a>
        </div>
      </div>
    </section>
  );
}