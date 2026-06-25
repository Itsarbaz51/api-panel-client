'use client';

import {
    Copy,
    Check,
    Play,
    Terminal,
    Zap,
    Shield,
    Server,
    BookOpen,
    Activity,
    Settings,
    Code2,
    Loader2,
    AlertCircle,
    Search,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useGetAllDocsConfiguration } from '@/hooks/useDocsConfiguration';
import { useGetLanguageById, useGetAllLanguages } from '@/hooks/useLanguages';

const C = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', grad: 'from-emerald-500 to-teal-500', ring: 'ring-emerald-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', grad: 'from-blue-500 to-cyan-500', ring: 'ring-blue-200' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', grad: 'from-amber-400 to-orange-400', ring: 'ring-amber-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', grad: 'from-purple-500 to-fuchsia-500', ring: 'ring-purple-200' },
    slate: { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', grad: 'from-slate-500 to-slate-600', ring: 'ring-slate-200' },
};

const LANG_ACCENT = {
    NodeJS: '#38bdf8',
    PHP: '#a855f7',
    java: '#f97316',
    'C#': '#22c55e',
};

const hi = (code) =>
    code
        ?.replace(/("[^"]*")/g, '<span style="color:#6ee7b7">$1</span>')
        ?.replace(/\b(true|false|null)\b/g, '<span style="color:#93c5fd">$1</span>')
        ?.replace(/\b(\d+)\b/g, '<span style="color:#fcd34d">$1</span>')
        ?.replace(/\b(const|let|var|import|from|try|catch|await|async|new)\b/g, '<span style="color:#c4b5fd">$1</span>')
        ?.replace(/(\w+)(?=\()/g, '<span style="color:#7dd3fc">$1</span>') || '';

export default function ApiDocs() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(null);
    const [lang, setLang] = useState('');
    const [copied, setCopied] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const [templateCode, setTemplateCode] = useState('');
    
    // Form values aur user input track karne ke liye state
    const [formValues, setFormValues] = useState({});

    // 1. GET ALL ENDPOINTS CONFIGURATION
    const { data: apiData, isLoading, isError, error, refetch } = useGetAllDocsConfiguration({ page, limit, search });

    // 2. GET ALL AVAILABLE LANGUAGES
    const { data: languagesData } = useGetAllLanguages({ page: 1, limit: 100, search: '' });

    // Extract languages safely
    const extractedLanguages = useMemo(() => {
        return languagesData?.data?.data?.data || languagesData?.data?.data || [];
    }, [languagesData]);

    // Sync initial active language
    useEffect(() => {
        if (extractedLanguages.length > 0 && !lang) {
            setLang(extractedLanguages[0].name);
        }
    }, [extractedLanguages, lang]);

    // Derive target language ID safely
    const targetLanguageId = useMemo(() => {
        if (!lang) return '';
        const match = extractedLanguages.find(
            (item) => item.name?.trim().toLowerCase() === lang?.trim().toLowerCase()
        );
        return match?.id || '';
    }, [extractedLanguages, lang]);

    // 3. GET SINGLE TEMPLATE SNIPPET BY DYNAMIC ID
    const { data: singleLangData, isLoading: isLangLoading, isError: isLangError } = useGetLanguageById(targetLanguageId);

    // Sync template snippet data to local view state
    useEffect(() => {
        const codeTemplate =
            singleLangData?.data?.data?.template ||
            singleLangData?.data?.template ||
            singleLangData?.template ||
            '';
        setTemplateCode(codeTemplate);
    }, [singleLangData]);

    useEffect(() => {
        const timer = setTimeout(() => { refetch(); }, 500);
        return () => clearTimeout(timer);
    }, [search, refetch]);

    // Code Template ke andar form values ko dynamically replace karne ka logic
    const dynamicCode = useMemo(() => {
        if (!templateCode) return '';
        let processedCode = templateCode;
        Object.entries(formValues).forEach(([key, val]) => {
            if (val !== undefined && val !== null) {
                // handles both {{KEY}} and {{key}} placeholders case-insensitively
                const regex = new RegExp(`{{${key}}}` , 'gi');
                processedCode = processedCode.replace(regex, val);
            }
        });
        return processedCode;
    }, [templateCode, formValues]);

    const formatApiData = (data) => {
        if (!data) return { total: 0, items: [] };
        let items = [];
        let total = 0;

        if (data.data && data.data.data && Array.isArray(data.data.data)) {
            items = data.data.data;
            total = data.data.total || data.data.data.length;
        } else if (Array.isArray(data)) {
            items = data;
            total = data.length;
        } else if (data.data && Array.isArray(data.data)) {
            items = data.data;
            total = data.total || data.data.length;
        }
        return { total, items };
    };

    const formattedData = formatApiData(apiData);
    const displayItems = formattedData.items;
    const displayTotal = formattedData.total;

    // Default first endpoint select hone par uski fields auto-fill karne ke liye block
    useEffect(() => {
        if (formattedData?.items && formattedData.items.length > 0 && !active) {
            const firstEp = formattedData.items[0];
            const epName = firstEp.name || firstEp.endpoint || 'Unknown';
            const epMethod = firstEp.method || 'POST';
            const epDescription = firstEp.description || 'API endpoint';
            const epGroup = firstEp.module || 'VERIFICATION';
            const Icon = firstEp.icon || Shield;
            const epColor = firstEp.color || 'emerald';

            setActive({
                ...firstEp,
                name: epName,
                method: epMethod,
                description: epDescription,
                group: epGroup,
                icon: Icon,
                color: epColor,
            });

            // Initial auto-fill for default first endpoint
            if (firstEp.requestFields && Array.isArray(firstEp.requestFields)) {
                const initialValues = {};
                firstEp.requestFields.forEach((field) => {
                    if (field.key) {
                        initialValues[field.key] = field.sampleValue || field.defaultValue || '';
                    }
                });
                setFormValues(initialValues);
            }
        }
    }, [apiData, formattedData, active]);

    const ActiveIcon = active?.icon || Shield;
    const cc = active ? C[active.color] || C.emerald : C.emerald;
    const accent = LANG_ACCENT[lang] || '#38bdf8';
    const lines = dynamicCode ? dynamicCode.split('\n') : [];

    const handleInputChange = (key, value) => {
        setFormValues((prev) => ({ ...prev, [key]: value }));
    };

    const run = () => {
        if (!active) return;
        setIsExecuting(true);
        setShowResponse(false);
        setTimeout(() => {
            setIsExecuting(false);
            setShowResponse(true);
        }, 1500);
    };

    const copy = async () => {
        if (!dynamicCode) return;
        await navigator.clipboard.writeText(dynamicCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] font-sans">
            <div className="max-w-400 mx-auto px-6 py-6 space-y-5">
                {/* ROW 1 — Page header + system status */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">API Docs</h1>
                        <p className="text-sm text-slate-500 mt-0.5">Manage endpoints, authentication, and integration guides.</p>
                    </div>
                    <div className="flex items-center gap-5 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live</span>
                        </div>
                        <div className="h-6 w-px bg-slate-100" />
                        <div className="flex items-center gap-5">
                            <div>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total APIs</p>
                                <p className="text-sm font-black text-slate-900">{isLoading ? '...' : displayTotal}</p>
                            </div>
                            <div className="h-6 w-px bg-slate-100" />
                            <div>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Avg Latency</p>
                                <p className="text-sm font-black text-slate-900">124<span className="text-slate-400 text-[10px] font-mono">ms</span></p>
                            </div>
                        </div>
                        <div className="h-6 w-px bg-slate-100" />
                        <Activity size={15} className="text-emerald-500" />
                    </div>
                </div>

                {/* ROW 2 — Search + Endpoints grid */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                            <BookOpen size={13} className="text-slate-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Endpoints</span>
                        </div>

                        <div className="relative flex-1 max-w-xs">
                            <input
                                type="text"
                                placeholder="Search endpoints..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-8 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                            />
                            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>

                        <div className="flex items-center gap-2">
                            {isLoading && <Loader2 size={14} className="animate-spin text-slate-400" />}
                            <div className="px-3 py-1 rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">{isLoading ? '...' : displayTotal} APIs</div>
                        </div>
                    </div>

                    {isError && (
                        <div className="px-5 py-4 bg-rose-50 border-b border-rose-200 flex items-center gap-2">
                            <AlertCircle size={16} className="text-rose-500" />
                            <span className="text-sm text-rose-700">Failed to load endpoints: {error?.message || 'Unknown error'}</span>
                            <button onClick={() => refetch()} className="ml-auto text-xs font-bold text-rose-600 hover:text-rose-700 underline">Retry</button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="px-5 py-4 border-b border-slate-100 md:border-r">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-xl bg-slate-100 animate-pulse"><div className="w-4 h-4 bg-slate-200 rounded" /></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                                                <div className="h-3 w-8 bg-slate-200 rounded animate-pulse" />
                                            </div>
                                            <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : displayItems.length === 0 ? (
                            <div className="col-span-3 px-5 py-8 text-center text-sm text-slate-400">No endpoints found.</div>
                        ) : (
                            displayItems.map((ep, idx) => {
                                const epName = ep.name || ep.endpoint || 'Unknown';
                                const epMethod = ep.method || 'POST';
                                const epDescription = ep.description || 'API endpoint';
                                const epGroup = ep.module || ep.group || 'api';
                                const Icon = ep.icon || Shield;
                                const epColor = ep.color || (epMethod === 'GET' ? 'blue' : 'emerald');
                                const ec = C[epColor] || C.slate;

                                const isA = active?.id === ep.id || active?.name === epName;

                                return (
                                    <button
                                        key={ep.id || ep._id || epName + idx}
                                        onClick={() => {
                                            setActive({ ...ep, name: epName, method: epMethod, description: epDescription, group: epGroup, icon: Icon, color: epColor });
                                            setShowResponse(false);

                                            // API Click hone par form fields ko sample data se bharne ka core logic 🚀
                                            if (ep.requestFields && Array.isArray(ep.requestFields)) {
                                                const initialValues = {};
                                                ep.requestFields.forEach((field) => {
                                                    if (field.key) {
                                                        initialValues[field.key] = field.sampleValue || field.defaultValue || '';
                                                    }
                                                });
                                                setFormValues(initialValues);
                                            } else {
                                                setFormValues({});
                                            }
                                        }}
                                        className={`relative flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 group border-b border-slate-100 md:border-r ${isA ? 'bg-slate-50/80' : 'hover:bg-slate-50/60'}`}>
                                        {isA && <span className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b ${ec.grad}`} />}
                                        <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors duration-200 ${isA ? ec.bg : 'bg-slate-100 group-hover:bg-white'}`}>
                                            <Icon size={16} className={isA ? ec.text : 'text-slate-400'} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className={`text-[13px] font-bold truncate ${isA ? 'text-slate-900' : 'text-slate-600'}`}>{epName}</span>
                                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded flex-shrink-0 ${epMethod === 'GET' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>{epMethod}</span>
                                            </div>
                                            <p className={`text-[11px] truncate ${isA ? 'text-slate-500' : 'text-slate-400'}`}>{epDescription}</p>
                                        </div>
                                        {isA && <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ec.text.replace('text-', 'bg-')}`} />}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ROW 3 — Builder (left) + Live Response (right) */}
                <div className="grid grid-cols-12 gap-5">
                    {/* Builder Form */}
                    <section className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        {active ? (
                            <>
                                <div className="relative border-b border-slate-100 overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cc.grad} opacity-[0.04] transition-all duration-500`} />
                                    <div className="relative z-10 flex items-center gap-4 px-6 py-5">
                                        <div className={`p-3 rounded-2xl ${cc.bg} border ${cc.border} shadow-sm flex-shrink-0`}>
                                            <ActiveIcon size={22} className={cc.text} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded ${active.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{active.method}</span>
                                                <code className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded truncate">
                                                    {active.endpoint || `/v1/${active.group?.toLowerCase() || 'api'}/${active.name?.toLowerCase().replace(/ /g, '-')}`}
                                                </code>
                                            </div>
                                            <h2 className="text-[17px] font-black text-slate-900 leading-tight">{active.name}</h2>
                                            <p className="text-[11px] text-slate-500 mt-0.5">{active.description || 'API endpoint'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                                            <Settings size={11} className="text-slate-400" /> Parameters
                                        </span>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        {active.requestFields && active.requestFields.length > 0 ? (
                                            active.requestFields.map((field, fIdx) => (
                                                <div key={field.key || fIdx}>
                                                    <label className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-2">
                                                        <span>
                                                            {field.key?.toUpperCase()}{' '}
                                                            {field.required && <span className="text-rose-500">*</span>}
                                                        </span>
                                                        <span className="text-slate-400 font-normal">{field.type || 'string'}</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder={field.description || ''}
                                                        value={formValues[field.key] || ''}
                                                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl text-[13px] font-mono text-slate-900 bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none"
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-xs text-slate-400 text-center py-4">No parameters required for this API.</div>
                                        )}
                                    </div>
                                    <button
                                        onClick={run}
                                        disabled={isExecuting}
                                        className="mt-6 w-full py-3.5 rounded-xl font-black text-[13px] text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                        style={{ background: 'linear-gradient(135deg,#059669,#0891b2)' }}>
                                        {isExecuting ? (
                                            <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                                        ) : (
                                            <><Play size={14} className="fill-white" /> Send Request</>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="p-6 text-center text-sm text-slate-400 my-auto">Select an endpoint to configure parameters.</div>
                        )}
                    </section>

                    {/* Live Response Panel */}
                    <section className="col-span-12 lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white flex flex-col">
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
                            <div className="flex items-center gap-2.5">
                                <div className={`p-1.5 rounded-lg ${showResponse ? 'bg-emerald-100' : 'bg-slate-200'}`}>
                                    <Terminal size={12} className={showResponse ? 'text-emerald-600' : 'text-slate-400'} />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">Live Response</span>
                            </div>
                            {showResponse && (
                                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                                    <Zap size={10} className="text-amber-400" /> 124ms
                                </span>
                            )}
                        </div>

                        <div className="bg-[#0f172a] flex-1 relative" style={{ minHeight: '320px' }}>
                            {!showResponse && !isExecuting && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                    <div className="p-5 rounded-2xl border border-slate-700 bg-slate-800/30">
                                        <Server size={26} className="text-slate-600" />
                                    </div>
                                    <p className="text-[12px] text-slate-500">Hit &quot;Send Request&quot; to see the live API response</p>
                                </div>
                            )}
                            {isExecuting && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                    <div className="w-12 h-12 relative flex items-center justify-center">
                                        <div className="absolute inset-0 border-[2px] border-slate-700 rounded-full" />
                                        <div className="absolute inset-0 border-[2px] border-emerald-500 rounded-full border-t-transparent animate-spin" />
                                    </div>
                                    <p className="text-[12px] font-mono text-emerald-400">Contacting server…</p>
                                </div>
                            )}
                            {showResponse && !isExecuting && (
                                <div className="absolute inset-0 p-6 flex flex-col">
                                    <pre
                                        className="text-[12px] font-mono leading-[1.75] text-slate-300 flex-1 overflow-y-auto"
                                        dangerouslySetInnerHTML={{
                                            __html: hi(active?.sampleResponse ? JSON.stringify(active.sampleResponse, null, 2) : '{}'),
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* ROW 4 — Code panel */}
                <div className="rounded-2xl overflow-hidden border border-[#1e293b] shadow-2xl" style={{ background: '#090e1a' }}>
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05] flex-wrap gap-3" style={{ background: 'rgba(0,0,0,0.4)' }}>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-mono">
                                <span>bulkpe</span>/<span>v1</span>/
                                <span style={{ color: accent }}>{active?.name?.toLowerCase().replace(/ /g, '-') || 'endpoint'}</span>
                            </div>
                        </div>
                        <button
                            onClick={copy}
                            disabled={!dynamicCode}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border text-slate-400 hover:text-white disabled:opacity-50"
                            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)' }}>
                            {copied ? (
                                <><Check size={10} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                            ) : (
                                <><Copy size={10} /> Copy snippet</>
                            )}
                        </button>
                    </div>

                    {/* Languages Selection Tabs */}
                    <div className="flex items-end gap-0 px-5 pt-3 border-b border-white/[0.05] overflow-x-auto scrollbar-hide" style={{ background: 'rgba(0,0,0,0.25)' }}>
                        {extractedLanguages.map((item) => {
                            const isA = lang === item.name;
                            const a = LANG_ACCENT[item.name] || "#34d399";
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setLang(item.name)}
                                    className="relative flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold rounded-t-xl"
                                    style={{ color: isA ? "#f1f5f9" : "#475569", background: isA ? "#0d1525" : "transparent" }}>
                                    {isA && <span className="absolute inset-x-4 top-0 h-[2px] rounded-t-full" style={{ background: a }} />}
                                    <Code2 size={12} style={{ color: isA ? a : "#334155" }} />
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Code display grid */}
                    <div className="flex flex-col md:flex-row" style={{ background: '#0d1525' }}>
                        {/* Line Numbers */}
                        <div className="select-none flex-shrink-0 py-5 text-right hidden md:block" style={{ minWidth: '54px', background: 'rgba(0,0,0,0.18)', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                            {lines.map((_, i) => (
                                <div key={i} className="text-[12px] font-mono leading-[1.9] px-4 text-slate-700">{i + 1}</div>
                            ))}
                        </div>

                        {/* Main Code Block Renderer */}
                        <div className="flex-1 py-5 px-6 md:px-8 overflow-x-auto relative min-h-[120px]">
                            {isLangLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#0d1525]/80">
                                    <Loader2 size={18} className="animate-spin text-emerald-400" />
                                </div>
                            )}
                            {isLangError || !targetLanguageId ? (
                                <div className="text-xs text-rose-400 font-mono py-4 flex items-center gap-1.5"><AlertCircle size={14} /> Template snippet configuration structure fallback active.</div>
                            ) : dynamicCode ? (
                                <pre className="text-[13px] font-mono leading-[1.9] text-slate-300" dangerouslySetInnerHTML={{ __html: hi(dynamicCode) }} />
                            ) : (
                                <div className="text-xs text-slate-500 font-mono py-4">No snippet template configured for this active language track.</div>
                            )}
                        </div>

                        {/* Right Information Sidebar */}
                        <div className="flex-shrink-0 py-6 px-5 flex flex-row md:flex-col gap-5 border-t md:border-t-0 md:border-l border-white/[0.04]" style={{ background: 'rgba(0,0,0,0.18)' }}>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-700">Language</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
                                    <span className="text-[12px] font-bold" style={{ color: accent }}>{lang}</span>
                                </div>
                            </div>
                            <div className="hidden md:block h-px bg-white/[0.04]" />
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-700">Method</p>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${active?.method === 'GET' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{active?.method || 'POST'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}