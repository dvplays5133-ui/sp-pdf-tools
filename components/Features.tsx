import {
  BadgeCheck,
  CloudOff,
  Gauge,
  LockKeyhole,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Secure processing",
    description:
      "Your files are handled with privacy in mind and are never shared with third parties.",
    icon: ShieldCheck,
  },
  {
    title: "No registration",
    description:
      "Start using PDF tools immediately without creating an account or providing personal details.",
    icon: BadgeCheck,
  },
  {
    title: "Fast performance",
    description:
      "Optimized tools help you complete common PDF tasks quickly and efficiently.",
    icon: Gauge,
  },
  {
    title: "Works on every device",
    description:
      "Use SP PDF Tools on desktop computers, tablets and mobile phones.",
    icon: MonitorSmartphone,
  },
  {
    title: "Privacy focused",
    description:
      "Many tools process files directly in your browser for better privacy and control.",
    icon: LockKeyhole,
  },
  {
    title: "No software installation",
    description:
      "Everything runs online, so there is no need to download or install desktop software.",
    icon: CloudOff,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Why choose SP PDF Tools
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Simple, secure and designed for everyday work
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Manage PDF documents with tools that are easy to understand,
            responsive and available whenever you need them.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}