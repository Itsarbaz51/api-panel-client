import React from 'react';

export default function Tabs({ activeTab, onTabChange, tabs }) {
  return (
    <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === tab.id 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
