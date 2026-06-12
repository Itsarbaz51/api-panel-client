"use client";

export default function MethodBadge({
	method,
}) {
	return (
		<span
			className={`text-[10px] font-black px-2 py-1 rounded-lg ${
				method === "GET"
					? "bg-blue-100 text-blue-700"
					: "bg-emerald-100 text-primary"
			}`}
		>
			{method}
		</span>
	);
}