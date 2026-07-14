"use client";

import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";
import Navbar from "@/components/Navbar";

type PdfItem = {
  id: string;
  file: File;
  pageCount: number;
};

const faqItems = [
  {
    question: "Is the Merge PDF tool free?",
    answer:
      "Yes. You can combine PDF files without creating an account or paying a fee.",
  },
  {
    question: "Are my PDF files uploaded to a server?",
    answer:
      "The merging process is completed directly inside your browser. Your selected files are not uploaded to our servers for merging.",
  },
  {
    question: "How many PDF files can I merge?",
    answer:
      "You can select multiple PDF documents. The practical limit depends on your browser, device memory and file sizes.",
  },
  {
    question: "Can I change the order of the PDF files?",
    answer:
      "Yes. Drag the file cards or use the Up and Down buttons before merging.",
  },
  {
    question: "Can password-protected PDFs be merged?",
    answer:
      "Password-protected or encrypted files may not work. Remove protection only when you are authorized to do so.",
  },
  {
    question: "Does Merge PDF work on mobile devices?",
    answer:
      "Yes, it works in compatible modern mobile browsers. Large files may perform better on a computer.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sp-pdf-tools.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Merge PDF",
      item: "https://sp-pdf-tools.vercel.app/merge-pdf",
    },
  ],
};

