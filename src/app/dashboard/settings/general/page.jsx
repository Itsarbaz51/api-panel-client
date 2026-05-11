"use client";

import React, { useState } from "react";
import {
  Globe,
  Save,
  Camera,
  Image as ImageIcon,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  AlertCircle,
  Settings,
  Eye,
  Upload,
  X,
  CheckCircle,
  Sparkles,
  Brush,
} from "lucide-react";

export default function WebsiteSettings() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteDescription: "",
    websiteEmail: "",
    websitePhone: "",
    websiteAddress: "",
    favicon: null,
    logo: null,
    banner: null,
    maintenanceMode: false,
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
  });

  const [previewUrls, setPreviewUrls] = useState({
    logo: "",
    banner: "",
    favicon: "",
  });

  const handleFileChange = (field, file) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrls(prev => ({ ...prev, [field]: previewUrl }));
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✨ Website settings updated successfully!");
    }, 1500);
  };

  const removeImage = (field) => {
    setPreviewUrls(prev => ({ ...prev, [field]: "" }));
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <Brush className="text-white" size={28} />
            </div>
            <div>
              <p className="text-green-600 text-xs font-black uppercase tracking-[0.3em] mb-1">
                Dashboard Configuration
              </p>
              <h1 className="text-5xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Website Settings
              </h1>
            </div>
          </div>
          <p className="text-slate-500 text-lg ml-16">
            Customize your website appearance and information
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {[
            { id: "general", label: "General Info", icon: Globe },
            { id: "branding", label: "Branding", icon: Brush },
            { id: "social", label: "Social Links", icon: LinkIcon },
            { id: "advanced", label: "Advanced", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-green-600 border-t-2 border-l-2 border-r-2 border-green-200 shadow-sm"
                  : "text-slate-500 hover:text-green-600 hover:bg-white/50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE - Main Content */}
          <div className="lg:col-span-8">
            {/* General Information Tab */}
            {activeTab === "general" && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">General Information</h2>
                  <p className="text-green-100 text-sm mt-1">Basic website details and contact information</p>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Globe size={16} className="text-green-500" />
                        Website Name
                      </label>
                      <input
                        type="text"
                        name="websiteName"
                        value={formData.websiteName}
                        onChange={handleInputChange}
                        placeholder="Enter website name"
                        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Mail size={16} className="text-green-500" />
                        Website Email
                      </label>
                      <input
                        type="email"
                        name="websiteEmail"
                        value={formData.websiteEmail}
                        onChange={handleInputChange}
                        placeholder="admin@example.com"
                        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Phone size={16} className="text-green-500" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="websitePhone"
                        value={formData.websitePhone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <MapPin size={16} className="text-green-500" />
                        Website Address
                      </label>
                      <input
                        type="text"
                        name="websiteAddress"
                        value={formData.websiteAddress}
                        onChange={handleInputChange}
                        placeholder="123 Business St, City, Country"
                        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Website Description</label>
                    <textarea
                      name="websiteDescription"
                      value={formData.websiteDescription}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Write website description..."
                      className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none resize-none"
                    />
                    <p className="text-xs text-slate-400">This will appear in search engine results</p>
                  </div>
                </div>
              </div>
            )}

            {/* Branding Tab */}
            {activeTab === "branding" && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">Branding Assets</h2>
                  <p className="text-green-100 text-sm mt-1">Upload logos, banners, and favicons</p>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Logo Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700">Website Logo</label>
                      <div className="relative group">
                        {previewUrls.logo ? (
                          <div className="relative">
                            <img src={previewUrls.logo} alt="Logo" className="w-full h-40 object-contain rounded-2xl border-2 border-slate-200 bg-slate-50 p-4" />
                            <button
                              onClick={() => removeImage("logo")}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-40 border-3 border-dashed border-green-300 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 cursor-pointer hover:from-green-100 hover:to-emerald-100 transition-all">
                            <Upload size={32} className="text-green-400 mb-2" />
                            <span className="text-sm text-green-600 font-medium">Click to upload</span>
                            <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange("logo", e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Banner Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700">Website Banner</label>
                      <div className="relative group">
                        {previewUrls.banner ? (
                          <div className="relative">
                            <img src={previewUrls.banner} alt="Banner" className="w-full h-40 object-cover rounded-2xl border-2 border-slate-200" />
                            <button
                              onClick={() => removeImage("banner")}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-40 border-3 border-dashed border-emerald-300 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 cursor-pointer hover:from-emerald-100 hover:to-green-100 transition-all">
                            <Upload size={32} className="text-emerald-400 mb-2" />
                            <span className="text-sm text-emerald-600 font-medium">Click to upload</span>
                            <span className="text-xs text-slate-400 mt-1">1200x400px recommended</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange("banner", e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Favicon Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700">Favicon</label>
                      <div className="relative group">
                        {previewUrls.favicon ? (
                          <div className="relative">
                            <img src={previewUrls.favicon} alt="Favicon" className="w-full h-40 object-contain rounded-2xl border-2 border-slate-200 bg-slate-50 p-4" />
                            <button
                              onClick={() => removeImage("favicon")}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-40 border-3 border-dashed border-green-300 rounded-2xl bg-gradient-to-br from-green-50 to-lime-50 cursor-pointer hover:from-green-100 hover:to-lime-100 transition-all">
                            <Upload size={32} className="text-green-400 mb-2" />
                            <span className="text-sm text-green-600 font-medium">Click to upload</span>
                            <span className="text-xs text-slate-400 mt-1">32x32px, ICO or PNG</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange("favicon", e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Links Tab */}
            {activeTab === "social" && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">Social Media Links</h2>
                  <p className="text-green-100 text-sm mt-1">Connect your social media profiles</p>
                </div>
                
                <div className="p-8 space-y-4">
                  {[
                    { platform: "facebook", icon: Facebook, placeholder: "https://facebook.com/yourpage", bgColor: "bg-blue-50" },
                    { platform: "twitter", icon: Twitter, placeholder: "https://twitter.com/yourhandle", bgColor: "bg-sky-50" },
                    { platform: "instagram", icon: Instagram, placeholder: "https://instagram.com/yourhandle", bgColor: "bg-pink-50" },
                    { platform: "linkedin", icon: Linkedin, placeholder: "https://linkedin.com/company/yourcompany", bgColor: "bg-blue-50" },
                    { platform: "youtube", icon: Youtube, placeholder: "https://youtube.com/c/yourchannel", bgColor: "bg-red-50" },
                  ].map(({ platform, icon: Icon, placeholder, bgColor }) => (
                    <div key={platform} className={`${bgColor} rounded-xl p-4 transition-all hover:shadow-md`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Icon size={20} className="text-slate-700" />
                        </div>
                        <input
                          type="url"
                          value={formData.socialLinks[platform]}
                          onChange={(e) => handleSocialChange(platform, e.target.value)}
                          placeholder={placeholder}
                          className="flex-1 p-3 rounded-lg border border-slate-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === "advanced" && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">Advanced Settings</h2>
                  <p className="text-green-100 text-sm mt-1">Additional configuration options</p>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between p-6 bg-amber-50 rounded-2xl">
                    <div>
                      <h3 className="font-bold text-amber-800 flex items-center gap-2">
                        <AlertCircle size={18} />
                        Maintenance Mode
                      </h3>
                      <p className="text-sm text-amber-600 mt-1">Put website under maintenance</p>
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all ${
                        formData.maintenanceMode ? "bg-green-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-all ${
                          formData.maintenanceMode ? "translate-x-9" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  
                  {formData.maintenanceMode && (
                    <div className="p-4 bg-green-50 rounded-xl flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-600 mt-0.5" />
                      <p className="text-sm text-green-800">
                        Maintenance mode is active. Visitors will see a maintenance page.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Status Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Preview Card */}
            <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Eye size={24} />
                </div>
                <h3 className="text-xl font-bold">Live Preview</h3>
              </div>
              <div className="space-y-2 text-sm">
                {formData.websiteName && (
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-green-200 text-xs">Website Name</p>
                    <p className="font-semibold">{formData.websiteName}</p>
                  </div>
                )}
                {formData.websiteEmail && (
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-green-200 text-xs">Email</p>
                    <p className="font-semibold text-sm">{formData.websiteEmail}</p>
                  </div>
                )}
                {formData.websitePhone && (
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-green-200 text-xs">Phone</p>
                    <p className="font-semibold text-sm">{formData.websitePhone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <ShieldCheck className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">System Status</h3>
                  <p className="text-xs text-green-600 font-semibold">All systems operational</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Performance</span>
                  <span className="font-bold text-slate-900">92%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="w-[92%] h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm mt-3">
                  <span className="text-slate-500">Uptime</span>
                  <span className="font-bold text-slate-900">99.9%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="w-[99.9%] h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-green-600" />
                <h4 className="font-bold text-green-800">Pro Tips</h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Use high-quality images for better engagement</li>
                <li>• Keep your website description under 160 characters for SEO</li>
                <li>• Add all social media links to increase reach</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex items-center justify-end gap-4 pt-6 border-t-2 border-slate-200">
          <button className="px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-red-300 hover:text-red-500 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save size={18} />
                Save All Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}