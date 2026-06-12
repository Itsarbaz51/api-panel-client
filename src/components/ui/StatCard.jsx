import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({ title, value, change, trend, color = "" }) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? '' : trend === 'down' ? 'text-red-600' : 'text-slate-500';
  
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-200 transition-all">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        <div className="flex items-center gap-0.5">
          <TrendIcon size={12} className={trendColor} />
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${trendColor} bg-slate-100`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}