import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Clock3 } from "lucide-react";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status?: "ready" | "coming-soon";
  badge?: string;
};

export default function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  status = "ready",
  badge,
}: ToolCardProps) {
  const isReady = status === "ready";

  const cardContent = (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border p-6 transition duration-300 ${
        isReady
          ? "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl"
          : "border-slate-200 bg-slate-50 opacity-80"
      }`}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-100/70 blur-2xl transition group-hover:bg-purple-200/80" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200">
            <Icon className="h-6 w-6" />
          </div>

          {badge && (
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              {badge}
            </span>
          )}

          {!isReady && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              <Clock3 className="h-3.5 w-3.5" />
              Coming soon
            </span>
          )}
        </div>

        <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>

        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <div
          className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
            isReady ? "text-purple-700" : "text-slate-500"
          }`}
        >
          {isReady ? "Use this tool" : "Available soon"}
          {isReady && (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </div>
      </div>
    </div>
  );

  if (!isReady) {
    return <div className="h-full cursor-not-allowed">{cardContent}</div>;
  }

  return (
    <Link href={href} className="block h-full">
      {cardContent}
    </Link>
  );
}