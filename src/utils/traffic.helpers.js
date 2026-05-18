export const getMethodStyles = (method) => {
	switch (method) {
		case "GET":
			return "bg-teal-50 text-teal-700 border-teal-100";

		case "POST":
			return "bg-emerald-100 text-emerald-800 border-emerald-200";

		case "PUT":
			return "bg-amber-50 text-amber-700 border-amber-100";

		case "DELETE":
			return "bg-rose-50 text-rose-700 border-rose-100";

		default:
			return "bg-slate-50 text-slate-700 border-slate-100";
	}
};

export const getStatusStyles = (status) => {
	if (status >= 200 && status < 300) {
		return "bg-emerald-50 text-emerald-700 border-emerald-100";
	}

	if (status >= 400) {
		return "bg-rose-50 text-rose-600 border-rose-100";
	}

	return "bg-amber-50 text-amber-700 border-amber-100";
};