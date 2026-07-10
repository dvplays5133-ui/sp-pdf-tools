"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import Navbar from "@/components/Navbar";

type SelectedPdf = {
  file: File;
  pageCount: number;
};

function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  }

  return `${(sizeInBytes / 1024 / 1024).toFixed(2)} MB`;
}

function parsePageRange(rangeText: string, totalPages: number) {
  const cleanedText = rangeText.replace(/\s+/g, "");

  if (!cleanedText) {
    throw new Error("Please enter the pages you want to extract.");
  }

  const selectedPages: number[] = [];
  const parts = cleanedText.split(",");

  for (const part of parts) {
    if (!part) {
      throw new Error("The page range format is invalid.");
    }

    if (part.includes("-")) {
      const rangeParts = part.split("-");

      if (rangeParts.length !== 2) {
        throw new Error(`Invalid page range: ${part}`);
      }

      const startPage = Number(rangeParts[0]);
      const endPage = Number(rangeParts[1]);

      if (
        !Number.isInteger(startPage) ||
        !Number.isInteger(endPage) ||
        startPage < 1 ||
        endPage < 1 ||
        startPage > endPage ||
        endPage > totalPages
      ) {
        throw new Error(
          `Invalid page range: ${part}. This PDF has ${totalPages} pages.`
        );
      }

      for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
        selectedPages.push(pageNumber - 1);
      }
    } else {
      const pageNumber = Number(part);

      if (
        !Number.isInteger(pageNumber) ||
        pageNumber < 1 ||
        pageNumber > totalPages
      ) {
        throw new Error(
          `Invalid page number: ${part}. This PDF has ${totalPages} pages.`
        );
      }

      selectedPages.push(pageNumber - 1);
    }
  }

  return [...new Set(selectedPages)];
}

export default function SplitPdfPage() {
  const [selectedPdf, setSelectedPdf] = useState<SelectedPdf | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function addPdf(file: File | undefined) {
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setMessage("Please select a valid PDF file.");
      return;
    }

    try {
      setMessage("Reading PDF information...");

      const fileBytes = await file.arrayBuffer();
      const pdfDocument = await PDFDocument.load(fileBytes, {
        ignoreEncryption: false,
      });

      setSelectedPdf({
        file,
        pageCount: pdfDocument.getPageCount(),
      });

      setPageRange("");
      setMessage("");
    } catch (error) {
      console.error(error);

      setSelectedPdf(null);
      setMessage(
        "Unable to read this PDF. It may be damaged or password protected."
      );
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    void addPdf(file);

    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    void addPdf(file);
  }

  function removePdf() {
    setSelectedPdf(null);
    setPageRange("");
    setMessage("");
  }

  function selectAllPages() {
    if (!selectedPdf) return;

    setPageRange(`1-${selectedPdf.pageCount}`);
    setMessage("");
  }

  async function splitPdf() {
    if (!selectedPdf) {
      setMessage("Please select a PDF file.");
      return;
    }

    try {
      setIsProcessing(true);
      setMessage("Creating your new PDF...");

      const selectedPageIndices = parsePageRange(
        pageRange,
        selectedPdf.pageCount
      );

      const sourceBytes = await selectedPdf.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(sourceBytes, {
        ignoreEncryption: false,
      });

      const outputPdf = await PDFDocument.create();

      const copiedPages = await outputPdf.copyPages(
        sourcePdf,
        selectedPageIndices
      );

      copiedPages.forEach((page) => {
        outputPdf.addPage(page);
      });

      const outputBytes = await outputPdf.save();

      const pdfArrayBuffer = outputBytes.buffer.slice(
        outputBytes.byteOffset,
        outputBytes.byteOffset + outputBytes.byteLength
      ) as ArrayBuffer;

      const blob = new Blob([pdfArrayBuffer], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = downloadUrl;
      downloadLink.download = "split-document.pdf";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 1000);

      setMessage(
        `${selectedPageIndices.length} page${
          selectedPageIndices.length === 1 ? "" : "s"
        } downloaded successfully.`
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to split this PDF."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-600/15 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar showBackButton />

        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-4xl">
              ✂️
            </div>

            <h1 className="text-4xl font-bold md:text-5xl">
              Split PDF
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              Select specific pages or page ranges and download them as a new
              PDF document.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl md:p-8">
            {!selectedPdf ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-14 text-center transition ${
                  isDragging
                    ? "border-purple-400 bg-purple-500/15"
                    : "border-white/20 bg-slate-900/40 hover:border-purple-400/60 hover:bg-white/5"
                }`}
              >
                <div className="mb-5 text-6xl">
                  {isDragging ? "📥" : "📁"}
                </div>

                <h2 className="text-2xl font-semibold">
                  {isDragging
                    ? "Drop your PDF file here"
                    : "Drag and drop one PDF file here"}
                </h2>

                <p className="mt-3 text-slate-400">
                  Or click inside this box to select a PDF
                </p>

                <span className="mt-7 inline-block rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3.5 font-semibold shadow-lg shadow-purple-500/20">
                  Select PDF File
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-3xl">
                      📄
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold">
                        {selectedPdf.file.name}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                        <span className="rounded-md bg-white/5 px-2 py-1">
                          {selectedPdf.pageCount}{" "}
                          {selectedPdf.pageCount === 1 ? "page" : "pages"}
                        </span>

                        <span className="rounded-md bg-white/5 px-2 py-1">
                          {formatFileSize(selectedPdf.file.size)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removePdf}
                    className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                  >
                    Remove PDF
                  </button>
                </div>

                <div className="mt-8">
                  <label
                    htmlFor="pageRange"
                    className="text-lg font-semibold"
                  >
                    Pages to extract
                  </label>

                  <p className="mt-2 text-sm text-slate-400">
                    Example: `1-3, 5, 8-10`
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="pageRange"
                      type="text"
                      value={pageRange}
                      onChange={(event) => {
                        setPageRange(event.target.value);
                        setMessage("");
                      }}
                      placeholder={`Enter pages from 1 to ${selectedPdf.pageCount}`}
                      className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900/70 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-purple-400"
                    />

                    <button
                      type="button"
                      onClick={selectAllPages}
                      className="rounded-xl border border-white/10 bg-white/10 px-5 py-4 font-medium transition hover:bg-white/20"
                    >
                      Select All
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => setPageRange("1")}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
                    >
                      First page
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setPageRange(String(selectedPdf.pageCount))
                      }
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
                    >
                      Last page
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const oddPages = Array.from(
                          { length: selectedPdf.pageCount },
                          (_, index) => index + 1
                        )
                          .filter((page) => page % 2 === 1)
                          .join(",");

                        setPageRange(oddPages);
                      }}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
                    >
                      Odd pages
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={splitPdf}
                    disabled={isProcessing || !pageRange.trim()}
                    className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isProcessing
                      ? "Creating PDF..."
                      : "Extract and Download Pages"}
                  </button>
                </div>
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
                  Your file stays in your browser
                </p>
              </div>

              <div className="text-center">
                <div className="text-2xl">🎯</div>
                <p className="mt-2 text-sm font-semibold">Precise</p>
                <p className="mt-1 text-xs text-slate-500">
                  Choose exact pages and ranges
                </p>
              </div>

              <div className="text-center">
                <div className="text-2xl">⚡</div>
                <p className="mt-2 text-sm font-semibold">Fast</p>
                <p className="mt-1 text-xs text-slate-500">
                  No server upload required
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}