export default function MergePdfPage() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function addPdfFiles(selectedFiles: File[]) {
    const validFiles = selectedFiles.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
    );

    if (validFiles.length === 0) {
      setMessage("Please select valid PDF files.");
      return;
    }

    setMessage("Reading PDF information...");

    const newItems: PdfItem[] = [];

    for (const file of validFiles) {
      try {
        const fileBytes = await file.arrayBuffer();

        const pdfDocument = await PDFDocument.load(fileBytes, {
          ignoreEncryption: false,
        });

        newItems.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          pageCount: pdfDocument.getPageCount(),
        });
      } catch (error) {
        console.error(`Unable to read ${file.name}`, error);

        setMessage(
          `${file.name} could not be added. It may be damaged or password protected.`
        );
      }
    }

    if (newItems.length > 0) {
      setItems((currentItems) => [...currentItems, ...newItems]);
      setMessage("");
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);

    void addPdfFiles(selectedFiles);

    event.target.value = "";
  }

  function handleUploadDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingFiles(true);
  }

  function handleUploadDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingFiles(false);
  }

  function handleUploadDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingFiles(false);

    const droppedFiles = Array.from(event.dataTransfer.files);

    void addPdfFiles(droppedFiles);
  }

  function removeItem(itemId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );

    setMessage("");
  }

  function clearAllFiles() {
    setItems([]);
    setMessage("");
  }

  function moveItemUp(index: number) {
    if (index === 0) return;

    setItems((currentItems) => {
      const updatedItems = [...currentItems];

      [updatedItems[index - 1], updatedItems[index]] = [
        updatedItems[index],
        updatedItems[index - 1],
      ];

      return updatedItems;
    });
  }

  function moveItemDown(index: number) {
    if (index === items.length - 1) return;

    setItems((currentItems) => {
      const updatedItems = [...currentItems];

      [updatedItems[index], updatedItems[index + 1]] = [
        updatedItems[index + 1],
        updatedItems[index],
      ];

      return updatedItems;
    });
  }

  function handleItemDragStart(index: number) {
    setDraggedItemIndex(index);
  }

  function handleItemDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleItemDrop(targetIndex: number) {
    if (
      draggedItemIndex === null ||
      draggedItemIndex === targetIndex
    ) {
      setDraggedItemIndex(null);
      return;
    }

    setItems((currentItems) => {
      const updatedItems = [...currentItems];
      const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);

      updatedItems.splice(targetIndex, 0, draggedItem);

      return updatedItems;
    });

    setDraggedItemIndex(null);
  }

  function formatFileSize(sizeInBytes: number) {
    if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    }

    return `${(sizeInBytes / 1024 / 1024).toFixed(2)} MB`;
  }

  async function mergePdfFiles() {
    if (items.length < 2) {
      setMessage("Please select at least two PDF files.");
      return;
    }

    try {
      setIsProcessing(true);
      setMessage("Merging your PDF files...");

      const mergedPdf = await PDFDocument.create();

      for (const item of items) {
        const fileBytes = await item.file.arrayBuffer();

        const sourcePdf = await PDFDocument.load(fileBytes, {
          ignoreEncryption: false,
        });

        const copiedPages = await mergedPdf.copyPages(
          sourcePdf,
          sourcePdf.getPageIndices()
        );

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();

      const pdfArrayBuffer = mergedPdfBytes.buffer.slice(
        mergedPdfBytes.byteOffset,
        mergedPdfBytes.byteOffset + mergedPdfBytes.byteLength
      ) as ArrayBuffer;

      const blob = new Blob([pdfArrayBuffer], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = downloadUrl;
      downloadLink.download = "merged-document.pdf";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 1000);

      setMessage("PDF files merged and downloaded successfully.");
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to merge the files. One PDF may be damaged or password protected."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  const totalPages = items.reduce(
    (total, item) => total + item.pageCount,
    0
  );

  const totalSize = items.reduce(
    (total, item) => total + item.file.size,
    0
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-600/15 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar showBackButton />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-sm text-slate-400"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li aria-hidden="true">/</li>

              <li className="text-slate-200">Merge PDF</li>
            </ol>
          </nav>

          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-4xl">
              📚
            </div>

            <h1 className="text-4xl font-bold md:text-5xl">
              Merge PDF Files Online
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              Combine multiple PDF files into one organized document. Arrange
              them in the required order and download the merged PDF directly
              from your browser.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl md:p-8">
            <div
              onDragOver={handleUploadDragOver}
              onDragLeave={handleUploadDragLeave}
              onDrop={handleUploadDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
                isDraggingFiles
                  ? "border-purple-400 bg-purple-500/15"
                  : "border-white/20 bg-slate-900/40 hover:border-purple-400/60 hover:bg-white/5"
              }`}
            >
              <div className="mb-4 text-6xl">
                {isDraggingFiles ? "📥" : "📁"}
              </div>

              <h2 className="text-2xl font-semibold">
                {isDraggingFiles
                  ? "Drop your PDF files here"
                  : "Drag and drop PDF files here"}
              </h2>

              <p className="mt-3 text-slate-400">
                Or click inside this box to select multiple PDF files
              </p>

              <span className="mt-6 inline-block rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3.5 font-semibold shadow-lg shadow-purple-500/20">
                Select PDF Files
              </span>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {items.length > 0 && (
              <div className="mt-8">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Selected PDF files
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Drag the cards to change the merging order.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                      {items.length} files
                    </span>

                    <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                      {totalPages} pages
                    </span>

                    <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                      {formatFileSize(totalSize)}
                    </span>

                    <button
                      type="button"
                      onClick={clearAllFiles}
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                    >
                      Clear all
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleItemDragStart(index)}
                      onDragOver={handleItemDragOver}
                      onDrop={() => handleItemDrop(index)}
                      onDragEnd={() => setDraggedItemIndex(null)}
                      className={`cursor-grab rounded-2xl border p-5 transition active:cursor-grabbing ${
                        draggedItemIndex === index
                          ? "scale-95 border-purple-400 bg-purple-500/15 opacity-60"
                          : "border-white/10 bg-white/5 hover:border-purple-400/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-3xl">
                          📄
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">
                            {index + 1}. {item.file.name}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                            <span className="rounded-md bg-white/5 px-2 py-1">
                              {item.pageCount}{" "}
                              {item.pageCount === 1 ? "page" : "pages"}
                            </span>

                            <span className="rounded-md bg-white/5 px-2 py-1">
                              {formatFileSize(item.file.size)}
                            </span>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => moveItemUp(index)}
                              disabled={index === 0}
                              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              ↑ Up
                            </button>

                            <button
                              type="button"
                              onClick={() => moveItemDown(index)}
                              disabled={index === items.length - 1}
                              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              ↓ Down
                            </button>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={mergePdfFiles}
                  disabled={isProcessing || items.length < 2}
                  className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isProcessing
                    ? "Merging PDF files..."
                    : `Merge ${items.length} PDF Files`}
                </button>
              </div>
            )}

            {message && (
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center text-sm text-slate-300">
                {message}
              </div>
            )}

            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl">🔒</div>
                <p className="mt-2 text-sm font-semibold">Private</p>
                <p className="mt-1 text-xs text-slate-500">
                  Files remain inside your browser
                </p>
              </div>

              <div className="text-center">
                <div className="text-2xl">⚡</div>
                <p className="mt-2 text-sm font-semibold">Fast</p>
                <p className="mt-1 text-xs text-slate-500">
                  No server upload required
                </p>
              </div>

              <div className="text-center">
                <div className="text-2xl">↕️</div>
                <p className="mt-2 text-sm font-semibold">Reorder</p>
                <p className="mt-1 text-xs text-slate-500">
                  Arrange files before merging
                </p>
              </div>
            </div>
          </div>

          <section className="mt-20">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
                Simple process
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                How to merge PDF files online
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  number: "1",
                  title: "Select PDF files",
                  description:
                    "Choose two or more PDF documents from your device.",
                },
                {
                  number: "2",
                  title: "Arrange the order",
                  description:
                    "Drag the cards or use the movement buttons.",
                },
                {
                  number: "3",
                  title: "Merge and download",
                  description:
                    "Create and download one combined PDF document.",
                },
              ].map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-lg font-bold">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
                Common questions
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Merge PDF frequently asked questions
              </h2>
            </div>

            <div className="mx-auto mt-10 max-w-4xl space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <summary className="cursor-pointer list-none font-semibold">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}

                      <span className="text-xl text-purple-300 transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>

                  <p className="mt-4 leading-7 text-slate-400">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold">
                Explore more PDF tools
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Split PDF",
                  href: "/split-pdf",
                },
                {
                  title: "Compress PDF",
                  href: "/compress-pdf",
                },
                {
                  title: "JPG to PDF",
                  href: "/jpg-to-pdf",
                },
                {
                  title: "Word to PDF",
                  href: "/word-to-pdf",
                },
              ].map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-purple-400/50 hover:bg-white/10"
                >
                  <h3 className="text-lg font-semibold">
                    {tool.title}
                  </h3>

                  <span className="mt-5 inline-block text-sm font-semibold text-purple-300">
                    Open tool →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-16 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5 text-sm leading-7 text-amber-100">
            Keep backup copies of important documents. Avoid processing highly
            confidential files unless you understand and accept the privacy
            implications.
          </div>
        </section>
      </div>
    </main>
  );
}