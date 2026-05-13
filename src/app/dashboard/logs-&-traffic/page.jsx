"use client";

import React, { useState } from 'react';
import { Activity, Search, RefreshCw } from 'lucide-react';
import Header from '@/components/ui/Header';
import StatCard from '@/components/ui/StatCard';
import Tabs from '@/components/ui/Tabs';
import TrafficTable from '@/components/tables/TrafficTable';
import SystemLogsView from '@/components/ui/SystemLogsView';
import Button from '@/components/ui/Button';

export default function LogsTrafficPage() {
  const [activeTab, setActiveTab] = useState('traffic');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    // Refresh logic here
    console.log('Refreshing data...');
  };

  const handleDownloadReport = () => {
    // Download report logic here
    console.log('Downloading report...');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      
      <Header 
        title="Logs & Traffic"
        subtitle="Real-time system monitoring"
        icon={<Activity size={28} strokeWidth={2.5} />}
        actions={
          <>
            <Button 
              variant="outline"
              size="md"
              onClick={handleRefresh}
              leftIcon={<RefreshCw size={16} />}
            >
              Refresh
            </Button>
            <Button 
              variant="primary"
              size="md"
              onClick={handleDownloadReport}
            >
              Download Report
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Traffic" 
          value="84.2k" 
          change="+12.5%" 
          trend="up" 
        />
        <StatCard 
          title="Avg Response" 
          value="124ms" 
          change="-18ms" 
          trend="up" 
          color="text-blue-600" 
        />
        <StatCard 
          title="Success Rate"
          value="99.9%" 
          change="Stable" 
          trend="neutral" 
        />
        <StatCard 
          title="Active Nodes" 
          value="12/12" 
          change="Healthy" 
          trend="up" 
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
          <Tabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: 'traffic', label: 'Network Traffic' },
              { id: 'logs', label: 'System Logs' }
            ]}
          />

          <div className="relative flex-1 lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by IP, URL, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'traffic' ? (
            <TrafficTable searchQuery={searchQuery} />
          ) : (
            <SystemLogsView searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </div>
  );
}