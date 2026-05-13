import React from 'react';

const alertStyles = {
  info: 'bg-blue-50 border-blue-100 text-blue-700',
  success: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  warning: 'bg-amber-50 border-amber-100 text-amber-700',
  error: 'bg-red-50 border-red-100 text-red-700',
};

const iconStyles = {
  info: 'text-blue-500',
  success: 'text-emerald-500',
  warning: 'text-amber-500',
  error: 'text-red-500',
};

export default function Alert({ type = 'info', icon, title, children }) {
  return (
    <div className={`mb-8 p-4 border rounded-2xl flex gap-3 items-start ${alertStyles[type]}`}>
      {icon && <div className={`mt-0.5 ${iconStyles[type]}`}>{icon}</div>}
      <div className="flex-1">
        {title && <p className="text-sm font-semibold mb-1">{title}</p>}
        <p className="text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}