"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { jsPDF } from "jspdf";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Download,
  FileImage,
  ImagePlus,
  Loader2,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";

type PageSize = "a4" | "letter" | "original";
type Orientation = "portrait" | "landscape";
type MarginSize = "none" | "small" | "large";

type ImageItem = {
  id: string;
  file: File;
  preview: string;
};

const marginMap: Record<MarginSize, number> = {
  none: 0,
  small: 10,
  large: 20,
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, index);

  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load image."));
    image.src = url;
  });
}

export default function JpgToPdfPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] =
    useState<Orientation>("portrait");
  const [margin, setMargin] = useState<MarginSize>("small");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const totalSize = useMemo(
    () => images.reduce((total, item) => total + item.file.size, 0),
    [images]
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError("");

    const validFiles = acceptedFiles.filter((file) =>
      ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
    );

    if (validFiles.length !== acceptedFiles.length) {
      setError("Only JPG, JPEG and PNG images are supported.");
    }

    const newImages = validFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((current) => [...current, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: true,
    noClick: images.length > 0,
    noKeyboard: images.length > 0,
  });

  function removeImage(id: string) {
    setImages((current) => {
      const item = current.find((image) => image.id === id);

      if (item) {
        URL.revokeObjectURL(item.preview);
      }

      return current.filter((image) => image.id !== id);
    });
  }

  function moveImage(index: number, direction: "up" | "down") {
    setImages((current) => {
      const next = [...current];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= next.length) {
        return current;
      }

      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];

      return next;
    });
  }

  function clearAll() {
    images.forEach((item) => URL.revokeObjectURL(item.preview));
    setImages([]);
    setError("");
  }

  async function createPdf() {
    if (images.length === 0) {
      setError("Please add at least one image.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      let pdf: jsPDF | null = null;

      for (let index = 0; index < images.length; index++) {
        const item = images[index];
        const image = await loadImage(item.preview);

        const selectedOrientation =
          pageSize === "original"
            ? image.width >= image.height
              ? "landscape"
              : "portrait"
            : orientation;

        const selectedFormat =
          pageSize === "original"
            ? [image.width * 0.264583, image.height * 0.264583]
            : pageSize;

        if (!pdf) {
          pdf = new jsPDF({
            orientation: selectedOrientation,
            unit: "mm",
            format: selectedFormat,
            compress: true,
          });
        } else {
          pdf.addPage(selectedFormat, selectedOrientation);
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const marginValue = pageSize === "original" ? 0 : marginMap[margin];

        const availableWidth = pageWidth - marginValue * 2;
        const availableHeight = pageHeight - marginValue * 2;

        const imageRatio = image.width / image.height;
        const pageRatio = availableWidth / availableHeight;

        let renderWidth: number;
        let renderHeight: number;

        if (imageRatio > pageRatio) {
          renderWidth = availableWidth;
          renderHeight = availableWidth / imageRatio;
        } else {
          renderHeight = availableHeight;
          renderWidth = availableHeight * imageRatio;
        }

        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;

        const format = item.file.type === "image/png" ? "PNG" : "JPEG";

        pdf.addImage(
          image,
          format,
          x,
          y,
          renderWidth,
          renderHeight,
          undefined,
          "FAST"
        );
      }

      pdf?.save("sp-pdf-tools-images.pdf");
    } catch (conversionError) {
      console.error(conversionError);
      setError(
        "The PDF could not be created. Please remove any damaged image and try again."
      );
    } finally {
      setIsProcessing(false);
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
            <FileImage className="h-5 w-5 text-purple-600" />
            JPG to PDF
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              JPG to PDF converter
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Convert images into one PDF
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Upload JPG, JPEG or PNG images, arrange their order and download
              them as one PDF document.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div
              {...getRootProps()}
              className={`rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
                isDragActive
                  ? "border-purple-500 bg-purple-50"
                  : "border-purple-300 bg-purple-50/50"
              }`}
            >
              <input {...getInputProps()} />

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200">
                <Upload className="h-8 w-8" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                {isDragActive
                  ? "Drop your images here"
                  : "Select JPG or PNG images"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Drag and drop multiple images or click below to browse.
              </p>

              <button
                type="button"
                onClick={open}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white"
              >
                <ImagePlus className="h-5 w-5" />
                Choose images
              </button>
            </div>

            {images.length > 0 && (
              <>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Selected images
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {images.length} image{images.length === 1 ? "" : "s"} ·{" "}
                      {formatBytes(totalSize)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove all
                  </button>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((item, index) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <div className="aspect-[4/3] bg-slate-100">
                        <img
                          src={item.preview}
                          alt={item.file.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="p-4">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {index + 1}. {item.file.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatBytes(item.file.size)}
                        </p>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => moveImage(index, "up")}
                            disabled={index === 0}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => moveImage(index, "down")}
                            disabled={index === images.length - 1}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => removeImage(item.id)}
                            className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:grid-cols-3">
                  <div>
                    <label className="text-sm font-bold text-slate-900">
                      Page size
                    </label>

                    <select
                      value={pageSize}
                      onChange={(event) =>
                        setPageSize(event.target.value as PageSize)
                      }
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
                    >
                      <option value="a4">A4</option>
                      <option value="letter">Letter</option>
                      <option value="original">Original image size</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-900">
                      Orientation
                    </label>

                    <select
                      value={orientation}
                      disabled={pageSize === "original"}
                      onChange={(event) =>
                        setOrientation(event.target.value as Orientation)
                      }
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm disabled:opacity-50"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-900">
                      Margin
                    </label>

                    <select
                      value={margin}
                      disabled={pageSize === "original"}
                      onChange={(event) =>
                        setMargin(event.target.value as MarginSize)
                      }
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm disabled:opacity-50"
                    >
                      <option value="none">No margin</option>
                      <option value="small">Small margin</option>
                      <option value="large">Large margin</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={createPdf}
                  disabled={isProcessing}
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      Create and download PDF
                    </>
                  )}
                </button>
              </>
            )}

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
                Private processing
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Images are processed directly in your browser.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <ImagePlus className="h-6 w-6 text-purple-600" />
              <h3 className="mt-3 font-bold text-slate-900">
                Multiple images
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Combine several JPG and PNG files into one PDF.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <Download className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 font-bold text-slate-900">
                Instant download
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Download the finished document immediately.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}