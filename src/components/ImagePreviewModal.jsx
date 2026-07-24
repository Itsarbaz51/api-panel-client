"use client";

import Button from "./ui/Button";

export default function ImagePreviewModal({ open, file, onClose }) {
  if (!open || !file) return null;

  const isPdf = file.toLowerCase().includes(".pdf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {isPdf ? (
        <iframe
          src={file}
          title="PDF Preview"
          className="h-[90vh] w-[90vw] rounded-lg bg-white"
        />
      ) : (
        <img
          src={file}
          alt="Preview"
          className="max-h-[90vh] max-w-[90vw] rounded-lg"
        />
      )}

      <Button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-2xl text-white"
      >
        ✕
      </Button>
    </div>
  );
}
