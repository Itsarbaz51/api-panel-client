"use client";

import React from "react";
import { Box, CheckCircle2, Zap, Shield, Globe, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Starter Plan",
    price: "₹499",
    duration: "/month",
    features: ["1,000 Verifications", "Standard API Access", "Email Support", "Basic Analytics"],
    color: "bg-slate-50",
    icon: Globe,
    recommended: false
  },
  {
    name: "Business Pro",
    price: "₹2,499",
    duration: "/month",
    features: ["10,000 Verifications", "Priority API Access", "24/7 Priority Support", "Advanced Reporting", "Custom Webhooks"],
    color: "bg-emerald-50",
    icon: Zap,
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "",
    features: ["Unlimited Verifications", "Dedicated Manager", "White-label Solutions", "Custom Integrations", "SLA Guarantee"],
    color: "bg-slate-900",
    icon: Shield,
    recommended: false
  }
];

export default function PackagesClient() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Search/Filter Bar (Consistency with User Page) */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Available Service Packages</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Select the best plan for your operational needs.</p>
        </div>
        <button className="bg-emerald-500 text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
          Create Custom Package
        </button>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`relative p-8 rounded-[2.5rem] border ${
              pkg.recommended ? "border-emerald-200 shadow-xl shadow-emerald-500/5 scale-105 z-10" : "border-slate-100 shadow-sm"
            } ${pkg.name === 'Enterprise' ? 'bg-slate-900 text-white' : 'bg-white'}`}
          >
            {pkg.recommended && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </span>
            )}

            <div className="mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                pkg.name === 'Enterprise' ? 'bg-white/10' : 'bg-emerald-50'
              }`}>
                <pkg.icon size={24} className={pkg.name === 'Enterprise' ? 'text-emerald-400' : 'text-emerald-500'} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight">{pkg.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black">{pkg.price}</span>
                <span className={`text-xs font-bold opacity-50`}>{pkg.duration}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {pkg.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium opacity-80">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
              pkg.name === 'Enterprise' 
              ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
              : pkg.recommended 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}>
              {pkg.name === 'Enterprise' ? 'Contact Sales' : 'Activate Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Active Subscriptions Info Table (Small) */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-8">
         <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Active Subscriptions</h4>
            <span className="text-[10px] bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-400 font-bold">2 Active Nodes</span>
         </div>
         <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">BP</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Bulk Verification Node</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Expires in 12 days</p>
                  </div>
               </div>
               <button className="text-emerald-500 hover:text-emerald-600 transition-colors">
                  <ArrowRight size={20} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}