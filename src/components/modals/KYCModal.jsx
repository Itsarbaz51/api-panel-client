'use client';

import KYCForm from '../forms/KYCForm';

export default function KYCModal({ open, close, submit, loading }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div 
                className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all" 
                style={{ maxHeight: '90vh' }}
            >
                {/* Sticky Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">Create KYC Profile</h2>
                        <p className="text-sm text-slate-500 mt-1">Fill in the required information below</p>
                    </div>
                    <button 
                        onClick={close} 
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        title="Close"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                {/* Scrollable Content Body */}
                <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/50 flex-1">
                    <KYCForm onSubmit={submit} loading={loading} />
                </div>
            </div>
        </div>
    );
}