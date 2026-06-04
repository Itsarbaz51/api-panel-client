// app/dashboard/page.tsx
"use client";

import React from 'react';
import { 
  Zap, Key, Activity, ShieldCheck, MoreVertical, 
  ArrowUpRight, ArrowDownRight, RefreshCcw, Terminal, Clock, ChevronDown,
  Globe, Database, Cpu, Server, AlertCircle, CheckCircle, XCircle,
  TrendingUp, Users, DollarSign, Code
} from 'lucide-react';

// --- Enhanced Stats Data ---
const stats = [
  { 
    title: "Total API Requests", 
    value: "1.2M", 
    change: "+18.5%", 
    isUp: true, 
    icon: Zap, 
    gradient: "from-emerald-400 to-teal-600",
    bgGlow: "emerald-500/20"
  },
  { 
    title: "Avg. Latency", 
    value: "42ms", 
    change: "-4.2%", 
    isUp: true, 
    icon: Clock, 
    gradient: "from-blue-400 to-indigo-600",
    bgGlow: "blue-500/20"
  },
  { 
    title: "Active API Keys", 
    value: "1,204", 
    change: "+12", 
    isUp: true, 
    icon: Key, 
    gradient: "from-violet-400 to-purple-600",
    bgGlow: "violet-500/20"
  },
  { 
    title: "Success Rate", 
    value: "99.98%", 
    change: "+0.02%", 
    isUp: true, 
    icon: ShieldCheck, 
    gradient: "from-orange-400 to-amber-600",
    bgGlow: "orange-500/20"
  },
];

// --- Real-time Activity Data ---
const activityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  requests: [3200, 4100, 3800, 5200, 4800, 6200, 5900],
};

// --- Enhanced Logs Data ---
const recentLogs = [
  { endpoint: "POST /v1/verify", status: 200, time: "Just now", latency: "12ms", method: "POST", region: "US-EAST" },
  { endpoint: "GET /v1/balance", status: 200, time: "45s ago", latency: "8ms", method: "GET", region: "EU-WEST" },
  { endpoint: "POST /v1/payout", status: 401, time: "2m ago", latency: "15ms", method: "POST", region: "AP-SOUTH" },
  { endpoint: "POST /v1/verify", status: 200, time: "5m ago", latency: "11ms", method: "POST", region: "US-WEST" },
];

// --- API Endpoints Data ---
const apiEndpoints = [
  { name: "Authentication", endpoint: "/auth/token", calls: "234.5K", change: "+12%" },
  { name: "User Management", endpoint: "/users", calls: "456.2K", change: "+8%" },
  { name: "Payments", endpoint: "/payments", calls: "123.8K", change: "+23%" },
];

