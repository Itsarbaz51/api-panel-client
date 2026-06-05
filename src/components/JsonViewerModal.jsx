"use client";

export default function JsonViewerModal({ open, title, data, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[70vh]">
          <pre className="bg-slate-900 text-green-400 p-5 rounded-2xl text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
