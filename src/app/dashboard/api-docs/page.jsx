"use client";

import React, { useState } from "react";
import { Copy, Check, Play, Lock, Terminal, Box, Globe, Cpu } from "lucide-react";

const endpoints = [
  { name: "PAN Lite", method: "POST", group: "Verifications" },
  { name: "Bank Verification", method: "POST", group: "Verifications" },
  { name: "Penniless Verification", method: "POST", group: "Payments" },
  { name: "Initiate Payout", method: "POST", group: "Payments" },
  { name: "Fetch Balance", method: "GET", group: "System" },
];

const codeExamples = {
  Shell: `curl --request POST \\\n  --url https://api.bulkpe.in/v1/verify \\\n  --header 'Authorization: Bearer sk_live_...' \\\n  --data '{"acc":"..."}'`,
  "Node.js": `const axios = require('axios');\n\naxios.post('https://api.bulkpe.in/v1/verify', { \n  acc: '...' \n}, {\n  headers: { 'Authorization': 'Bearer sk_live_...' }\n});`,
  Python: `import requests\n\nurl = "https://api.bulkpe.in/v1/verify"\nheaders = {"Authorization": "Bearer sk_live_..."}\n\nresponse = requests.post(url, json={"acc": "..."}, headers=headers)`,
  Go: `package main\nimport "net/http"\n\nfunc main() {\n  req, _ := http.NewRequest("POST", url, nil)\n  req.Header.Set("Authorization", "Bearer sk_...")\n}`,
};

export default function APIReferencePage() {
  const [activeEndpoint, setActiveEndpoint] = useState("Penniless Verification");
  const [activeLang, setActiveLang] = useState("Shell");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] p-6 lg:p-12 animate-in fade-in duration-700">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#00b37e]/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0ea5e9]/5 blur-[100px] rounded-full -z-10" />

      {/* Header */}
      <header className="mb-12 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-8 bg-[#00b37e] rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00b37e]">Developer Hub</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-[#0f172a]">
          API <span className="text-[#00b37e]">Playground</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* --- Sidebar: API Selection --- */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-slate-200/60 p-4 shadow-sm">
            <div className="space-y-1">
              {endpoints.map((api) => {
                const isActive = activeEndpoint === api.name;
                return (
                  <button
                    key={api.name}
                    onClick={() => setActiveEndpoint(api.name)}
                    className={`w-full group flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? "bg-white text-[#00b37e] shadow-md ring-1 ring-slate-100" 
                        : "text-slate-500 hover:bg-white/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? "bg-[#e6fcf5]" : "bg-slate-100 group-hover:bg-slate-200"}`}>
                        <Box size={14} />
                      </div>
                      <span className="text-[13px] font-bold truncate">{api.name}</span>
                    </div>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${api.method === "POST" ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50"}`}>
                      {api.method}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- Center: Request Builder --- */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2.5 bg-slate-900 rounded-xl">
                <Globe size={18} className="text-[#00b37e]" />
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Endpoint</p>
                <h3 className="text-lg font-black text-slate-800">{activeEndpoint}</h3>
             </div>
          </div>

          <div className="space-y-6">
            {["Account Number", "IFSC Code"].map((label) => (
              <div key={label} className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
                <input 
                  type="text" 
                  placeholder={`Enter ${label}`}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#00b37e]/5 focus:border-[#00b37e] outline-none transition-all placeholder:text-slate-300 font-medium" 
                />
              </div>
            ))}
            
            <button className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 mt-4 group">
              <Play size={16} className="fill-[#00b37e] text-[#00b37e] group-hover:scale-110 transition-transform" /> 
              Execute Request
            </button>
          </div>
        </div>

        {/* --- Right: Terminal / Code Section --- */}
        <div className="lg:col-span-5 h-full">
          <div className="bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)] border border-slate-800 flex flex-col h-full">
            
            {/* Terminal Top Bar */}
            <div className="p-6 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <button 
                onClick={handleCopy} 
                className="group flex items-center gap-2 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-xs font-bold text-slate-300 transition-all border border-slate-700"
              >
                {copied ? <Check size={14} className="text-[#00b37e]" /> : <Copy size={14} className="group-hover:scale-110 transition-transform" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex p-2 bg-slate-950/50 border-b border-slate-800 gap-1">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-5 py-2 rounded-xl text-[11px] font-bold transition-all ${
                    activeLang === lang 
                      ? "bg-[#00b37e] text-white shadow-lg shadow-[#00b37e]/20" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/40"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Auth Indicator */}
            <div className="px-8 py-4 bg-slate-900/30">
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-slate-500 uppercase font-black">Auth:</span>
                <span className="text-[#00b37e] flex items-center gap-2">
                  <Lock size={10} /> Bearer sk_live_••••••••
                </span>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-8 pt-2 overflow-x-auto h-full min-h-[300px]">
              <div className="flex gap-4">
                <div className="flex flex-col text-slate-700 font-mono text-[13px] leading-8 text-right select-none pr-4 border-r border-slate-800">
                  {[1, 2, 3, 4, 5, 6].map(n => <span key={n}>{n}</span>)}
                </div>
                <pre className="text-[13px] font-mono leading-8 whitespace-pre">
                  <code className="text-slate-200 italic">
                    {codeExamples[activeLang]}
                  </code>
                </pre>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-8">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Terminal size={12} /> Console Ready
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-[#00b37e] uppercase tracking-widest">
                  <Cpu size={12} /> Vercel Edge
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}