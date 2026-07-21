"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileArchive,
  FileText,
  Loader2,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/seo/JsonLd";

type CompressionLevel = "low" | "medium" | "high";

const compressionOptions: {
  id: CompressionLevel;
  title: string;
  description: string;
}[] = [
  {
    id: "low",
    title: "Low compression",
    description: "Best quality with a smaller reduction in file size.",
  },
  {
    id: "medium",
    title: "Recommended",
    description: "Balanced quality and file-size reduction.",
  },
  {
    id: "high",
    title: "High compression",
    description: "Maximum reduction with lower visual quality.",
  },
];
const faqItems = [
  {
    question: "Is Compress PDF free?",
    answer:
      "Yes. You can compress compatible PDF files online without creating an account or paying a fee.",
  },
  {
    question: "Will PDF quality decrease?",
    answer:
      "Compression aims to reduce file size while preserving readable quality. The final result depends on the original PDF structure and content.",
  },
  {
    question: "Are my PDF files private?",
    answer:
      "The compression process is performed directly inside your browser. Your selected PDF is not intentionally uploaded to our servers for processing.",
  },
  {
    question: "Can I compress large PDF files?",
    answer:
      "You can process PDF files up to 50 MB. Performance also depends on your browser, device memory and document complexity.",
  },
];
function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, index);

  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

