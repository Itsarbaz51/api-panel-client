import React from 'react';

export default function Header({ title, subtitle, icon, actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-slate-500 text-sm font-medium">{subtitle}</p>
        </div>
      </div>
      
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}