"use client";

import { UploadCloud, FileText, X } from "lucide-react";
import { useRef } from "react";

export default function FileUpload({
  label,
  accept = "*",
  value,
  onChange,
  error,
}) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl
          p-6 cursor-pointer
          transition-all
          bg-card
          hover:border-primary
          hover:bg-primary/5
          ${error ? "border-destructive" : "border-border"}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFile}
        />

        {!value ? (
          <div className="flex flex-col items-center gap-2">
            <UploadCloud className="h-10 w-10 text-primary" />

            <p className="text-sm font-medium">Click to upload</p>

            <p className="text-xs text-muted-foreground">JPG, PNG, PDF</p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-primary h-8 w-8" />

              <div>
                <p className="font-medium">{value.name}</p>

                <p className="text-xs text-muted-foreground">
                  {(value.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);

                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              <X className="h-5 w-5 text-destructive" />
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
