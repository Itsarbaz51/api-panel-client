export const apiClient = async (url, options = {}) => {
  const isFormData = options.body instanceof FormData;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing in env");
  }

  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
        ...options.headers,
      },
    });

    const contentType = res.headers.get("content-type") || "";

    let data;

    try {
      data = contentType.includes("application/json")
        ? await res.json()
        : await res.text();
    } catch {
      data = null;
    }

    if (!res.ok) {
      const error = new Error(data?.message || data || "Request failed");

      error.response = {
        data,
      };

      error.status = res.status;

      throw error;
    }

    return data;
  } catch (error) {
    console.error("API Client Error:", error);

    throw error;
  }
};
