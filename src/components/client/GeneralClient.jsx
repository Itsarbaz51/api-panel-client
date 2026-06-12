"use client";

import React, { useState } from "react";
import {
  Globe,
  Save,
  Brush,
  Globe as GlobeIcon,
  Link as LinkIcon,
  Settings,
  Eye,
  Upload,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Sparkles,
  Zap,
  Layout,
  Image,
  Shield,
  Check,
  X,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

function GeneralClient() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    websiteName: "",
    websiteDescription: "",
    websiteEmail: "",
    websitePhone: "",
    websiteAddress: "",
    maintenanceMode: false,
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaved(false);
  };

  const handleSocialChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  const tabs = [
    { id: "general", label: "General", icon: Layout },
    { id: "branding", label: "Branding", icon: Image },
    { id: "social", label: "Social", icon: LinkIcon },
    { id: "advanced", label: "Advanced", icon: Shield },
  ];

  const socialPlatforms = [
    { name: "facebook", icon: Facebook, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "twitter", icon: Twitter, color: "text-sky-500", bg: "bg-sky-50" },
    { name: "instagram", icon: Instagram, color: "text-pink-600", bg: "bg-pink-50" },
    { name: "linkedin", icon: Linkedin, color: "text-blue-700", bg: "bg-blue-50" },
    { name: "youtube", icon: Youtube, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      
      {/* Top Navigation Bar */}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                        : "text-slate-600 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                );
              })}

              {/* Status Card */}
              
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
              
              {/* General Tab */}
              {activeTab === "general" && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Globe size={20} className="" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">General Information</h2>
                      <p className="text-sm text-slate-500">Basic details about your website</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        Website Name
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="websiteName"
                        value={formData.websiteName}
                        onChange={handleInputChange}
                        placeholder="My Awesome Brand"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-ring/10 outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Contact Email</label>
                      <input
                        name="websiteEmail"
                        type="email"
                        value={formData.websiteEmail}
                        onChange={handleInputChange}
                        placeholder="support@brand.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-ring/10 outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number</label>
                      <input
                        name="websitePhone"
                        value={formData.websitePhone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-ring/10 outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Business Address</label>
                      <input
                        name="websiteAddress"
                        value={formData.websiteAddress}
                        onChange={handleInputChange}
                        placeholder="123 Business St, City"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-ring/10 outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-slate-700">Site Description</label>
                      <textarea
                        rows={4}
                        name="websiteDescription"
                        value={formData.websiteDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your website for SEO purposes..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-ring/10 outline-none transition-all font-medium resize-none"
                      />
                      <p className="text-xs text-slate-400">This description will appear in search engine results</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === "branding" && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Brush size={20} className="" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Branding</h2>
                      <p className="text-sm text-slate-500">Upload your visual assets</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Logo Upload */}
                    <div className="group relative">
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Website Logo</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-primary/10/50 hover:border-emerald-400 transition-all cursor-pointer group-hover:shadow-lg">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Upload className="text-emerald-500" size={32} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Drop logo here</span>
                        <span className="text-xs text-slate-400 mt-1">PNG, SVG up to 2MB</span>
                      </div>
                    </div>

                    {/* Favicon Upload */}
                    <div className="group relative">
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Favicon</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-primary/10/50 hover:border-emerald-400 transition-all cursor-pointer group-hover:shadow-lg">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <GlobeIcon className="text-emerald-500" size={32} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Drop favicon here</span>
                        <span className="text-xs text-slate-400 mt-1">ICO or PNG (32x32)</span>
                      </div>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-700 mb-4">Preview</h3>
                    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Image size={20} className="" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{formData.websiteName || "Your Brand"}</p>
                        <p className="text-xs text-slate-500">{formData.websiteEmail || "contact@brand.com"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Tab */}
              {activeTab === "social" && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <LinkIcon size={20} className="" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Social Links</h2>
                      <p className="text-sm text-slate-500">Connect your social media profiles</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {socialPlatforms.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <div
                          key={platform.name}
                          className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border-2 border-slate-200 focus-within:border-emerald-500 focus-within:bg-white transition-all group"
                        >
                          <div className={`p-3 rounded-xl ${platform.bg} ${platform.color}`}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {platform.name}
                            </label>
                            <input
                              type="url"
                              value={formData.socialLinks[platform.name]}
                              onChange={(e) => handleSocialChange(platform.name, e.target.value)}
                              placeholder={`https://${platform.name}.com/yourprofile`}
                              className="w-full bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400"
                            />
                          </div>
                          {formData.socialLinks[platform.name] && (
                            <Check size={16} className="text-emerald-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === "advanced" && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Shield size={20} className="" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Advanced Settings</h2>
                      <p className="text-sm text-slate-500">Control advanced website features</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Maintenance Mode Toggle */}
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${formData.maintenanceMode ? "bg-amber-100 text-amber-600" : "bg-emerald-100 "}`}>
                          <AlertCircle size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">Maintenance Mode</h4>
                          <p className="text-sm text-slate-500 mt-1">
                            {formData.maintenanceMode 
                              ? "Your site is currently inaccessible to visitors" 
                              : "Your site is live and accessible to all visitors"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            maintenanceMode: !p.maintenanceMode,
                          }))
                        }
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                          formData.maintenanceMode ? "bg-amber-500" : "bg-primary"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                            formData.maintenanceMode ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="p-6 bg-red-50 rounded-2xl border-2 border-red-200">
                      <h4 className="font-bold text-red-800 flex items-center gap-2">
                        <Zap size={16} />
                        Danger Zone
                      </h4>
                      <p className="text-sm text-red-600/80 mt-2 mb-4">
                        These actions are irreversible. Please proceed with caution.
                      </p>
                      <button className="px-4 py-2 bg-white border-2 border-red-300 text-red-700 rounded-xl text-sm font-bold hover:bg-red-100 transition-all">
                        Reset All Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralClient;