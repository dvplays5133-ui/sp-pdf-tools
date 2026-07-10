type NavbarProps = {
  showBackButton?: boolean;
};

export default function Navbar({
  showBackButton = false,
}: NavbarProps) {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-lg font-bold text-white">
            SP
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              SP PDF Tools
            </h1>

            <p className="text-xs text-slate-400">
              Smart document solutions
            </p>
          </div>
        </a>

        {showBackButton ? (
          <a
            href="/"
            className="rounded-xl bg-white/10 px-5 py-2 text-white"
          >
            ← Back to Home
          </a>
        ) : (
          <nav className="hidden md:flex gap-8 text-slate-300">
            <a href="#tools">All Tools</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        )}
      </div>
    </header>
  );
}