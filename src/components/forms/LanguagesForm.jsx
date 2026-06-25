"use client";

import { useState } from "react";
import Button from "../ui/Button";

export default function LanguagesForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    template: initialData?.template || "",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const labelStyles = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";
  const inputStyles = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      
      {/* Name and Slug Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyles}>Language Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputStyles}
            placeholder="NodeJS"
            required
          />
        </div>

        <div>
          <label className={labelStyles}>Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            className={inputStyles}
            placeholder="nodejs"
            required
          />
        </div>
      </div>

      {/* Code Template Area */}
      <div>
        <label className={labelStyles}>Code Template</label>
        <div className="overflow-hidden rounded-xl border border-slate-800 shadow-lg bg-slate-950">
          {/* Top Bar for Code Window Aesthetic */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 tracking-wide uppercase">Template Editor</span>
          </div>
          
          <textarea
            rows={12}
            value={formData.template}
            onChange={(e) => handleChange("template", e.target.value)}
            className="w-full p-4 font-mono text-xs md:text-sm bg-transparent text-emerald-400 placeholder-slate-600 focus:outline-none resize-y leading-relaxed"
            placeholder="// Enter default boiler code here..."
            required
          />
        </div>
      </div>

      {/* Status Toggle Switch */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-800">Active Status</span>
          <span className="text-xs text-slate-500">Determine whether this language is visible or hidden.</span>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => handleChange("isActive", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-100 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 border-t border-slate-100 pt-6 mt-8">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary" // Assuming your custom Button supports variants, otherwise style appropriately
          className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
        >
          Cancel
        </Button>

        <Button 
          type="submit"
          className="px-5 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 transition"
        >
          {initialData ? "Save Changes" : "Create Language"}
        </Button>
      </div>
    </form>
  );
}