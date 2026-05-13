"use client";

import React, { useState } from "react";
import {
  Globe, Save, Brush, Globe as GlobeIcon, Link as LinkIcon, 
  Settings, Eye, Upload, Facebook, Twitter, Instagram, 
  Linkedin, Youtube, AlertCircle, Sparkles, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WebsiteSettings() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteDescription: "",
    websiteEmail: "",
    websitePhone: "",
    websiteAddress: "",
    maintenanceMode: false,
    socialLinks: {
      facebook: "", twitter: "", instagram: "", linkedin: "", youtube: "",
    },
  });

  const tabs = [
    { id: "general", label: "General Info", icon: GlobeIcon },
    { id: "branding", label: "Branding", icon: Brush },
    { id: "social", label: "Social Links", icon: LinkIcon },
    { id: "advanced", label: "Advanced", icon: Settings },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { 
      setLoading(false); 
      alert("✨ Settings updated successfully!"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600">Configuration</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Website <span className="text-emerald-600">Settings</span>
            </h1>
          </div>

          {/* FLOATING TAB NAVIGATION */}
          <nav className="flex p-1.5 bg-slate-200/40 backdrop-blur-md border border-slate-200/60 rounded-[32px] shadow-inner relative w-fit">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2.5 px-6 py-3 rounded-[26px] text-sm font-bold transition-all duration-300 whitespace-nowrap outline-none
                    ${isActive ? "text-emerald-600" : "text-slate-500 hover:text-slate-800"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="settingsTabPill"
                      className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-[26px]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon size={16} className={isActive ? "text-emerald-500" : "text-slate-400"} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE - Forms */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
              <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Details</h2>
                  <p className="text-slate-500 text-sm">Update your {activeTab} information below</p>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                   {activeTab === "general" && <Globe size={20} />}
                   {activeTab === "branding" && <Brush size={20} />}
                   {activeTab === "social" && <LinkIcon size={20} />}
                   {activeTab === "advanced" && <Settings size={20} />}
                </div>
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* GENERAL TAB */}
                    {activeTab === "general" && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Website Name</label>
                          <input 
                            name="websiteName"
                            value={formData.websiteName}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-medium" 
                            placeholder="e.g. My Awesome Brand"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Contact Email</label>
                          <input 
                            name="websiteEmail"
                            value={formData.websiteEmail}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-medium" 
                            placeholder="support@brand.com"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Site Description</label>
                          <textarea 
                            name="websiteDescription"
                            rows="4"
                            value={formData.websiteDescription}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-medium" 
                            placeholder="Describe your website for SEO..."
                          />
                        </div>
                      </div>
                    )}

                    {/* BRANDING TAB */}
                    {activeTab === "branding" && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-slate-700">Main Logo</label>
                          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer group">
                            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                              <Upload className="text-emerald-500" size={28} />
                            </div>
                            <span className="mt-4 text-sm font-bold text-slate-500">Drop logo here</span>
                            <span className="text-xs text-slate-400">PNG, SVG up to 2MB</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-slate-700">Favicon</label>
                          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer group">
                            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                              <Globe className="text-emerald-500" size={28} />
                            </div>
                            <span className="mt-4 text-sm font-bold text-slate-500">Upload Favicon</span>
                            <span className="text-xs text-slate-400">ICO or PNG (32x32)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SOCIAL TAB */}
                    {activeTab === "social" && (
                      <div className="space-y-4">
                        {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((platform) => (
                          <div key={platform} className="group flex items-center gap-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 focus-within:border-emerald-500 focus-within:bg-white transition-all">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                              {platform === 'facebook' && <Facebook size={20} />}
                              {platform === 'twitter' && <Twitter size={20} />}
                              {platform === 'instagram' && <Instagram size={20} />}
                              {platform === 'linkedin' && <Linkedin size={20} />}
                              {platform === 'youtube' && <Youtube size={20} />}
                            </div>
                            <input 
                              type="text"
                              placeholder={`Enter your ${platform} profile URL`}
                              className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ADVANCED TAB */}
                    {activeTab === "advanced" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-amber-50/50 border border-amber-100 rounded-[2rem]">
                          <div className="flex gap-4">
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl h-fit">
                              <AlertCircle size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold text-amber-900">Maintenance Mode</h4>
                              <p className="text-sm text-amber-700/80 font-medium">Coming soon: Temporarily hide your site from visitors.</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setFormData(p => ({...p, maintenanceMode: !p.maintenanceMode}))}
                            className={`w-14 h-8 rounded-full transition-all relative ${formData.maintenanceMode ? 'bg-amber-500' : 'bg-slate-300'}`}
                          >
                            <div className={`absolute top-1 bg-white w-6 h-6 rounded-full transition-all ${formData.maintenanceMode ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Stats & Preview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
              <Zap className="absolute right-[-20px] top-[-20px] text-emerald-500/10 w-40 h-40 rotate-12" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/20 text-emerald-400">
                     <Eye size={24} />
                   </div>
                   <h3 className="text-xl font-bold">Live Status</h3>
                </div>
                <div className="space-y-3">
                   <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                      <p className="text-slate-400 text-xs uppercase font-black tracking-widest mb-1">Status</p>
                      <div className="flex items-center gap-2">
                         <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="font-bold text-emerald-400">Production Live</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Pro Tips Card */}
            <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm">
               <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={20} className="text-emerald-600" />
                  <h4 className="font-bold text-emerald-900 text-lg">Pro Tips</h4>
               </div>
               <ul className="space-y-3 text-sm text-emerald-700/80 font-medium">
                  <li className="flex items-start gap-2">• Use PNG for transparent logos.</li>
                  <li className="flex items-start gap-2">• Description affects SEO rank.</li>
                  <li className="flex items-start gap-2">• Favicons must be square.</li>
               </ul>
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-200">
          <button className="px-8 py-3.5 rounded-2xl text-slate-500 font-bold hover:bg-slate-100 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? "Saving..." : <><Save size={18} /> Save Settings</>}
          </button>
        </div>
      </div>
    </div>
  );
}