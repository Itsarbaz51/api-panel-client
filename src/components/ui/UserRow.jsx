import React from 'react';
import { ShieldCheck, Mail, Calendar, MoreVertical } from 'lucide-react';

export default function UserRow({ user, onView, onEdit, onDelete }) {
  const getStatusStyles = (status) => {
    return status === 'ACTIVE' 
      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
      : 'bg-slate-100 text-slate-500 border border-slate-200';
  };

  const handleMenuClick = () => {
    // This would typically open a dropdown menu
    // For now, we'll just show a simple menu
    const action = window.confirm(`What would you like to do with ${user.name}?\nOK = View, Cancel = Edit`);
    if (action) {
      onView(user);
    } else {
      onEdit(user);
    }
  };

  return (
    <tr className="group hover:bg-slate-50/50 transition-colors">
      <td className="px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-emerald-500/20">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="text-[15px] font-bold text-slate-800 leading-none mb-1">{user.name}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Mail size={12} className="text-slate-300" /> {user.email}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-6 text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-xs font-semibold">{user.role}</span>
        </div>
      </td>
      <td className="px-6 py-6">
        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-widest ${getStatusStyles(user.status)}`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-6">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Calendar size={14} className="text-slate-300" /> {user.joined}
        </div>
      </td>
      <td className="px-6 py-6 text-right">
        <button 
          onClick={handleMenuClick}
          className="p-3 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all"
        >
          <MoreVertical size={20} />
        </button>
      </td>
    </tr>
  );
}