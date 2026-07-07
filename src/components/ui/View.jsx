'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';

// --- Icons (Simple Inline SVGs for ease of copy-paste) ---
const IconHash = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;
const IconUser = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconMail = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7 8.9a2.2 2.2 0 003.3 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconCalendar = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconToggle = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>;
const IconCode = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const IconPhone = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3.28a1 1 0 01-.948-.684l-1.498-4.493a1 1 0 01.502-1.21l2.257-1.13a11.042 11.042 0 00-5.516-5.516l-1.13 2.257a1 1 0 01-1.21.502l-4.493-1.498a1 1 0 01-.684-.949V5z" /></svg>;
const IconCopy = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

// Mapping fields to icons
const iconMap = {
    id: <IconHash />,
    _id: <IconHash />,
    name: <IconUser />,
    firstName: <IconUser />,
    lastName: <IconUser />,
    email: <IconMail />,
    phone: <IconPhone />,
    mobile: <IconPhone />,
    createdAt: <IconCalendar />,
    updatedAt: <IconCalendar />,
    date: <IconCalendar />,
    isActive: <IconToggle />,
    isVerified: <IconToggle />,
    role: <IconToggle />,
    metadata: <IconCode />,
};

const hiddenFields = [
    'refreshToken', 'passwordForgotToken',
    'passwordForgotExpires', 'lastPasswordForgot', 'transactionPin',
];

const formatLabel = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

const formatValue = (key, value) => {
    if (value === null || value === undefined || value === '') {
        return <span className="text-slate-400 italic font-normal">Not provided</span>;
    }

    // Handle image fields
    if (key.toLowerCase().includes('image') && typeof value === 'string' && (value.startsWith('http') || value.startsWith('/'))) {
        return (
            <div className="mt-2 rounded-lg overflow-hidden border border-slate-100 shadow-sm inline-block">
                <img src={value} alt={key} className="h-40 w-40 object-cover" />
            </div>
        );
    }

    if (typeof value === 'boolean') {
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${value ? 'bg-primary/10 text-primary ring-1 ring-emerald-600/10' : 'bg-slate-100 text-slate-700 ring-1 ring-slate-600/10'
                }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${value ? 'bg-primary' : 'bg-slate-400'}`}></span>
                {value ? 'Active' : 'Inactive'}
            </span>
        );
    }

    if (key.toLowerCase().includes('date') || key === 'createdAt' || key === 'updatedAt') {
        try {
            const date = new Date(value);
            return (
                <div className="flex flex-col text-slate-900">
                    <span className="font-medium">{date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <span className="text-xs text-slate-500">{date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
            );
        } catch { return value; }
    }

    if (typeof value === 'object') {
        return (
            <pre className="mt-2 text-[12px] leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-emerald-300 font-mono shadow-inner">
                {JSON.stringify(value, null, 2)}
            </pre>
        );
    }

    // Special handling for IDs to allow copying (visual part only here)
    if (key.toLowerCase().includes('id') && String(value).length > 15) {
        return (
            <div className="flex items-center gap-2 group bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 w-fit">
                <span title={String(value)} className="font-mono text-sm text-slate-600">
                    {String(value).slice(0, 8)}...{String(value).slice(-5)}
                </span>
                <button className="text-slate-400 group-hover: transition-colors" title="Copy ID">
                    <IconCopy />
                </button>
            </div>
        );
    }

    return <span className="font-medium text-slate-950">{String(value)}</span>;
};

export default function View({ open, onClose, title, data }) {
    if (!open || !data) return null;

    // Separate prominent fields (like Name, Email) from regular fields
    const prominentKeys = ['name', 'firstName', 'lastName', 'email', 'phone'];
    const prominentFields = [];
    const regularFields = [];

    Object.entries(data).forEach(([key, value]) => {
        if (hiddenFields.includes(key)) return;
        if (prominentKeys.includes(key)) {
            prominentFields.push([key, value]);
        } else {
            regularFields.push([key, value]);
        }
    });

    // Sort prominent fields based on the order in prominentKeys array
    prominentFields.sort((a, b) => prominentKeys.indexOf(a[0]) - prominentKeys.indexOf(b[0]));


    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">

            {/* Modal Container */}
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-slate-500/10 border border-slate-100 animate-in fade-in zoom-in-95 duration-300 ease-out overflow-hidden">

                {/* Header - Cleaner & tighter */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-950 tracking-tight">{title}</h2>
                        <p className="text-sm text-slate-500 mt-1">Core profile and account details</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2.5 rounded-full transition-all duration-200 flex-shrink-0"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">

                    {/* Prominent Section (Cards) */}
                    {prominentFields.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {prominentFields.map(([key, value]) => (
                                <div key={key} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-primary/20 hover:shadow-emerald-50 transition-all duration-200">
                                    <div className="p-3 rounded-xl bg-primary/10  border border-primary/20">
                                        {iconMap[key] || <IconUser />}
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            {formatLabel(key)}
                                        </dt>
                                        <dd className="mt-1 text-lg font-semibold text-slate-950 break-all">
                                            {formatValue(key, value)}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Separator Title */}
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-5 px-1">Detailed Information</h3>

                    {/* Regular Section (Grid List) */}
                    <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-0 divide-y md:divide-y-0 divide-slate-100">
                            {regularFields.map(([key, value], index) => (
                                <div key={key} className={`flex flex-col p-5 ${index % 2 !== 0 ? 'md:border-l border-slate-100' : ''} ${index >= 2 ? 'md:border-t' : ''}`}>
                                    <dt className="text-sm font-medium text-slate-500 flex items-center gap-2.5 mb-2">
                                        <span className="text-emerald-500/80 bg-primary/10 p-1.5 rounded-lg border border-primary/20/50">
                                            {iconMap[key] || iconMap[key.includes('id') ? 'id' : ''] || <IconCode />}
                                        </span>
                                        {formatLabel(key)}
                                    </dt>
                                    <dd className="text-[15px] break-words pl-10">
                                        {formatValue(key, value)}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* Footer - Minimal */}
                <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end">
                    <Button onClick={onClose} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm border-0 shadow-md transition-all">
                        Got it, Close
                    </Button>
                </div>
            </div>
        </div>
    );
}