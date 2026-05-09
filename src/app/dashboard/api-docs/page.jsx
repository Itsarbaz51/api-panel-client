"use client";

import React, { useState } from "react";
import { Copy, Check, Play, Lock, Terminal } from "lucide-react";

const endpoints = [
  { name: "PAN Lite", method: "POST" },
  { name: "Bank Verification", method: "POST" },
  { name: "Penniless Account Verification", method: "POST" },
  { name: "Initiate Payout", method: "POST" },
  { name: "Fetch Balance", method: "GET" },
];

// Languages aur unke corresponding code snippets
const codeExamples = {
  Ruby: `require 'net/http'\nrequire 'uri'\n\nuri = URI.parse("https://api.bulkpe.in/v1/verify")\nrequest = Net::HTTP::Post.new(uri)\nrequest.content_type = "application/json"\nrequest["Authorization"] = "Bearer sk_live_..."\n\nresponse = Net::HTTP.start(uri.hostname, uri.port) do |http|\n  http.request(request)\nend`,
  
  Rust: `use reqwest::header;\n\n#[tokio::main]\nasync fn main() -> Result<(), reqwest::Error> {\n    let mut headers = header::HeaderMap::new();\n    headers.insert("Authorization", "Bearer sk_live_...".parse().unwrap());\n\n    let client = reqwest::Client::new();\n    let res = client.post("https://api.bulkpe.in/v1/verify")\n        .headers(headers)\n        .send()\n        .await?;\n    Ok(())\n}`,
  
  Shell: `curl --request POST \\\n     --url https://api.bulkpe.in/v1/verify \\\n     --header 'Authorization: Bearer sk_live_...' \\\n     --header 'Content-Type: application/json' \\\n     --data '{"acc":"..."}'`,
  
  Swift: `import Foundation\n\nlet params = ["acc": "..."]\nvar req = URLRequest(url: URL(string: "https://api.bulkpe.in/v1")!)\nreq.httpMethod = "POST"\nreq.setValue("application/json", forHeaderField: "Content-Type")\n\nlet task = URLSession.shared.dataTask(with: req) { data, res, err in \n    // Handle response\n}\ntask.resume()`,
  
  "Node.js": `const axios = require('axios');\n\naxios.post('https://api.bulkpe.in/v1/verify', { acc: '...' }, {\n  headers: {\n    'Authorization': 'Bearer sk_live_...',\n    'Content-Type': 'application/json'\n  }\n}).then(res => console.log(res.data));`,
  
  Python: `import requests\n\nurl = "https://api.bulkpe.in/v1/verify"\nheaders = {\n    "Authorization": "Bearer sk_live_...",\n    "Content-Type": "application/json"\n}\ndata = {"acc": "..."}\n\nresponse = requests.post(url, json=data, headers=headers)\nprint(response.json())`
};

export default function APIReferencePage() {
  const [activeEndpoint, setActiveEndpoint] = useState("Penniless Account Verification");
  const [activeLang, setActiveLang] = useState("Shell"); // Default Language
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">API Reference</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: API Endpoints */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Payments APIs</h3>
          {endpoints.map((api) => (
            <button
              key={api.name}
              onClick={() => setActiveEndpoint(api.name)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                activeEndpoint === api.name ? "bg-white border-emerald-200 shadow-md ring-1 ring-emerald-50" : "bg-white border-gray-100 text-gray-500"
              }`}
            >
              <span className={`text-sm font-semibold truncate ${activeEndpoint === api.name ? "text-emerald-700" : ""}`}>{api.name}</span>
              <span className={`text-[9px] font-black px-2 py-1 rounded ${api.method === "POST" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{api.method}</span>
            </button>
          ))}
        </div>

        {/* Center: Parameters Form */}
        <div className="lg:col-span-4 bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm h-fit">
          <h3 className="text-xl font-bold text-gray-800 mb-6">{activeEndpoint}</h3>
          <div className="space-y-5">
            {["Account Number", "IFSC Code", "Reference ID"].map((label) => (
              <div key={label}>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
                <input type="text" placeholder={`${label} (Required)`} className="w-full mt-2 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all" />
              </div>
            ))}
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 mt-4">
              <Play size={18} fill="currentColor" /> Execute Request
            </button>
          </div>
        </div>

        {/* Right: Interactive Playground (Matching Screenshot) */}
        <div className="lg:col-span-5">
          <div className="bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800">
            
            {/* Header / Copy Code */}
            <div className="p-5 bg-slate-800/40 border-b border-slate-700/50 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <button onClick={handleCopy} className="text-slate-400 hover:text-white text-xs flex items-center gap-2 transition-colors">
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            {/* Dynamic Language Tabs */}
            <div className="flex px-4 py-3 gap-2 bg-slate-900 border-b border-slate-800 overflow-x-auto no-scrollbar">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeLang === lang 
                      ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Auth Box */}
            <div className="px-6 py-4 bg-slate-800/20 border-b border-slate-800/50">
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-700">
                <Lock size={12} className="text-emerald-500" />
                <span className="text-[10px] font-mono text-slate-600 uppercase border-r border-slate-800 pr-3 font-bold">Auth</span>
                <span className="text-xs font-mono text-emerald-500/80 truncate">Bearer sk_live_823...v4</span>
              </div>
            </div>

            {/* Code Editor Area - Changes dynamically */}
            <div className="p-8 overflow-x-auto">
              <pre className="text-[13px] font-mono leading-7 whitespace-pre">
                <code className="text-slate-300">
                  {codeExamples[activeLang]}
                </code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}