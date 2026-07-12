"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";

type PageSize = "a4" | "letter";
type Orientation = "portrait" | "landscape";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, index);

  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

export default function WordToPdfPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] =
    useState<Orientation>("portrait");
  const [isReading, setIsReading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function resetResult() {
    setSuccess(false);
    setError("");
  }

  async function handleFile(selectedFile?: File) {
    if (!selectedFile) return;

    resetResult();

    const fileName = selectedFile.name.toLowerCase();

    if (!fileName.endsWith(".docx")) {
      setFile(null);
      setHtmlContent("");
      setError(
        "Please choose a valid Microsoft Word .docx file. Old .doc files are not supported."
      );
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setFile(null);
      setHtmlContent("");
      setError("Please choose a Word document smaller than 20 MB.");
      return;
    }

    setFile(selectedFile);
    setIsReading(true);
    setHtmlContent("");

    try {
      const mammoth = await import("mammoth");
      const arrayBuffer = await selectedFile.arrayBuffer();

      const result = await mammoth.convertToHtml(
        { arrayBuffer },
        {
          includeDefaultStyleMap: true,
          styleMap: [
            "p[style-name='Title'] => h1:fresh",
            "p[style-name='Subtitle'] => h2:fresh",
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
          ],
        }
      );

      if (!result.value.trim()) {
        throw new Error("No readable document content was found.");
      }

      setHtmlContent(result.value);
    } catch (readingError) {
      console.error(readingError);
      setFile(null);
      setHtmlContent("");
      setError(
        "This Word document could not be read. It may be damaged, password-protected or unsupported."
      );
    } finally {
      setIsReading(false);
    }
  }

  function removeFile() {
    setFile(null);
    setHtmlContent("");
    setError("");
    setSuccess(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function convertToPdf() {
    if (!file || !htmlContent || !previewRef.current) {
      setError("Please select a readable Word document first.");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess(false);

    try {
      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: pageSize,
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      const printableWidth = pageWidth - margin * 2;

      await pdf.html(previewRef.current, {
        x: margin,
        y: margin,
        width: printableWidth,
        windowWidth: 794,
        autoPaging: "text",
        html2canvas: {
          scale: 0.75,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        },
        margin: [15, 15, 15, 15],
      });

      const outputName = file.name.replace(/\.docx$/i, "");

      pdf.save(`${outputName}.pdf`);
      setSuccess(true);
    } catch (conversionError) {
      console.error(conversionError);
      setError(
        "The PDF could not be created. Try a smaller document or remove complex unsupported elements."
      );
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
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
            <FileText className="h-5 w-5 text-purple-600" />
            Word to PDF
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              Word to PDF converter
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Convert Word documents to PDF
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Upload a Microsoft Word DOCX document, preview its content and
              download it as a PDF directly from your browser.
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
                  void handleFile(event.dataTransfer.files[0]);
                }}
                className="cursor-pointer rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/60 px-6 py-16 text-center transition hover:border-purple-500 hover:bg-purple-50"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200">
                  <Upload className="h-8 w-8" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  Select a Word document
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Drag and drop a DOCX document here or click to browse.
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  DOCX only · Maximum file size: 20 MB
                </p>
              </div>
            ) : (
              <>
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
                    onClick={removeFile}
                    disabled={isReading || isConverting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </button>
                </div>

                {isReading && (
                  <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-8 text-blue-800">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Reading Word document...
                  </div>
                )}

                {!isReading && htmlContent && (
                  <>
                    <div className="mt-8">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">
                            Document preview
                          </h2>

                          <p className="mt-1 text-sm text-slate-500">
                            Review the converted content before creating the
                            PDF.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => void handleFile(file)}
                          disabled={isConverting}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Reload document
                        </button>
                      </div>

                      <div className="mt-5 max-h-[600px] overflow-auto rounded-2xl border border-slate-200 bg-slate-200 p-4 sm:p-6">
                        <div
                          ref={previewRef}
                          className="word-document mx-auto min-h-[900px] max-w-[794px] bg-white px-10 py-12 text-slate-900 shadow-lg sm:px-16"
                          dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                      </div>
                    </div>

                    <div className="mt-8 grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-bold text-slate-900">
                          Page size
                        </label>

                        <select
                          value={pageSize}
                          onChange={(event) => {
                            setPageSize(event.target.value as PageSize);
                            resetResult();
                          }}
                          disabled={isConverting}
                          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
                        >
                          <option value="a4">A4</option>
                          <option value="letter">Letter</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-bold text-slate-900">
                          Orientation
                        </label>

                        <select
                          value={orientation}
                          onChange={(event) => {
                            setOrientation(
                              event.target.value as Orientation
                            );
                            resetResult();
                          }}
                          disabled={isConverting}
                          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
                        >
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={convertToPdf}
                      disabled={isConverting}
                      className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isConverting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Creating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          Convert and download PDF
                        </>
                      )}
                    </button>

                    {success && (
                      <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-800">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        Your Word document was converted and downloaded
                        successfully.
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <input
              ref={inputRef}
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(event) =>
                void handleFile(event.target.files?.[0])
              }
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
                Your document is processed locally on your device.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <FileText className="h-6 w-6 text-purple-600" />

              <h3 className="mt-3 font-bold text-slate-900">
                DOCX support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Convert modern Microsoft Word DOCX documents.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <Download className="h-6 w-6 text-blue-600" />

              <h3 className="mt-3 font-bold text-slate-900">
                Instant download
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Download the generated PDF immediately after conversion.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>Important:</strong> Browser conversion preserves common
            text, headings, lists, tables and images. Very complex Word
            formatting, special fonts, headers, footers, shapes and advanced
            page layouts may appear differently in the PDF.
          </div>
        </div>
      </section>

      <style jsx global>{`
        .word-document {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 1.65;
          overflow-wrap: anywhere;
        }

        .word-document h1 {
          margin: 0 0 18px;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.25;
        }

        .word-document h2 {
          margin: 24px 0 14px;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.3;
        }

        .word-document h3 {
          margin: 20px 0 12px;
          font-size: 18px;
          font-weight: 700;
        }

        .word-document p {
          margin: 0 0 12px;
        }

        .word-document ul,
        .word-document ol {
          margin: 0 0 14px;
          padding-left: 28px;
        }

        .word-document ul {
          list-style: disc;
        }

        .word-document ol {
          list-style: decimal;
        }

        .word-document table {
          width: 100%;
          margin: 16px 0;
          border-collapse: collapse;
        }

        .word-document th,
        .word-document td {
          border: 1px solid #cbd5e1;
          padding: 8px;
          vertical-align: top;
        }

        .word-document img {
          max-width: 100%;
          height: auto;
          margin: 12px auto;
        }

        .word-document a {
          color: #2563eb;
          text-decoration: underline;
        }

        .word-document blockquote {
          margin: 16px 0;
          border-left: 4px solid #a855f7;
          padding-left: 16px;
          color: #475569;
        }
      `}</style>
    </main>
  );
}