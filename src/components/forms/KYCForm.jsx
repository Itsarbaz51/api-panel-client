'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import TextareaField from '@/components/ui/TextareaField';
import Button from '@/components/ui/Button';
import { useSelector } from 'react-redux';
import { apiClient } from '@/lib/apiClient';

export default function KYCForm({ onSubmit, loading }) {
    const user = useSelector((state) => state.auth.user);
    
    const [form, setForm] = useState({
        userId: user?.id || '',
        registrationNumber: '',
        fullName: '',
        dob: '',
        gender: 'MALE',
        email: '',
        phoneNumber: '',
        companyName: '',
        businessType: 'PVT_LTD',
        kycType: 'MANUAL',
        remarks: '',
        homeAddress: '',
        homePin: '',
        homeState: '',
        homeCity: '',
        homeLandmark: '',
        businessAddress: '',
        businessPin: '',
        businessState: '',
        businessCity: '',
        businessLandmark: '',
        pan: '',       // Added missing field
        aadhaar: '',   // Added missing field
        gst: '',       // Added missing field
    });

    const [files, setFiles] = useState({
        pan: null,
        aadhaar: null,
        gst: null,
        ownerPhoto: null,
        businessPhoto: null,
    });

    const [uploading, setUploading] = useState(false);

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
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
        formData.append('file', file);
        formData.append('type', type);

        try {
            // Use apiClient so requests go to NEXT_PUBLIC_API_URL (backend)
            const data = await apiClient('/upload', {
                method: 'POST',
                body: formData,
            });

            return data?.url;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        // 1. Get the latest User ID from Redux to avoid stale state issues
        const currentUserId = user?.id || form.userId;

        console.log("Validation Check ->", { currentUserId, fullName: form.fullName, email: form.email, phone: form.phoneNumber });

        // 2. Use currentUserId in validation
        if (!currentUserId || !form.fullName || !form.email || !form.phoneNumber) {
            toast.error('Please fill in all required fields (Ensure you are logged in)');
            return;
        }

        setUploading(true);
        toast.loading('Uploading documents...', { id: 'upload' });

        try {
            const uploadPromises = [];
            const fileUrls = {};

            if (files.pan) uploadPromises.push(uploadFile(files.pan, 'PAN').then(url => { fileUrls.panUrl = url; }));
            if (files.aadhaar) uploadPromises.push(uploadFile(files.aadhaar, 'AADHAAR').then(url => { fileUrls.aadhaarUrl = url; }));
            if (files.gst) uploadPromises.push(uploadFile(files.gst, 'GST').then(url => { fileUrls.gstUrl = url; }));
            if (files.ownerPhoto) uploadPromises.push(uploadFile(files.ownerPhoto, 'OWNER_PHOTO').then(url => { fileUrls.ownerPhoto = url; }));
            if (files.businessPhoto) uploadPromises.push(uploadFile(files.businessPhoto, 'BUSINESS_PHOTO').then(url => { fileUrls.businessPhoto = url; }));

            await Promise.all(uploadPromises);
            toast.success('Documents uploaded successfully', { id: 'upload' });

            const payload = {
                userId: currentUserId, // 3. Use currentUserId here as well
                registrationNumber: form.registrationNumber,
                fullName: form.fullName,
                dob: form.dob,
                gender: form.gender,
                email: form.email,
                phoneNumber: form.phoneNumber,
                companyName: form.companyName,
                businessType: form.businessType,
                kycType: form.kycType,
                remarks: form.remarks,
                metadata: { source: 'admin-panel' },
                addresses: [
                    {
                        type: 'HOME',
                        address: form.homeAddress,
                        pinCode: form.homePin,
                        state: form.homeState,
                        city: form.homeCity,
                        landmark: form.homeLandmark,
                    },
                    {
                        type: 'BUSINESS',
                        address: form.businessAddress,
                        pinCode: form.businessPin,
                        state: form.businessState,
                        city: form.businessCity,
                        landmark: form.businessLandmark,
                    },
                ],
                documents: [
                    { type: 'OWNER_PAN', fileUrl: fileUrls.panUrl || '', documentNumber: form.pan },
                    { type: 'AADHAAR', fileUrl: fileUrls.aadhaarUrl || '', documentNumber: form.aadhaar },
                    { type: 'GST', fileUrl: fileUrls.gstUrl || '', documentNumber: form.gst },
                    { type: 'OWNER_PHOTO', fileUrl: fileUrls.ownerPhoto || '' },
                    { type: 'BUSINESS_PHOTO', fileUrl: fileUrls.businessPhoto || '' },
                ],
            };

            onSubmit(payload);
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to upload documents. Please try again.', { id: 'upload' });
        } finally {
            setUploading(false);
        }
    };

    // Helper component for stylized file uploads
    const FileUploadUI = ({ label, name, accept, fileValue }) => (
        <div className="col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
            <div className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-400 ${fileValue ? 'border-emerald-400 bg-primary/10/30' : 'border-slate-300'}`}>
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer focus:outline-none"
                />
                {fileValue && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs  font-medium bg-white px-2 py-1 rounded-md shadow-sm border border-primary/20">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        Selected
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <form onSubmit={submit} className="space-y-8">
            
            {/* Basic Information Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                    Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Registration Number" name="registrationNumber" placeholder="Enter registration number" value={form.registrationNumber} onChange={change} />
                    <InputField label="Full Name *" name="fullName" placeholder="Enter full name" value={form.fullName} onChange={change} required={true} />
                    <InputField type="date" label="Date of Birth" name="dob" value={form.dob} onChange={change} />
                    <SelectField label="Gender" name="gender" value={form.gender} onChange={change} options={[{ label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' }, { label: 'Other', value: 'OTHER' }]} />
                    <InputField label="Email *" name="email" type="email" placeholder="Enter email address" value={form.email} onChange={change} required={true} />
                    <InputField label="Phone Number *" name="phoneNumber" type="tel" placeholder="Enter phone number" value={form.phoneNumber} onChange={change} required={true} />
                    <InputField label="Company Name" name="companyName" placeholder="Enter company name" value={form.companyName} onChange={change} />
                    <SelectField label="Business Type" name="businessType" value={form.businessType} onChange={change} options={[{ label: 'Private Limited', value: 'PVT_LTD' }, { label: 'Public Limited', value: 'PUB_LTD' }, { label: 'Partnership', value: 'PARTNERSHIP' }, { label: 'Sole Proprietorship', value: 'PROPRIETORSHIP' }, { label: 'LLP', value: 'LLP' }]} />
                    <SelectField label="KYC Type" name="kycType" value={form.kycType} onChange={change} options={[{ label: 'Manual', value: 'MANUAL' }, { label: 'Digital', value: 'DIGITAL' }, { label: 'Aadhaar', value: 'AADHAAR' }]} />
                </div>
            </div>

            {/* Addresses Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Home Address */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                        Home Address
                    </h2>
                    <div className="space-y-5">
                        <InputField label="Address" name="homeAddress" placeholder="Enter home address" value={form.homeAddress} onChange={change} />
                        <div className="grid grid-cols-2 gap-5">
                            <InputField label="PIN Code" name="homePin" placeholder="Enter PIN code" value={form.homePin} onChange={change} />
                            <InputField label="City" name="homeCity" placeholder="Enter city" value={form.homeCity} onChange={change} />
                        </div>
                        <InputField label="State" name="homeState" placeholder="Enter state" value={form.homeState} onChange={change} />
                        <InputField label="Landmark" name="homeLandmark" placeholder="Enter landmark" value={form.homeLandmark} onChange={change} />
                    </div>
                </div>

                {/* Business Address */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span>
                        Business Address
                    </h2>
                    <div className="space-y-5">
                        <InputField label="Address" name="businessAddress" placeholder="Enter business address" value={form.businessAddress} onChange={change} />
                        <div className="grid grid-cols-2 gap-5">
                            <InputField label="PIN Code" name="businessPin" placeholder="Enter PIN code" value={form.businessPin} onChange={change} />
                            <InputField label="City" name="businessCity" placeholder="Enter city" value={form.businessCity} onChange={change} />
                        </div>
                        <InputField label="State" name="businessState" placeholder="Enter state" value={form.businessState} onChange={change} />
                        <InputField label="Landmark" name="businessLandmark" placeholder="Enter landmark" value={form.businessLandmark} onChange={change} />
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">4</span>
                    Document Uploads
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <InputField label="PAN Number" name="pan" placeholder="Enter PAN number" value={form.pan} onChange={change} />
                        <FileUploadUI label="PAN Card Upload" name="pan" accept=".pdf,.jpg,.jpeg,.png" fileValue={files.pan} />
                    </div>

                    <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <InputField label="Aadhaar Number" name="aadhaar" placeholder="Enter Aadhaar number" value={form.aadhaar} onChange={change} />
                        <FileUploadUI label="Aadhaar Card Upload" name="aadhaar" accept=".pdf,.jpg,.jpeg,.png" fileValue={files.aadhaar} />
                    </div>

                    <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <InputField label="GST Number" name="gst" placeholder="Enter GST number" value={form.gst} onChange={change} />
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

            {/* Remarks Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                 <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">5</span>
                    Additional Info
                </h2>
                <TextareaField label="Remarks / Notes" name="remarks" placeholder="Enter any additional remarks here..." rows={4} value={form.remarks} onChange={change} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4 border-t border-slate-200 mt-8">
                <Button type="button" variant="secondary" onClick={() => window.history.back()} className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 font-semibold shadow-sm transition-all">
                    Cancel
                </Button>
                <Button type="submit" loading={loading || uploading} className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center">
                    {uploading ? 'Uploading Files...' : 'Submit KYC'}
                </Button>
            </div>
        </form>
    );
}