export default function APIDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 space-y-8 p-4 md:p-8">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Production • Live</span>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded-full">v2.4.1</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            API Control Center
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-2xl mt-2">
            Monitor your API traffic, analyze performance metrics, and manage system health in real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 font-semibold text-sm">
            <RefreshCcw size={16} className="text-slate-500" /> Sync Data
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-lg shadow-slate-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-semibold text-sm">
            <Terminal size={16} className="text-emerald-400" /> API Documentation
          </button>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black ${stat.isUp ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                {stat.change}
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{stat.title}</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1 tracking-tight">{stat.value}</h3>
            <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full w-3/4 bg-gradient-to-r ${stat.gradient} rounded-full`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- Main Activity Chart (Modern Redesign) --- */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 tracking-tight flex items-center gap-2">
                  <Activity size={20} className="text-emerald-500" /> Request Volume
                </h3>
                <p className="text-slate-400 text-xs font-medium">Real-time API traffic analytics</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-600">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-slate-500">Requests</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Modern Bar Chart Visualization */}
            <div className="flex items-end justify-between h-64 gap-3">
              {activityData.requests.map((value, idx) => {
                const maxValue = Math.max(...activityData.requests);
                const height = (value / maxValue) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-gradient-to-t from-emerald-400 to-teal-400 rounded-xl transition-all duration-500 hover:from-emerald-500 hover:to-teal-500 cursor-pointer relative overflow-hidden"
                        style={{ height: `${height}%`, minHeight: '4px' }}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{activityData.labels[idx]}</span>
                    <div className="text-[9px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {value.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Quick Stats Under Chart */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">Peak Hour</p>
                <p className="text-lg font-black text-slate-800">14:00-15:00</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">Total Requests</p>
                <p className="text-lg font-black text-slate-800">33.2K</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">Avg Response</p>
                <p className="text-lg font-black text-slate-800">42ms</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Real-time Logs Stream (Enhanced) --- */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-lg flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 tracking-tight flex items-center gap-2">
                  <Server size={20} className="text-emerald-500" /> Live Activity Stream
                </h3>
                <p className="text-slate-400 text-xs font-medium">Recent API requests and responses</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">Live Feed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            <div className="divide-y divide-slate-50">
              {recentLogs.map((log, i) => (
                <div key={i} className="group p-4 hover:bg-slate-50/80 transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`mt-0.5 p-1.5 rounded-lg ${log.status === 200 ? 'bg-emerald-100 text-emerald-600' : log.status === 401 ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
                        {log.status === 200 ? <CheckCircle size={14} /> : log.status === 401 ? <AlertCircle size={14} /> : <XCircle size={14} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${log.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {log.method}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">{log.region}</span>
                        </div>
                        <p className="text-[12px] font-mono font-bold text-slate-700">{log.endpoint}</p>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-[9px] font-bold text-slate-400">{log.time}</span>
                          <span className="text-[9px] font-bold text-slate-400">{log.latency}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-[10px] font-black px-2 py-1 rounded-md ${log.status === 200 ? 'bg-emerald-50 text-emerald-600' : log.status === 401 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                      {log.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <button className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-[11px] font-black uppercase tracking-wider rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md">
              View Full Activity Log
            </button>
          </div>
        </div>
      </div>

      {/* --- Bottom Row: API Endpoints & System Health --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* API Endpoints Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 tracking-tight flex items-center gap-2">
                  <Code size={20} className="text-emerald-500" /> Top Endpoints
                </h3>
                <p className="text-slate-400 text-xs font-medium">Most frequently accessed API routes</p>
              </div>
              <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View All <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Endpoint Name</th>
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Path</th>
                  <th className="text-right p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Calls</th>
                  <th className="text-right p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {apiEndpoints.map((endpoint, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <span className="text-sm font-bold text-slate-700">{endpoint.name}</span>
                    </td>
                    <td className="p-4">
                      <code className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{endpoint.endpoint}</code>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-bold text-slate-800">{endpoint.calls}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`text-[11px] font-black px-2 py-1 rounded-md ${endpoint.change.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                        {endpoint.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight flex items-center gap-2">
                  <Cpu size={20} className="text-emerald-400" /> System Health
                </h3>
                <p className="text-slate-400 text-xs font-medium">All systems operational</p>
              </div>
              <div className="px-3 py-1.5 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  100% Uptime
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "API Gateway", status: "operational", latency: "12ms", region: "Global" },
                { name: "Database Cluster", status: "operational", latency: "8ms", region: "Multi-AZ" },
                { name: "Cache Layer", status: "degraded", latency: "34ms", region: "US-EAST" },
                { name: "Message Queue", status: "operational", latency: "5ms", region: "EU-WEST" },
              ].map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${service.status === 'operational' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'}`} />
                    <div>
                      <p className="text-sm font-bold text-white">{service.name}</p>
                      <p className="text-[9px] font-mono text-slate-400">{service.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-mono text-emerald-400">{service.latency}</p>
                    <p className="text-[8px] font-bold uppercase text-slate-500">{service.status}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Last incident: 23 days ago</span>
                <button className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                  View Status History <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}