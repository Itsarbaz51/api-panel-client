"use client";

import { useDispatch } from "react-redux";
import ProfileVerificationForm from "@/components/forms/ProfileVerificationForm";
import { useCreateKyc } from "@/hooks/useProfileVerification";
import { addKyc } from "@/store/profileVerificationSlice";

export default function ProfileVerificationApplyClient() {
  const dispatch = useDispatch();
  const createKyc = useCreateKyc();

  const uploadFileMock = async (file) => {
    if (!file) return "";
    
    try {

      
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    } catch (e) {
      console.error("File upload failed:", e);
      return "";
    }
  };

  const handleSubmit = async (structuredPayload) => {
    try {
     
      const updatedDocuments = await Promise.all(
        structuredPayload.documents.map(async (doc) => {
          
          return {
            ...doc,
            fileUrl: "https://placehold.co/600x400.png", 
          };
        })
      );

      
      const finalPayload = {
        ...structuredPayload,
        documents: updatedDocuments,
        
        ownerPhoto: "https://placehold.co/150x150.png",
        businessPhoto: "https://placehold.co/600x400.png",
      };

      
      const res = await createKyc.mutateAsync(finalPayload);

      dispatch(addKyc(res.data ?? res));

      return {
        success: true,
        message: "Profile Verification Submitted Successfully",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Profile Verification Failed",
      };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto">
        <ProfileVerificationForm
          onSubmit={handleSubmit}
          loading={createKyc.isPending}
        />
      </div>
    </div>
  );
}