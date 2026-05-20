export const apiClient = async (url, options = {}) => {
  const isFormData = options.body instanceof FormData;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing in env");
  }

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  // safe parse
  const contentType = res.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const error = new Error(data?.message || "Request failed");

    error.response = { data };
    error.status = res.status;
    throw error;
  }

  return data;
};
