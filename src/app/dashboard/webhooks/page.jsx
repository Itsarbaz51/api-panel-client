"use client";

import React, { useState } from 'react';
import { 
  Webhook, 
  Plus, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  ExternalLink,
  Zap
} from 'lucide-react';

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState([
    { id: 1, name: 'Slack Notifications', url: 'https://hooks.slack.com/services/...', status: 'Active', lastUsed: '2 mins ago' },
    { id: 2, name: 'Discord Bot', url: 'https://discord.com/api/webhooks/...', status: 'Active', lastUsed: '1 hour ago' },
    { id: 3, name: 'Custom ERP Sync', url: 'https://api.mycompany.com/v1/webhook', status: 'Failed', lastUsed: 'Yesterday' },
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#ecfdf5] text-[#059669] rounded-2xl border border-[#d1fae5]">
            <Webhook size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Webhooks</h1>
            <p className="text-slate-500 text-sm">Send real-time events to your favorite apps</p>
          </div>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all">
          <Plus size={18} /> Create Webhook
        </button>
      </div>

      {/* Info Alert */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
        <Zap className="text-blue-500 mt-0.5" size={18} />
        <p className="text-sm text-blue-700 leading-relaxed">
          Webhooks allow external services to be notified when certain events happen. When the specified events occur, we’ll send a POST request to each of the URLs you provide.
        </p>
      </div>

      {/* Webhooks List */}
      <div className="grid gap-4">
        {webhooks.map((hook) => (
          <div key={hook.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-all group shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg mt-1 ${hook.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {hook.status === 'Active' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    {hook.name}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      hook.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {hook.status}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      {hook.url}
                    </code>
                    <button className="text-slate-300 hover:text-teal-600 transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-50">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Last Triggered</p>
                  <p className="text-sm font-medium text-slate-600">{hook.lastUsed}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                    <ExternalLink size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Empty State Help */}
      <div className="mt-8 text-center border-2 border-dashed border-slate-200 rounded-3xl py-12 px-6">
        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <Webhook size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Need help with Webhooks?</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">
          Check out our documentation to learn how to integrate your system with our real-time event stream.
        </p>
        <button className="mt-6 text-teal-600 font-bold text-sm hover:underline">
          Read Documentation →
        </button>
      </div>
    </div>
  );
}