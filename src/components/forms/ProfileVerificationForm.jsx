"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextareaField from "@/components/ui/TextareaField";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";
import { profileVerificationValidation } from "@/validation/profileVerificationValidation";

export default function ProfileVerificationForm({ onSubmit, loading }) {
  const user = useSelector((state) => state.auth.user);

  // --- STEP STATE (5 Steps) ---
  const [step, setStep] = useState(1);
  const [sameAsHome, setSameAsHome] = useState(false);

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

  const [errors, setErrors] = useState({});

  // Fields that should only contain letters and spaces
  const textOnlyFields = [
    'homeCity', 'homeState', 'homeLandmark', 
    'businessCity', 'businessState', 'businessLandmark',
    'fullName', 'companyName'
  ];

  // Format Aadhaar number: 1234-4567-4568
  const formatAadhaar = (value) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < digits.length && i < 12; i++) {
      if (i === 4 || i === 8) {
        formatted += '-';
      }
      formatted += digits[i];
    }
    return formatted;
  };

  // Format PAN number: First 5 letters, then 4 numbers, then 1 letter
  const formatPAN = (value) => {
    let formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let result = '';
    for (let i = 0; i < formatted.length && i < 10; i++) {
      if (i < 5) {
        if (!/[A-Z]/.test(formatted[i])) continue;
        result += formatted[i];
      } else if (i < 9) {
        if (!/[0-9]/.test(formatted[i])) continue;
        result += formatted[i];
      } else {
        if (!/[A-Z]/.test(formatted[i])) continue;
        result += formatted[i];
      }
    }
    return result;
  };

  const handleFieldChange = (name, eOrValue) => {
    const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
    let cleanedValue = value;
    
    if (textOnlyFields.includes(name)) {
      cleanedValue = value.replace(/[^A-Za-z\s\-'\.]/g, '');
    }
    if (name === 'homePin' || name === 'businessPin' || name === 'phoneNumber') {
      cleanedValue = value.replace(/\D/g, '');
    }
    if (name === 'pan') {
      cleanedValue = formatPAN(value);
    }
    if (name === 'aadhaar') {
      cleanedValue = formatAadhaar(value);
    }
    
    setForm((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));

    setErrors((prev) => {
      if (!prev || !prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSameAsHomeChange = (e) => {
    const checked = e.target.checked;
    setSameAsHome(checked);
    
    if (checked) {
      setForm((prev) => ({
        ...prev,
        businessAddress: prev.homeAddress,
        businessPin: prev.homePin,
        businessCity: prev.homeCity,
        businessState: prev.homeState,
        businessLandmark: prev.homeLandmark,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        businessAddress: "",
        businessPin: "",
        businessCity: "",
        businessState: "",
        businessLandmark: "",
      }));
    }
  };

  // --- NAVIGATION LOGIC ---
  const validateStep = () => {
    let schema;
    let dataToValidate = { ...form };

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
        dataToValidate.aadhaar = form.aadhaar.replace(/-/g, '');
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

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      console.log("Zod Validation Failed on Step " + step + ":", result.error.format());
      const { fieldErrors } = result.error.flatten();
      const mapped = Object.fromEntries(
        Object.entries(fieldErrors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
      );
      setErrors(mapped);

      const firstErrorMessage = Object.values(mapped).find(Boolean) || "Please fill all required fields correctly.";
      toast.error(firstErrorMessage);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- SUBMISSION LOGIC ---
  const submit = async (e) => {
    e.preventDefault();
    const aadhaarWithoutDashes = form.aadhaar.replace(/-/g, '');
    const formToValidate = {
      ...form,
      aadhaar: aadhaarWithoutDashes,
    };
    
    const result = profileVerificationValidation.safeParse(formToValidate);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      const mapped = Object.fromEntries(
        Object.entries(fieldErrors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
      );
      setErrors(mapped);
      const firstErrorMessage = Object.values(mapped).find(Boolean) || "Validation failed";
      toast.error(firstErrorMessage);
      return;
    }

    setErrors({});
    const currentUserId = user?.id || form.userId;

    if (!currentUserId) {
      toast.error("User ID missing. Ensure you are logged in.");
      return;
    }

    // backend validation key rules ke mutabik payload restructure kiya gaya hai
    const structuredPayload = {
      userId: currentUserId,
      registrationNumber: user?.registrationNumber,
      fullName: form.fullName,
      dob: form.dob, 
      gender: form.gender, 
      email: form.email,
      phoneNumber: form.phoneNumber,
      companyName: form.companyName || "",
      businessType: form.businessType,
      kycType: form.kycType,
      remarks: form.remarks || "",
      
      // Addresses converted to standard object structure inside Array
      addresses: [
        {
          type: "HOME",
          address: form.homeAddress,
          city: form.homeCity,
          state: form.homeState,
          pinCode: form.homePin,
          landmark: form.homeLandmark || ""
        },
        {
          type: "BUSINESS",
          address: form.businessAddress || form.homeAddress,
          city: form.businessCity || form.homeCity,
          state: form.businessState || form.homeState,
          pinCode: form.businessPin || form.homePin,
          landmark: form.businessLandmark || ""
        }
      ],

      // Documents parsed to specific document type item array
      documents: [
        {
          type: "PAN",
          documentNumber: form.pan,
        },
        {
          type: "AADHAAR",
          documentNumber: aadhaarWithoutDashes,
        },
        ...(form.gst ? [{
          type: "GST",
          documentNumber: form.gst,
        }] : [])
      ]
    };

    // transformed format parent submit call ko transfer hoga
    const executionResult = await onSubmit(structuredPayload);
    if (executionResult?.success) {
      toast.success(executionResult.message || "KYC Submitted Successfully!");
    } else {
      toast.error(executionResult?.message || "KYC Submission Failed.");
    }
  };

  const FileUploadUI = ({ label, name, accept, fileValue }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
      const { name: fieldName, files: selectedFiles } = e.target;
      if (selectedFiles && selectedFiles[0]) {
        setFiles((prev) => ({
          ...prev,
          [fieldName]: selectedFiles[0],
        }));
      }
    };

    const getFileTypes = (acceptStr) => {
      if (!acceptStr) return [];
      return acceptStr.split(',').map(type => type.trim());
    };

    return (
      <div className="col-span-1">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
        </label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-400 ${
            fileValue ? "border-emerald-400 bg-emerald-50/30" : "border-slate-300"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            name={name}
            accept={accept}
            onChange={handleFileSelect}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer focus:outline-none"
          />
          {fileValue ? (
            <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium truncate max-w-[150px]">
                {fileValue.name || "File selected"}
              </span>
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-400">
              Supported: {getFileTypes(accept).join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  };

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

  const aadhaarDigitsCount = form.aadhaar.replace(/\D/g, '').length;

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
              className={`flex items-center justify-center w-10 h-10 rounded-full border-4 ${
                step >= num
                  ? "bg-indigo-600 border-indigo-100 text-white"
                  : "bg-slate-100 border-white text-slate-400"
              } font-bold shadow-sm transition-all duration-300`}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1">
                <InputField
                  label="Full Name *"
                  name="fullName"
                  placeholder="Enter full name (letters only)"
                  value={form.fullName}
                  onChange={(e) => handleFieldChange("fullName", e)}
                  error={errors.fullName}
                  required={true}
                />
              </div>
              <div className="col-span-1">
                <InputField
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  value={form.dob}
                  onChange={(e) => handleFieldChange("dob", e)}
                  error={errors.dob}
                />
              </div>
              <div className="col-span-1">
                <SelectField
                  label="Gender"
                  value={form.gender}
                  onChange={(val) => handleFieldChange("gender", val)}
                  error={errors.gender}
                  options={[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                    { label: "Other", value: "OTHER" },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <InputField
                  label="Email *"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={(e) => handleFieldChange("email", e)}
                  error={errors.email}
                  required={true}
                />
              </div>
              <div className="col-span-1">
                <InputField
                  label="Phone Number *"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={form.phoneNumber}
                  onChange={(e) => handleFieldChange("phoneNumber", e)}
                  error={errors.phoneNumber}
                  required={true}
                  maxLength={10}
                />
              </div>
              <div className="col-span-1">
                <InputField
                  label="Company Name"
                  name="companyName"
                  placeholder="Enter company name (letters only)"
                  value={form.companyName}
                  onChange={(e) => handleFieldChange("companyName", e)}
                  error={errors.companyName}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <SelectField
                  label="Business Type"
                  value={form.businessType}
                  onChange={(val) => handleFieldChange("businessType", val)}
                  error={errors.businessType}
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
          </div>
        )}

        {/* --- STEP 2: Addresses --- */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Home Address</h2>
              <div className="space-y-5">
                <InputField
                  label="Address *"
                  name="homeAddress"
                  placeholder="Enter home address"
                  value={form.homeAddress}
                  onChange={(e) => handleFieldChange("homeAddress", e)}
                  error={errors.homeAddress}
                />
                <div className="grid grid-cols-2 gap-5">
                  <InputField
                    label="PIN Code"
                    name="homePin"
                    placeholder="Enter PIN code"
                    value={form.homePin}
                    onChange={(e) => handleFieldChange("homePin", e)}
                    error={errors.homePin}
                    maxLength={6}
                  />
                  <InputField
                    label="City *"
                    name="homeCity"
                    placeholder="Enter city (letters only)"
                    value={form.homeCity}
                    onChange={(e) => handleFieldChange("homeCity", e)}
                    error={errors.homeCity}
                  />
                </div>
                <InputField
                  label="State *"
                  name="homeState"
                  placeholder="Enter state (letters only)"
                  value={form.homeState}
                  onChange={(e) => handleFieldChange("homeState", e)}
                  error={errors.homeState}
                />
                <InputField
                  label="Landmark"
                  name="homeLandmark"
                  placeholder="Enter landmark (letters only)"
                  value={form.homeLandmark}
                  onChange={(e) => handleFieldChange("homeLandmark", e)}
                  error={errors.homeLandmark}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Business Address</h2>
              <div className="mb-6 flex items-center gap-3 p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <input
                  type="checkbox"
                  id="sameAsHome"
                  checked={sameAsHome}
                  onChange={handleSameAsHomeChange}
                  className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="sameAsHome" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                  Same as Home Address
                </label>
                <span className="text-xs text-slate-500 ml-auto">
                  {sameAsHome ? "✅ Auto-filled" : "Check to copy home address"}
                </span>
              </div>

              <div className="space-y-5">
                <InputField
                  label="Address"
                  name="businessAddress"
                  placeholder="Enter business address"
                  value={form.businessAddress}
                  onChange={(e) => handleFieldChange("businessAddress", e)}
                  error={errors.businessAddress}
                  disabled={sameAsHome}
                />
                <div className="grid grid-cols-2 gap-5">
                  <InputField
                    label="PIN Code"
                    name="businessPin"
                    placeholder="Enter PIN code"
                    value={form.businessPin}
                    onChange={(e) => handleFieldChange("businessPin", e)}
                    error={errors.businessPin}
                    maxLength={6}
                    disabled={sameAsHome}
                  />
                  <InputField
                    label="City"
                    name="businessCity"
                    placeholder="Enter city (letters only)"
                    value={form.businessCity}
                    onChange={(e) => handleFieldChange("businessCity", e)}
                    error={errors.businessCity}
                    disabled={sameAsHome}
                  />
                </div>
                <InputField
                  label="State"
                  name="businessState"
                  placeholder="Enter state (letters only)"
                  value={form.businessState}
                  onChange={(e) => handleFieldChange("businessState", e)}
                  error={errors.businessState}
                  disabled={sameAsHome}
                />
                <InputField
                  label="Landmark"
                  name="businessLandmark"
                  placeholder="Enter landmark (letters only)"
                  value={form.businessLandmark}
                  onChange={(e) => handleFieldChange("businessLandmark", e)}
                  error={errors.businessLandmark}
                  disabled={sameAsHome}
                />
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 3: Documents --- */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Document Uploads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <InputField
                  label="PAN Number"
                  name="pan"
                  placeholder="e.g., ABCDE1234F"
                  value={form.pan}
                  onChange={(e) => handleFieldChange("pan", e)}
                  error={errors.pan}
                  maxLength={10}
                />
                <FileUploadUI label="PAN Card Upload" name="pan" accept=".pdf,.jpg,.jpeg,.png" fileValue={files.pan} />
              </div>

              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <InputField
                  label="Aadhaar Number"
                  name="aadhaar"
                  placeholder="e.g., 1234-4567-4568"
                  value={form.aadhaar}
                  onChange={(e) => handleFieldChange("aadhaar", e)}
                  error={errors.aadhaar}
                  maxLength={14}
                />
                <div className="flex justify-between items-center text-xs px-1 -mt-2">
                  <span className={aadhaarDigitsCount < 12 ? "text-rose-500 font-medium" : "text-slate-400"}>
                    {aadhaarDigitsCount === 0 && errors.aadhaar ? "Aadhaar must be 12 digits" : `${aadhaarDigitsCount}/12 digits`}
                  </span>
                  {aadhaarDigitsCount === 12 && (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">✓ Complete</span>
                  )}
                </div>
                <FileUploadUI label="Aadhaar Card Upload" name="aadhaar" accept=".pdf,.jpg,.jpeg,.png" fileValue={files.aadhaar} />
              </div>

              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <InputField
                  label="GST Number"
                  name="gst"
                  placeholder="Enter GST number"
                  value={form.gst}
                  onChange={(e) => handleFieldChange("gst", e)}
                  error={errors.gst}
                />
                <FileUploadUI label="GST Certificate Upload" name="gst" accept=".pdf,.jpg,.jpeg,.png" fileValue={files.gst} />
              </div>
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-end">
                <FileUploadUI label="Owner Photo" name="ownerPhoto" accept=".jpg,.jpeg,.png" fileValue={files.ownerPhoto} />
              </div>
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100 md:col-span-2 md:w-1/2 md:mx-auto">
                <FileUploadUI label="Business Photo" name="businessPhoto" accept=".jpg,.jpeg,.png" fileValue={files.businessPhoto} />
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 4: Remarks --- */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Additional Info</h2>
            <div className="grid grid-cols-1 w-full">
              <TextareaField
                label="Remarks / Notes"
                name="remarks"
                placeholder="Enter any additional remarks here..."
                rows={4}
                value={form.remarks}
                onChange={(e) => handleFieldChange("remarks", e)}
                error={errors.remarks}
              />
            </div>
          </div>
        )}

        {/* --- STEP 5: REVIEW & FINAL SUBMIT --- */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Review Your Details</h2>
              <p className="text-slate-500 mt-2">Please verify all the information before final submission.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-100">1. Basic Information</h3>
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

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-100">2. Addresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Home Address</h4>
                  <p className="text-sm text-slate-800">{form.homeAddress || "-"}</p>
                  <p className="text-sm text-slate-800">{form.homeCity}, {form.homeState} - {form.homePin}</p>
                  <p className="text-sm text-slate-500 mt-1">Landmark: {form.homeLandmark || "-"}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Business Address</h4>
                  <p className="text-sm text-slate-800">{form.businessAddress || "-"}</p>
                  <p className="text-sm text-slate-800">{form.businessCity}, {form.businessState} - {form.businessPin}</p>
                  <p className="text-sm text-slate-500 mt-1">Landmark: {form.businessLandmark || "-"}</p>
                  {sameAsHome && (
                    <span className="inline-block mt-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                      Same as Home Address
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-100">3. Documents & Remarks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">Provided ID Numbers</h4>
                  <div className="space-y-3">
                    <SummaryItem label="PAN Number" value={form.pan} />
                    <SummaryItem label="Aadhaar Number" value={form.aadhaar} />
                    <SummaryItem label="GST Number" value={form.gst} />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">Files Selected</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      {files.pan ? <span className="text-emerald-500">✅ PAN Uploaded</span> : <span className="text-rose-400">❌ PAN Missing</span>}
                    </li>
                    <li className="flex items-center gap-2">
                      {files.aadhaar ? <span className="text-emerald-500">✅ Aadhaar Uploaded</span> : <span className="text-rose-400">❌ Aadhaar Missing</span>}
                    </li>
                    <li className="flex items-center gap-2">
                      {files.gst ? <span className="text-emerald-500">✅ GST Uploaded</span> : <span className="text-slate-400">➖ GST Missing</span>}
                    </li>
                    <li className="flex items-center gap-2">
                      {files.ownerPhoto ? <span className="text-emerald-500">✅ Owner Photo Uploaded</span> : <span className="text-rose-400">❌ Photo Missing</span>}
                    </li>
                    <li className="flex items-center gap-2">
                      {files.businessPhoto ? <span className="text-emerald-500">✅ Business Photo Uploaded</span> : <span className="text-rose-400">❌ Business Photo Missing</span>}
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
                loading={loading}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                Submit Final KYC ✓
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}