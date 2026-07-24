"use client";

import { useState } from "react";

import Input from "@/components/ui/InputField";
import FileUpload from "@/components/ui/FileUpload";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import ImagePreviewModal from "@/components/ImagePreviewModal";

export default function DocumentStep({
  formData,
  declaration,
  setDeclaration,
  handleDocumentChange,
}) {
  const docs = formData.documents;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState("");

  const getDoc = (type) => docs.find((d) => d.type === type);

  const update = (type, field, value) => {
    const index = docs.findIndex((d) => d.type === type);

    if (index !== -1) {
      handleDocumentChange(index, field, value);
    }
  };

  const renderDocument = ({
    title,
    type,
    numberLabel,
    hasNumber = true,
    accept = ".jpg,.jpeg,.png,.pdf",
  }) => {
    const doc = getDoc(type);

    return (
      <div className="rounded-xl border p-6">
        <h3 className="mb-5 font-semibold">{title}</h3>

        <div className="grid gap-6 md:grid-cols-2">
          {hasNumber && (
            <Input
              label={numberLabel}
              value={doc?.documentNumber || ""}
              onChange={(e) => update(type, "documentNumber", e.target.value)}
            />
          )}

          <div>
            <FileUpload
              label={`Upload ${title}`}
              accept={accept}
              value={doc?.file}
              onChange={(file) => update(type, "file", file)}
            />

            {/* Existing uploaded document */}
            {!doc?.file && doc?.fileUrl && (
              <div className="mt-3 rounded-lg border bg-slate-50 p-3">
                <p className="text-sm text-green-600 font-medium">
                  Existing document uploaded
                </p>

                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPreviewFile(doc.fileUrl);
                      setPreviewOpen(true);
                    }}
                  >
                    Preview
                  </Button>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded border px-3 py-2 text-sm"
                  >
                    Open
                  </a>
                </div>
              </div>
            )}

            {/* New file selected */}
            {doc?.file && (
              <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                <p className="text-sm text-green-700">
                  New File: <strong>{doc.file.name}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Upload Documents</h2>

          <p className="mt-2 text-slate-500">Upload all required documents.</p>
        </div>

        {renderDocument({
          title: "Aadhaar Card",
          type: "AADHAR",
          numberLabel: "Aadhaar Number",
        })}

        {renderDocument({
          title: "PAN Card",
          type: "PAN",
          numberLabel: "PAN Number",
        })}

        {renderDocument({
          title: "GST Certificate",
          type: "GST",
          numberLabel: "GST Number",
        })}

        {renderDocument({
          title: "User Photo",
          type: "USER_PHOTO",
          hasNumber: false,
          accept: ".jpg,.jpeg,.png",
        })}

        {renderDocument({
          title: "Business / Office Photo",
          type: "BUSINESS_PHOTO",
          hasNumber: false,
          accept: ".jpg,.jpeg,.png",
        })}

        <div className="rounded-xl border bg-slate-50 p-6">
          <Checkbox
            checked={declaration}
            onChange={(e) => setDeclaration(e.target.checked)}
            label="I hereby declare that all the information and documents provided are true and correct."
          />
        </div>
      </div>

      <ImagePreviewModal
        open={previewOpen}
        file={previewFile}
        onClose={() => {
          setPreviewOpen(false);
          setPreviewFile("");
        }}
      />
    </>
  );
}
