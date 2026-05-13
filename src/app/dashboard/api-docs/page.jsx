"use client";

import React, { useState } from "react";
import { 
  Copy, Check, Play, Lock, Terminal, Box, Globe, Cpu, 
  Zap, Key, Shield, Server, Code, ArrowRight, 
  Database, Cloud, Sparkles, ChevronRight, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const endpoints = [
  { 
    name: "PAN Lite", 
    method: "POST", 
    group: "Verifications",
    description: "Verify PAN card details instantly",
    icon: Shield,
    color: "emerald"
  },
  { 
    name: "Bank Verification", 
    method: "POST", 
    group: "Verifications",
    description: "Validate bank account credentials",
    icon: Database,
    color: "blue"
  },
  { 
    name: "Penniless Verification", 
    method: "POST", 
    group: "Payments",
    description: "Zero-balance account verification",
    icon: Zap,
    color: "amber"
  },
  { 
    name: "Initiate Payout", 
    method: "POST", 
    group: "Payments",
    description: "Process bulk payouts seamlessly",
    icon: Cloud,
    color: "purple"
  },
  { 
    name: "Fetch Balance", 
    method: "GET", 
    group: "System",
    description: "Check account balance in real-time",
    icon: Server,
    color: "slate"
  },
];

const codeExamples = {
  "cURL": `curl --request POST \\\n  --url https://api.bulkpe.in/v1/verify \\\n  --header 'Authorization: Bearer sk_live_...' \\\n  --header 'Content-Type: application/json' \\\n  --data '{\n    "account_number": "XXXXXX7890",\n    "ifsc": "SBIN0001234"\n  }'`,
  
  "Node.js": `const axios = require('axios');\n\nconst response = await axios.post(\n  'https://api.bulkpe.in/v1/verify',\n  {\n    account_number: 'XXXXXX7890',\n    ifsc: 'SBIN0001234'\n  },\n  {\n    headers: {\n      'Authorization': 'Bearer sk_live_...',\n      'Content-Type': 'application/json'\n    }\n  }\n);\n\nconsole.log(response.data);`,
  
  "Python": `import requests\n\nurl = "https://api.bulkpe.in/v1/verify"\nheaders = {\n    "Authorization": "Bearer sk_live_...",\n    "Content-Type": "application/json"\n}\n\ndata = {\n    "account_number": "XXXXXX7890",\n    "ifsc": "SBIN0001234"\n}\n\nresponse = requests.post(url, json=data, headers=headers)\nprint(response.json())`,
  
  "Go": `package main\n\nimport (\n    "bytes"\n    "encoding/json"\n    "fmt"\n    "net/http"\n)\n\nfunc main() {\n    url := "https://api.bulkpe.in/v1/verify"\n    \n    data := map[string]string{\n        "account_number": "XXXXXX7890",\n        "ifsc": "SBIN0001234",\n    }\n    \n    jsonData, _ := json.Marshal(data)\n    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))\n    req.Header.Set("Authorization", "Bearer sk_live_...")\n    req.Header.Set("Content-Type", "application/json")\n    \n    client := &http.Client{}\n    resp, _ := client.Do(req)\n    defer resp.Body.Close()\n}`,
  
  "Ruby": `require 'httparty'\n\nresponse = HTTParty.post(\n  'https://api.bulkpe.in/v1/verify',\n  headers: {\n    'Authorization' => 'Bearer sk_live_...',\n    'Content-Type' => 'application/json'\n  },\n  body: {\n    account_number: 'XXXXXX7890',\n    ifsc: 'SBIN0001234'\n  }.to_json\n)\n\nputs response.body`
};

const methodColors = {
  POST: "emerald",
  GET: "blue",
  PUT: "amber",
  DELETE: "red"
};

export default function APIReferencePage() {
  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[2]);
  const [activeLang, setActiveLang] = useState("cURL");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    ifsc: ""
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    // Simulate API call
    setTimeout(() => {
      setResponse({
        status: 200,
        data: {
          success: true,
          message: "Verification successful",
          timestamp: new Date().toISOString()
        }
      });
      setIsExecuting(false);
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const groupedEndpoints = endpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.group]) acc[endpoint.group] = [];
    acc[endpoint.group].push(endpoint);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-[1600px] mx-auto p-6 lg:p-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Code size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-emerald-500 rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600">
                  Developer Hub
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mt-2">
                API <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Playground</span>
              </h1>
              <p className="text-slate-500 mt-3 max-w-2xl">
                Test, explore, and integrate with our powerful APIs in real-time. 
                Get started with interactive documentation and code examples.
              </p>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar: API Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-6 space-y-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-emerald-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      API Endpoints
                    </h3>
                  </div>
                </div>
                
                <div className="p-3 space-y-4 max-h-[600px] overflow-y-auto">
                  {Object.entries(groupedEndpoints).map(([group, endpoints]) => (
                    <div key={group} className="space-y-1">
                      <div className="px-3 py-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {group}
                        </span>
                      </div>
                      {endpoints.map((api) => {
                        const isActive = activeEndpoint.name === api.name;
                        const Icon = api.icon;
                        return (
                          <motion.button
                            key={api.name}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveEndpoint(api)}
                            className={`w-full group flex items-start gap-3 p-3 rounded-2xl transition-all duration-300 ${
                              isActive 
                                ? "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-md" 
                                : "hover:bg-slate-50 border border-transparent"
                            }`}
                          >
                            <div className={`p-2 rounded-xl transition-all ${
                              isActive 
                                ? `bg-${api.color}-100 text-${api.color}-600` 
                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                              <Icon size={14} />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm font-bold ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                                  {api.name}
                                </span>
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                                  api.method === "POST" 
                                    ? "bg-emerald-100 text-emerald-700" 
                                    : "bg-blue-100 text-blue-700"
                                }`}>
                                  {api.method}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {api.description}
                              </p>
                            </div>
                            <ChevronRight size={14} className={`text-slate-400 transition-all ${isActive ? "opacity-100 translate-x-1" : "opacity-0"}`} />
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">API Status</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Response Time</span>
                    <span className="font-mono text-emerald-400">124ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Uptime</span>
                    <span className="font-mono text-emerald-400">99.99%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Rate Limit</span>
                    <span className="font-mono text-emerald-400">1000/min</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Request Builder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden sticky top-6">
              <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg">
                    <Globe size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Endpoint</p>
                    <h3 className="text-xl font-black text-slate-800">{activeEndpoint.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{activeEndpoint.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <span>Account Number</span>
                      <span className="text-emerald-600">*</span>
                    </label>
                    <input 
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter 11-16 digit account number"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <span>IFSC Code</span>
                      <span className="text-emerald-600">*</span>
                    </label>
                    <input 
                      type="text"
                      name="ifsc"
                      value={formData.ifsc}
                      onChange={handleInputChange}
                      placeholder="Enter 11-character IFSC code"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExecuting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Play size={16} className="fill-emerald-400 text-emerald-400" />
                      Execute Request
                    </>
                  )}
                </motion.button>

                {/* Response Preview */}
                <AnimatePresence>
                  {response && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Response</span>
                      </div>
                      <pre className="text-xs font-mono text-slate-700 overflow-x-auto">
                        {JSON.stringify(response.data, null, 2)}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Code Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 sticky top-6">
              {/* Terminal Header */}
              <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                </div>
                <div className="flex items-center gap-2">
                  <Key size={12} className="text-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-400">API Key Active</span>
                </div>
              </div>

              {/* Language Tabs */}
              <div className="flex overflow-x-auto p-2 bg-slate-950/50 border-b border-slate-800 gap-1">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                      activeLang === lang 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Auth Badge */}
              <div className="px-6 py-3 bg-slate-900/30 border-b border-slate-800">
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="text-slate-500 uppercase font-black tracking-wider">Authentication:</span>
                  <span className="text-emerald-400 flex items-center gap-2">
                    <Lock size={10} /> Bearer Token ••••••••
                  </span>
                </div>
              </div>

              {/* Code Content */}
              <div className="relative">
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 z-10 group flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300 transition-all backdrop-blur-sm border border-slate-700"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                
                <div className="p-6 overflow-x-auto">
                  <div className="flex gap-4">
                    <div className="flex flex-col text-slate-600 font-mono text-[12px] leading-7 text-right select-none">
                      {codeExamples[activeLang].split('\n').map((_, i) => (
                        <span key={i} className="text-slate-500">{i + 1}</span>
                      ))}
                    </div>
                    <pre className="text-[12px] font-mono leading-7 whitespace-pre overflow-x-auto flex-1">
                      <code className="text-slate-300">
                        {codeExamples[activeLang]}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="px-6 py-3 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <Terminal size={12} />
                  <span>Ready for production</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Edge Optimized</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}