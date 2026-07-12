import {
  Combine,
  FileArchive,
  FileImage,
  FileKey2,
  FileLock2,
  FileMinus2,
  FileOutput,
  Scissors,
  FileText,
  ImagePlus,
  Layers3,
  RotateCw,
  Stamp,
} from "lucide-react";
import ToolCard from "./ToolCard";

const tools = [
  {
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into one organized document in a few clicks.",
    href: "/merge-pdf",
    icon: Combine,
    status: "ready" as const,
    badge: "Popular",
  },
  {
    title: "Split PDF",
    description:
      "Separate selected pages or divide one PDF into multiple smaller files.",
    href: "/split-pdf",
    icon: Scissors,
    status: "ready" as const,
    badge: "Popular",
  },
  {
    title: "Compress PDF",
    description:
      "Reduce PDF file size while preserving readable text and image quality.",
    href: "/compress-pdf",
    icon: FileArchive,
    status: "ready" as const,
    badge: "New",
  },
  {
    title: "Rotate PDF",
    description:
      "Rotate selected PDF pages clockwise or counter-clockwise with ease.",
    href: "/rotate-pdf",
    icon: RotateCw,
    status: "coming-soon" as const,
  },
  {
    title: "Delete PDF Pages",
    description:
      "Remove unwanted pages from a PDF and download the cleaned document.",
    href: "/delete-pages",
    icon: FileMinus2,
    status: "coming-soon" as const,
  },
  {
    title: "Extract PDF Pages",
    description:
      "Select and extract important pages into a separate downloadable PDF.",
    href: "/extract-pages",
    icon: FileOutput,
    status: "coming-soon" as const,
  },
  {
    title: "Organize PDF",
    description:
      "Rearrange, reorder and manage PDF pages in the sequence you need.",
    href: "/organize-pdf",
    icon: Layers3,
    status: "coming-soon" as const,
  },
  {
    title: "Watermark PDF",
    description:
      "Add custom text or image watermarks to protect and identify documents.",
    href: "/watermark-pdf",
    icon: Stamp,
    status: "coming-soon" as const,
  },
  {
    title: "Protect PDF",
    description:
      "Add password protection to restrict unauthorized access to PDF files.",
    href: "/protect-pdf",
    icon: FileLock2,
    status: "coming-soon" as const,
  },
  {
    title: "Unlock PDF",
    description:
      "Remove password restrictions from PDFs you are authorized to access.",
    href: "/unlock-pdf",
    icon: FileKey2,
    status: "coming-soon" as const,
  },
  {
    title: "JPG to PDF",
    description:
      "Convert JPG, JPEG and PNG images into one professionally arranged PDF.",
    href: "/jpg-to-pdf",
    icon: ImagePlus,
    status: "coming-soon" as const,
  },
  {
    title: "PDF to JPG",
    description:
      "Convert PDF pages into downloadable high-quality JPG image files.",
    href: "/pdf-to-jpg",
    icon: FileImage,
    status: "coming-soon" as const,
  },
  {
    title: "PDF to Word",
    description:
      "Convert PDF documents into editable Microsoft Word-compatible files.",
    href: "/pdf-to-word",
    icon: FileText,
    status: "coming-soon" as const,
  },
];

export default function ToolGrid() {
  return (
    <section id="tools" className="bg-slate-50 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            All PDF tools
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need to manage PDF files
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Choose a tool below. Merge PDF and Split PDF are available now, and
            more professional tools will be added in the next development
            milestones.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              status={tool.status}
              badge={tool.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}