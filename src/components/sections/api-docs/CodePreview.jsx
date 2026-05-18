"use client";

export default function CodePreview() {
	return (
		<div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0b1220]">

			<div className="px-5 py-3 border-b border-slate-800 text-xs font-bold text-slate-400">
				Code Preview
			</div>

			<pre className="p-6 text-sm text-slate-300 overflow-auto">
{`curl -X POST https://api.bulkpe.in/v1/verify \\
-H "Authorization: Bearer sk_live..."`}
			</pre>

		</div>
	);
}