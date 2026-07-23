"use client";

import Input from "@/components/ui/InputField";
import FileUpload from "@/components/ui/FileUpload";
import Checkbox from "@/components/ui/Checkbox";

export default function DocumentStep({
  formData,
  errors,
  declaration,
  setDeclaration,
  handleDocumentChange,
}) {
  const docs = formData.documents;

  const getDoc = (type) => docs.find((item) => item.type === type);

  const update = (type, field, value) => {
    const index = docs.findIndex((item) => item.type === type);

    handleDocumentChange(index, field, value);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold">Upload Documents</h2>

        <p className="mt-2 text-slate-500">Upload all required documents.</p>
      </div>

      <div className="grid gap-8">
        {/* Aadhaar */}

        <div className="rounded-xl border p-6">
          <h3 className="mb-5 font-semibold">Aadhaar Card</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Aadhaar Number"
              value={getDoc("AADHAR")?.documentNumber || ""}
              onChange={(e) =>
                update("AADHAR", "documentNumber", e.target.value)
              }
            />

            <FileUpload
              label="Upload Aadhaar"
              accept=".jpg,.jpeg,.png,.pdf"
              value={getDoc("AADHAR")?.file}
              onChange={(file) => update("AADHAR", "file", file)}
            />
          </div>
        </div>

        {/* PAN */}

        <div className="rounded-xl border p-6">
          <h3 className="mb-5 font-semibold">PAN Card</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="PAN Number"
              value={getDoc("PAN")?.documentNumber || ""}
              onChange={(e) => update("PAN", "documentNumber", e.target.value)}
            />

            <FileUpload
              label="Upload PAN"
              accept=".jpg,.jpeg,.png,.pdf"
              value={getDoc("PAN")?.file}
              onChange={(file) => update("PAN", "file", file)}
            />
          </div>
        </div>

        {/* GST */}

        <div className="rounded-xl border p-6">
          <h3 className="mb-5 font-semibold">GST Certificate</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="GST Number"
              value={getDoc("GST")?.documentNumber || ""}
              onChange={(e) => update("GST", "documentNumber", e.target.value)}
            />

            <FileUpload
              label="Upload GST"
              accept=".jpg,.jpeg,.png,.pdf"
              value={getDoc("GST")?.file}
              onChange={(file) => update("GST", "file", file)}
            />
          </div>
        </div>

        {/* User Photo */}

        <div className="rounded-xl border p-6">
          <h3 className="mb-5 font-semibold">User Photo</h3>

          <FileUpload
            label="Upload User Photo"
            accept=".jpg,.jpeg,.png"
            value={getDoc("USER_PHOTO")?.file}
            onChange={(file) => update("USER_PHOTO", "file", file)}
          />
        </div>

        {/* Business Photo */}

        <div className="rounded-xl border p-6">
          <h3 className="mb-5 font-semibold">Business / Office Photo</h3>

          <FileUpload
            label="Upload Business Photo"
            accept=".jpg,.jpeg,.png"
            value={getDoc("BUSINESS_PHOTO")?.file}
            onChange={(file) => update("BUSINESS_PHOTO", "file", file)}
          />
        </div>

        {/* Declaration */}

        <div className="rounded-xl border bg-slate-50 p-6">
          <Checkbox
            checked={declaration}
            onChange={(e) => setDeclaration(e.target.checked)}
            label="I hereby declare that all the information and documents provided are true and correct."
          />
        </div>
      </div>
    </div>
  );
}
