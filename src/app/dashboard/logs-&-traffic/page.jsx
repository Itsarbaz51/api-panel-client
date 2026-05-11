"use client";

import React, { useState } from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Terminal, 
  RefreshCw,
  Server
} from 'lucide-react';

export default function LogsTrafficPage() {
  const [activeTab, setActiveTab] = useState('traffic');

  // Sample data for Live Traffic
  const trafficData = [
    { id: 1, method: 'GET', path: '/api/v1/user/profile', status: 200, latency: '45ms', time: 'Just now' },
    { id: 2, method: 'POST', path: '/api/v1/auth/login', status: 201, latency: '128ms', time: '2 mins ago' },
    { id: 3, method: 'GET', path: '/api/v1/inventory', status: 404, latency: '12ms', time: '5 mins ago' },
    { id: 4, method: 'PATCH', path: '/api/v1/settings', status: 200, latency: '88ms', time: '12 mins ago' },
    { id: 5, method: 'GET', path: '/api/v1/analytics', status: 500, latency: '1.2s', time: '15 mins ago' },
  ];

  // Sample data for System Logs
  const systemLogs = [
    { id: 1, level: 'INFO', message: 'Database connection established', source: 'PostgreSQL', time: '10:45:01' },
    { id: 2, level: 'WARN', message: 'High memory usage detected (85%)', source: 'Worker-01', time: '10:42:15' },
    { id: 3, level: 'ERROR', message: 'Failed to push notification to socket', source: 'Gateway', time: '10:30:00' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
            <Activity size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Logs & Traffic</h1>
            <p className="text-slate-500 text-sm font-medium">Real-time system monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="px-5 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 shadow-md shadow-teal-100 transition-all">
            Download Report
          </button>
        </div>
      </div>

      {/* --- Stats Overview --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Traffic" value="84.2k" change="+12.5%" trend="up" />
        <StatCard title="Avg Response" value="124ms" change="-18ms" trend="up" color="text-blue-600" />
        <StatCard title="Success Rate" value="99.9%" change="Stable" trend="neutral" />
        <StatCard title="Active Nodes" value="12/12" change="Healthy" trend="up" />
      </div>

      {/* --- Main Dashboard Container --- */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Tabs & Search Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('traffic')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'traffic' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Network Traffic
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'logs' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              System Logs
            </button>
          </div>

          <div className="relative flex-1 lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by IP, URL, or ID..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-x-auto">
          {activeTab === 'traffic' ? (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-4 font-bold">Method</th>
                  <th className="px-6 py-4 font-bold">Endpoint</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Latency</th>
                  <th className="px-6 py-4 font-bold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {trafficData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-tighter ${
                        item.method === 'GET' ? 'bg-blue-100 text-blue-700' : 
                        item.method === 'POST' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-600 group-hover:text-teal-600 transition-colors">{item.path}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${item.status >= 400 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        <span className="text-sm font-bold text-slate-700">{item.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.latency}</td>
                    <td className="px-6 py-4 text-sm text-slate-400 text-right">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 space-y-3 bg-slate-900 min-h-[300px] font-mono text-xs">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex gap-4 border-l-2 border-slate-700 pl-4 py-1">
                  <span className="text-slate-500">[{log.time}]</span>
                  <span className={log.level === 'ERROR' ? 'text-red-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-emerald-400'}>
                    {log.level}
                  </span>
                  <span className="text-slate-300 font-bold">[{log.source}]</span>
                  <span className="text-slate-400">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Stats Component
function StatCard({ title, value, change, trend, color = "text-emerald-600" }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-200 transition-all">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 ${color}`}>
          {change}
        </span>
      </div>
    </div>
  );
}