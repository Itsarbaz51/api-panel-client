import React from 'react';

export default function EmptyState({ icon, title, description, buttonText, onButtonClick }) {
  return (
    <div className="mt-8 text-center border-2 border-dashed border-slate-200 rounded-3xl py-12 px-6">
      <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">{description}</p>
      {buttonText && (
        <button 
          onClick={onButtonClick}
          className="mt-6 text-teal-600 font-bold text-sm hover:underline"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}