export default function CompressPdfPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const reduction = useMemo(() => {
    if (!file || compressedSize === null || file.size === 0) return null;

    return Math.max(
      0,
      Math.round(((file.size - compressedSize) / file.size) * 100)
    );
  }, [file, compressedSize]);

  function resetResult() {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    setDownloadUrl("");
    setCompressedSize(null);
    setError("");
  }

  function handleFile(selectedFile: File | undefined) {
    if (!selectedFile) return;

    resetResult();

    if (selectedFile.type !== "application/pdf") {
      setFile(null);
      setError("Please choose a valid PDF file.");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setFile(null);
      setError("Please choose a PDF smaller than 50 MB.");
      return;
    }

    setFile(selectedFile);
  }

  async function compressPdf() {
    if (!file) {
      setError("Please choose a PDF file first.");
      return;
    }

    setIsProcessing(true);
    setError("");
    resetResult();

    try {
      const sourceBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(sourceBytes, {
        ignoreEncryption: true,
      });

      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("SP PDF Tools");
      pdfDoc.setCreator("SP PDF Tools");

      const useObjectStreams = level !== "low";

      const outputBytes = await pdfDoc.save({
        useObjectStreams,
        addDefaultPage: false,
        objectsPerTick: level === "high" ? 100 : 50,
      });

      const safeBytes = new Uint8Array(outputBytes);

const blob = new Blob([safeBytes.buffer], {
  type: "application/pdf",
});

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setCompressedSize(blob.size);
    } catch (compressError) {
      console.error(compressError);
      setError(
        "This PDF could not be processed. It may be encrypted, damaged or unsupported."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  function clearFile() {
    resetResult();
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  const siteUrl = "https://sp-pdf-tools.vercel.app";

  const breadcrumbs = [
  {
    name: "Home",
    item: siteUrl,
  },
  {
    name: "Compress PDF",
    item: `${siteUrl}/compress-pdf`,
  },
];
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd
  organization={{
    name: "SP PDF Tools",
    url: "https://sp-pdf-tools.vercel.app",
  }}
  software={{
    name: "Compress PDF",
    description:
      "Compress PDF files online for free. Reduce PDF file size quickly and securely with SP PDF Tools.",
    url: "https://sp-pdf-tools.vercel.app/compress-pdf",
  }}
  breadcrumbs={breadcrumbs}
  faqs={faqItems}
/>
      <section className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all tools
          </Link>

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FileArchive className="h-5 w-5 text-purple-600" />
            Compress PDF
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              Compress PDF online
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Reduce your PDF file size
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Optimize PDF structure and remove unnecessary document metadata
              directly in your browser.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            {!file ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    inputRef.current?.click();
                  }
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  handleFile(event.dataTransfer.files[0]);
                }}
                className="cursor-pointer rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/60 px-6 py-16 text-center transition hover:border-purple-500 hover:bg-purple-50"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200">
                  <Upload className="h-8 w-8" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  Select a PDF file
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Drag and drop your PDF here or click to browse.
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Maximum file size: 50 MB
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                      <FileText className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {file.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={clearFile}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </button>
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-bold text-slate-900">
                    Choose compression level
                  </h2>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {compressionOptions.map((option) => {
                      const selected = level === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setLevel(option.id);
                            resetResult();
                          }}
                          disabled={isProcessing}
                          className={`rounded-2xl border p-5 text-left transition ${
                            selected
                              ? "border-purple-500 bg-purple-50 ring-2 ring-purple-100"
                              : "border-slate-200 bg-white hover:border-purple-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-bold text-slate-900">
                              {option.title}
                            </p>

                            {selected && (
                              <CheckCircle2 className="h-5 w-5 text-purple-600" />
                            )}
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {!downloadUrl && (
                  <button
                    type="button"
                    onClick={compressPdf}
                    disabled={isProcessing}
                    className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Compressing PDF...
                      </>
                    ) : (
                      <>
                        <FileArchive className="h-5 w-5" />
                        Compress PDF
                      </>
                    )}
                  </button>
                )}

                {downloadUrl && compressedSize !== null && (
                  <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />

                      <div>
                        <h2 className="text-lg font-bold text-emerald-950">
                          Your PDF is ready
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-emerald-800">
                          Original: {formatBytes(file.size)} · New:{" "}
                          {formatBytes(compressedSize)}
                          {reduction !== null ? ` · Reduction: ${reduction}%` : ""}
                        </p>
                      </div>
                    </div>

                    <a
                      href={downloadUrl}
                      download={`compressed-${file.name}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <Download className="h-5 w-5" />
                      Download compressed PDF
                    </a>
                  </div>
                )}
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => handleFile(event.target.files?.[0])}
              className="hidden"
            />

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-3 font-bold text-slate-900">
                Browser processing
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The file is processed locally on your device.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <FileArchive className="h-6 w-6 text-purple-600" />
              <h3 className="mt-3 font-bold text-slate-900">
                Structural optimization
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Unnecessary metadata and inefficient object structure are
                reduced.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 font-bold text-slate-900">
                Simple download
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Download the optimized PDF immediately after processing.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= HOW TO USE ================= */}

<section className="mx-auto mt-16 max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
  <h2 className="text-3xl font-bold">
    How to Compress PDF Files
  </h2>

  <div className="mt-6 grid gap-6 md:grid-cols-2">

    <div>
      <h3 className="text-xl font-semibold">
        Upload PDF
      </h3>

      <p className="mt-2 text-slate-400">
        Choose the PDF file you want to reduce in size.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold">
        Compress
      </h3>

      <p className="mt-2 text-slate-400">
        Our tool optimizes your PDF while maintaining good quality.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold">
        Download
      </h3>

      <p className="mt-2 text-slate-400">
        Save the compressed PDF instantly.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold">
        Secure
      </h3>

      <p className="mt-2 text-slate-400">
        Most compression is processed locally inside your browser.
      </p>
    </div>

  </div>
</section>

{/* ================= FAQ ================= */}

<section className="mx-auto mt-12 mb-20 max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

  <h2 className="text-3xl font-bold">
    Frequently Asked Questions
  </h2>

  <div className="mt-8 space-y-6">

    <div>
      <h3 className="text-xl font-semibold">
        Is Compress PDF free?
      </h3>

      <p className="mt-2 text-slate-400">
        Yes. Compress PDF files online without any cost.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold">
        Will PDF quality decrease?
      </h3>

      <p className="mt-2 text-slate-400">
        Compression aims to reduce file size while preserving readable quality.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold">
        Are my files private?
      </h3>

      <p className="mt-2 text-slate-400">
        Most PDF processing takes place directly inside your browser.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold">
        Can I compress large PDFs?
      </h3>

      <p className="mt-2 text-slate-400">
        Yes, although performance depends on your browser and available memory.
      </p>
    </div>

  </div>

</section>
    </main>
  );
}