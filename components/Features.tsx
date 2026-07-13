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
    title: "Secure PDF processing",
    description:
      "Use practical PDF tools with privacy in mind. Many operations are completed directly inside your browser.",
    icon: ShieldCheck,
  },
  {
    title: "No registration required",
    description:
      "Merge, split, compress and convert documents without creating an account or submitting personal details.",
    icon: BadgeCheck,
  },
  {
    title: "Fast and simple tools",
    description:
      "Complete common document tasks through clear controls, responsive pages and straightforward download options.",
    icon: Gauge,
  },
  {
    title: "Works across devices",
    description:
      "Access SP PDF Tools from desktop computers, laptops, tablets and compatible mobile browsers.",
    icon: MonitorSmartphone,
  },
  {
    title: "Privacy-focused experience",
    description:
      "Your documents are not shared with third parties by SP PDF Tools. Avoid using highly confidential files on any online service.",
    icon: LockKeyhole,
  },
  {
    title: "No software installation",
    description:
      "Everything runs online, so you can manage PDF files without installing additional desktop applications.",
    icon: CloudOff,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Why choose SP PDF Tools
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Free online PDF tools designed for everyday document work
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Merge, split, compress and convert files through an accessible
            interface designed to work across modern browsers and devices.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 text-center sm:px-10">
          <h3 className="text-2xl font-bold text-slate-950">
            Manage your documents without complicated software
          </h3>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            SP PDF Tools currently supports PDF merging, splitting,
            compression, JPG-to-PDF conversion and Word-to-PDF conversion.
            Additional tools may be introduced as the service continues to
            develop.
          </p>

          <a
            href="#tools"
            className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore available PDF tools
          </a>
        </div>
      </div>
    </section>
  );
}