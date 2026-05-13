import React from 'react';
import { CheckCircle2, XCircle, Copy, ExternalLink, MoreHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function WebhookCard({ 
  id, 
  name, 
  url, 
  status, 
  lastUsed, 
  onCopy, 
  onViewDetails, 
  onMoreOptions 
}) {
  const isActive = status === 'Active';
  
  const StatusIcon = isActive ? CheckCircle2 : XCircle;
  const statusColor = isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600';
  const statusBadgeColor = isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-all group shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg mt-1 ${statusColor}`}>
            <StatusIcon size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              {name}
              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${statusBadgeColor}`}>
                {status}
              </span>
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                {url}
              </code>
              <button 
                onClick={() => onCopy(url)}
                className="text-slate-300 hover:text-teal-600 transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-50">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Last Triggered</p>
            <p className="text-sm font-medium text-slate-600">{lastUsed}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onViewDetails({ id, name, url, status, lastUsed })}
              className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <ExternalLink size={18} />
            </button>
            <button 
              onClick={() => onMoreOptions({ id, name, url, status, lastUsed })}
              className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}