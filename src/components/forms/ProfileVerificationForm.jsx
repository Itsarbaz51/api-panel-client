"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextareaField from "@/components/ui/TextareaField";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";
import { apiClient } from "@/lib/apiClient";
import { profileVerificationValidation } from "@/validation/profileVerificationValidation";

export default function ProfileVerificationForm({ onSubmit, loading }) {
  const user = useSelector((state) => state.auth.user);

  // --- STEP STATE (5 Steps) ---
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    userId: user?.id || "",
    fullName: "",
    dob: "",
    gender: "MALE",
    email: "",
    phoneNumber: "",
    companyName: "",
    businessType: "PVT_LTD",
    kycType: "MANUAL",
    remarks: "",
    homeAddress: "",
    homePin: "",
    homeState: "",
    homeCity: "",
    homeLandmark: "",
    businessAddress: "",
    businessPin: "",
    businessState: "",
    businessCity: "",
    businessLandmark: "",
    pan: "",
    aadhaar: "",
    gst: "",
  });

  const [files, setFiles] = useState({
    pan: null,
    aadhaar: null,
    gst: null,
    ownerPhoto: null,
    businessPhoto: null,
  });

  const [uploading, setUploading] = useState(false);

  const handleFieldChange = (name, eOrValue) => {
    const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles({
        ...files,
        [name]: selectedFiles[0],
      });
    }
  };

  const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    try {
      if (process.env.NEXT_PUBLIC_API_URL) {
        try {
          const data = await apiClient("/upload", {
            method: "POST",
            body: formData,
          });

          return data?.url;
        } catch (err) {
          console.warn(
            "External upload failed, falling back to local /api/upload",
            err,
          );
        }
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Local upload failed:", text);
        throw new Error(text || "File upload failed");
      }

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  // --- NAVIGATION LOGIC ---
  const validateStep = () => {
    let schema;

    switch (step) {
      case 1:
        schema = profileVerificationValidation.pick({
          fullName: true,
          dob: true,
          gender: true,
          email: true,
          phoneNumber: true,
          companyName: true,
          businessType: true,
          kycType: true,
        });
        break;

      case 2:
        schema = profileVerificationValidation.pick({
          homeAddress: true,
          homeCity: true,
          homeState: true,
          homePin: true,
          businessAddress: true,
          businessCity: true,
          businessState: true,
          businessPin: true,
        });
        break;

      case 3:
        schema = profileVerificationValidation.pick({
          pan: true,
          aadhaar: true,
          gst: true,
        });
        break;

      case 4:
        schema = profileVerificationValidation.pick({
          remarks: true,
        });
        break;

      default:
        return true;
    }

    const result = schema.safeParse(form);

    if (!result.success) {
      // 1. Log the exact error structure to the console for you to debug
      console.log(
        "Zod Validation Failed on Step " + step + ":",
        result.error.format(),
      );

      // 2. Alert the user with the precise message Zod generated
      const firstErrorMessage =
        result.error?.errors?.[0]?.message ||
        "Please fill all required fields correctly.";
      toast.error(firstErrorMessage);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    setStep((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- SUBMISSION LOGIC ---
  const submit = async (e) => {
    e.preventDefault();
    const result = profileVerificationValidation.safeParse(form);

    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    const currentUserId = user?.id || form.userId;

    if (!currentUserId) {
      toast.error("User ID missing. Ensure you are logged in.");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = [];
      const fileUrls = {};

      if (files.pan)
        uploadPromises.push(
          uploadFile(files.pan, "PAN").then((url) => {
            fileUrls.panUrl = url;
          }),
        );
      if (files.aadhaar)
        uploadPromises.push(
          uploadFile(files.aadhaar, "AADHAAR").then((url) => {
            fileUrls.aadhaarUrl = url;
          }),
        );
      if (files.gst)
        uploadPromises.push(
          uploadFile(files.gst, "GST").then((url) => {
            fileUrls.gstUrl = url;
          }),
        );
      if (files.ownerPhoto)
        uploadPromises.push(
          uploadFile(files.ownerPhoto, "OWNER_PHOTO").then((url) => {
            fileUrls.ownerPhoto = url;
          }),
        );
      if (files.businessPhoto)
        uploadPromises.push(
          uploadFile(files.businessPhoto, "BUSINESS_PHOTO").then((url) => {
            fileUrls.businessPhoto = url;
          }),
        );

      await Promise.all(uploadPromises);
      toast.success("Documents uploaded successfully", { id: "upload" });

      const payload = {
        registrationNumber: `KYC-${Date.now()}`,
        userId: currentUserId,
        fullName: form.fullName,
        dob: form.dob,
        gender: form.gender,
        email: form.email,
        phoneNumber: form.phoneNumber,
        companyName: form.companyName,
        businessType: form.businessType,
        kycType: form.kycType,
        remarks: form.remarks,
        metadata: { source: "admin-panel" },
        addresses: [
          {
            type: "HOME",
            address: form.homeAddress,
            pinCode: form.homePin,
            state: form.homeState,
            city: form.homeCity,
            landmark: form.homeLandmark,
          },
          {
            type: "BUSINESS",
            address: form.businessAddress,
            pinCode: form.businessPin,
            state: form.businessState,
            city: form.businessCity,
            landmark: form.businessLandmark,
          },
        ],
        documents: [
          {
            type: "OWNER_PAN",
            fileUrl: fileUrls.panUrl || "",
            documentNumber: form.pan,
          },
          {
            type: "AADHAAR",
            fileUrl: fileUrls.aadhaarUrl || "",
            documentNumber: form.aadhaar,
          },
          {
            type: "GST",
            fileUrl: fileUrls.gstUrl || "",
            documentNumber: form.gst,
          },
          { type: "OWNER_PHOTO", fileUrl: fileUrls.ownerPhoto || "" },
          { type: "BUSINESS_PHOTO", fileUrl: fileUrls.businessPhoto || "" },
        ],
      };

      // Await parent mutation execution
      const executionResult = await onSubmit(payload);

      if (executionResult?.success) {
        toast.success(executionResult.message || "KYC Submitted Successfully!");
      } else {
        toast.error(executionResult?.message || "KYC Submission Failed.");
      }
    } catch (error) {
      toast.error("Failed to upload documents. Please try again.", {
        id: "upload",
      });
    } finally {
      setUploading(false);
    }
  };

  const FileUploadUI = ({ label, name, accept, fileValue }) => (
    <div className="col-span-1">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-400 ${fileValue ? "border-emerald-400 bg-primary/10/30" : "border-slate-300"}`}
      >
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer focus:outline-none"
        />
        {fileValue && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs font-medium bg-white px-2 py-1 rounded-md shadow-sm border border-primary/20">
            <svg
              className="w-3 h-3 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Selected
          </div>
        )}
      </div>
    </div>
  );

  const SummaryItem = ({ label, value }) => (
    <div className="mb-2">
      <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </span>
      <span className="block text-sm text-slate-900 font-semibold mt-0.5">
        {value || <span className="text-slate-400 italic">Not Provided</span>}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          ></div>

          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-4 ${step >= num ? "bg-indigo-600 border-indigo-100 text-white" : "bg-slate-100 border-white text-slate-400"} font-bold shadow-sm transition-all duration-300`}
            >
              {num === 5 ? "✓" : num}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs font-medium text-slate-500 mt-2 px-1">
          <span>Basic Info</span>
          <span>Address</span>
          <span>Documents</span>
          <span>Remarks</span>
          <span>Review</span>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-8">
        
        {/* --- STEP 1: Basic Information --- */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name *"
                name="fullName"
                placeholder="Enter full name"
                value={form.fullName}
                onChange={(e) => handleFieldChange("fullName", e)}
                required={true}
              />
              <InputField
                type="date"
                label="Date of Birth"
                name="dob"
                value={form.dob}
                onChange={(e) => handleFieldChange("dob", e)}
              />
              <SelectField
                label="Gender"
                value={form.gender}
                onChange={(val) => handleFieldChange("gender", val)}
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                  { label: "Other", value: "OTHER" },
                ]}
              />
              <InputField
                label="Email *"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) => handleFieldChange("email", e)}
                required={true}
              />
              <InputField
                label="Phone Number *"
                name="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                value={form.phoneNumber}
                onChange={(e) => handleFieldChange("phoneNumber", e)}
                required={true}
                maxLength={10}
              />
              <InputField
                label="Company Name"
                name="companyName"
                placeholder="Enter company name"
                value={form.companyName}
                onChange={(e) => handleFieldChange("companyName", e)}
              />
              <SelectField
                label="Business Type"
                value={form.businessType}
                onChange={(val) => handleFieldChange("businessType", val)}
                options={[
                  { label: "Private Limited", value: "PVT_LTD" },
                  { label: "Public Limited", value: "PUB_LTD" },
                  { label: "Partnership", value: "PARTNERSHIP" },
                  { label: "Sole Proprietorship", value: "PROPRIETORSHIP" },
                  { label: "LLP", value: "LLP" },
                ]}
              />
            </div>
          </div>
        )}

        {/* --- STEP 2: Addresses --- */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Home Address
              </h2>
              <div className="space-y-5">
                <InputField
                  label="Address *"
                  name="homeAddress"
                  placeholder="Enter home address"
                  value={form.homeAddress}
                  onChange={(e) => handleFieldChange("homeAddress", e)}
                />
                <div className="grid grid-cols-2 gap-5">
                  <InputField
                    label="PIN Code"
                    name="homePin"
                    placeholder="Enter PIN code"
                    value={form.homePin}
                    onChange={(e) => handleFieldChange("homePin", e)}
                    maxLength={6}
                  />
                  <InputField
                    label="City *"
                    name="homeCity"
                    placeholder="Enter city"
                    value={form.homeCity}
                    onChange={(e) => handleFieldChange("homeCity", e)}
                  />
                </div>
                <InputField
                  label="State *"
                  name="homeState"
                  placeholder="Enter state"
                  value={form.homeState}
                  onChange={(e) => handleFieldChange("homeState", e)}
                />
                <InputField
                  label="Landmark"
                  name="homeLandmark"
                  placeholder="Enter landmark"
                  value={form.homeLandmark}
                  onChange={(e) => handleFieldChange("homeLandmark", e)}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Business Address
              </h2>
              <div className="space-y-5">
                <InputField
                  label="Address"
                  name="businessAddress"
                  placeholder="Enter business address"
                  value={form.businessAddress}
                  onChange={(e) => handleFieldChange("businessAddress", e)}
                />
                <div className="grid grid-cols-2 gap-5">
                  <InputField
                    label="PIN Code"
                    name="businessPin"
                    placeholder="Enter PIN code"
                    value={form.businessPin}
                    onChange={(e) => handleFieldChange("businessPin", e)}
                    maxLength={6}
                  />
                  <InputField
                    label="City"
                    name="businessCity"
                    placeholder="Enter city"
                    value={form.businessCity}
                    onChange={(e) => handleFieldChange("businessCity", e)}
                  />
                </div>
                <InputField
                  label="State"
                  name="businessState"
                  placeholder="Enter state"
                  value={form.businessState}
                  onChange={(e) => handleFieldChange("businessState", e)}
                />
                <InputField
                  label="Landmark"
                  name="businessLandmark"
                  placeholder="Enter landmark"
                  value={form.businessLandmark}
                  onChange={(e) => handleFieldChange("businessLandmark", e)}
                />
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 3: Documents --- */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Document Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <InputField
                  label="PAN Number"
                  name="pan"
                  placeholder="Enter PAN number"
                  value={form.pan}
                  onChange={(e) => handleFieldChange("pan", e)}
                />
                <FileUploadUI
                  label="PAN Card Upload"
                  name="pan"
                  accept=".pdf,.jpg,.jpeg,.png"
                  fileValue={files.pan}
                />
              </div>
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <InputField
                  label="Aadhaar Number"
                  name="aadhaar"
                  placeholder="Enter Aadhaar number"
                  value={form.aadhaar}
                  onChange={(e) => handleFieldChange("aadhaar", e)}
                  maxLength={12}
                />
                <FileUploadUI
                  label="Aadhaar Card Upload"
                  name="aadhaar"
                  accept=".pdf,.jpg,.jpeg,.png"
                  fileValue={files.aadhaar}
                />
              </div>
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <InputField
                  label="GST Number"
                  name="gst"
                  placeholder="Enter GST number"
                  value={form.gst}
                  onChange={(e) => handleFieldChange("gst", e)}
                />
                <FileUploadUI
                  label="GST Certificate Upload"
                  name="gst"
                  accept=".pdf,.jpg,.jpeg,.png"
                  fileValue={files.gst}
                />
              </div>
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-end">
                <FileUploadUI
                  label="Owner Photo"
                  name="ownerPhoto"
                  accept=".jpg,.jpeg,.png"
                  fileValue={files.ownerPhoto}
                />
              </div>
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100 md:col-span-2 md:w-1/2 md:mx-auto">
                <FileUploadUI
                  label="Business Photo"
                  name="businessPhoto"
                  accept=".jpg,.jpeg,.png"
                  fileValue={files.businessPhoto}
                />
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 4: Remarks --- */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Additional Info
            </h2>
            <div className="grid grid-cols-1 w-full">
              <TextareaField
                label="Remarks / Notes"
                name="remarks"
                placeholder="Enter any additional remarks here..."
                rows={4}
                value={form.remarks}
                onChange={(e) => handleFieldChange("remarks", e)}
              />
            </div>
          </div>
        )}

        {/* --- STEP 5: REVIEW & FINAL SUBMIT --- */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Review Your Details
              </h2>
              <p className="text-slate-500 mt-2">
                Please verify all the information before final submission.
              </p>
            </div>

            {/* Basic Info Summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-100">
                1. Basic Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryItem label="Full Name" value={form.fullName} />
                <SummaryItem label="Email" value={form.email} />
                <SummaryItem label="Phone" value={form.phoneNumber} />
                <SummaryItem label="DOB" value={form.dob} />
                <SummaryItem label="Gender" value={form.gender} />
                <SummaryItem label="Company" value={form.companyName} />
                <SummaryItem label="Business Type" value={form.businessType} />
                <SummaryItem label="KYC Type" value={form.kycType} />
              </div>
            </div>

            {/* Addresses Summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-100">
                2. Addresses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">
                    Home Address
                  </h4>
                  <p className="text-sm text-slate-800">
                    {form.homeAddress || "-"}
                  </p>
                  <p className="text-sm text-slate-800">
                    {form.homeCity}, {form.homeState} - {form.homePin}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Landmark: {form.homeLandmark || "-"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">
                    Business Address
                  </h4>
                  <p className="text-sm text-slate-800">
                    {form.businessAddress || "-"}
                  </p>
                  <p className="text-sm text-slate-800">
                    {form.businessCity}, {form.businessState} -{" "}
                    {form.businessPin}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Landmark: {form.businessLandmark || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents & Remarks Summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-100">
                3. Documents & Remarks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">
                    Provided ID Numbers
                  </h4>
                  <div className="space-y-3">
                    <SummaryItem label="PAN Number" value={form.pan} />
                    <SummaryItem label="Aadhaar Number" value={form.aadhaar} />
                    <SummaryItem label="GST Number" value={form.gst} />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">
                    Files Selected
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      {files.pan ? (
                        <span className="text-emerald-500">
                          ✅ PAN Uploaded
                        </span>
                      ) : (
                        <span className="text-rose-400">❌ PAN Missing</span>
                      )}
                    </li>
                    <li className="flex items-center gap-2">
                      {files.aadhaar ? (
                        <span className="text-emerald-500">
                          ✅ Aadhaar Uploaded
                        </span>
                      ) : (
                        <span className="text-rose-400">
                          ❌ Aadhaar Missing
                        </span>
                      )}
                    </li>
                    <li className="flex items-center gap-2">
                      {files.gst ? (
                        <span className="text-emerald-500">
                          ✅ GST Uploaded
                        </span>
                      ) : (
                        <span className="text-slate-400">➖ GST Missing</span>
                      )}
                    </li>
                    <li className="flex items-center gap-2">
                      {files.ownerPhoto ? (
                        <span className="text-emerald-500">
                          ✅ Owner Photo Uploaded
                        </span>
                      ) : (
                        <span className="text-rose-400">❌ Photo Missing</span>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-2 mt-2">
                  <SummaryItem label="Remarks / Notes" value={form.remarks} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Action Buttons --- */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-4 border-t border-slate-200 mt-8">
          <div>
            {step > 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrev}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 font-semibold shadow-sm transition-all"
              >
                ← Previous
              </Button>
            )}
          </div>
          <div className="flex gap-4 w-full sm:w-auto flex-col-reverse sm:flex-row">
            {step === 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 font-semibold shadow-sm transition-all"
              >
                Cancel
              </Button>
            )}

            {step < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Next Step →
              </Button>
            ) : (
              <Button
                type="submit"
                loading={loading || uploading}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                {uploading ? "Uploading Files..." : "Submit Final KYC ✓"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
