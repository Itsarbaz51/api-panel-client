"use client";

export default function LiveResponse({
	showResponse,
}) {
	return (
		<div className="bg-[#0f172a] rounded-2xl p-6 text-slate-200 min-h-[350px] border border-slate-800">

			<h3 className="text-sm font-bold uppercase tracking-wider mb-5">
				Live Response
			</h3>

			{showResponse ? (
				<pre className="text-sm leading-7 overflow-auto">
{`{
  "success": true,
  "message": "Verified successfully",
  "status": 200
}`}
				</pre>
			) : (
				<div className="h-full flex items-center justify-center text-slate-500 text-sm">
					Run request to see response
				</div>
			)}

		</div>
	);
}