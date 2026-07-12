export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center">

        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>

        <h2 className="mt-8 text-2xl font-bold text-white">
          SP PDF Tools
        </h2>

        <p className="mt-2 text-slate-400">
          Loading...
        </p>

      </div>
    </main>
  );
}