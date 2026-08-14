import type { ApiResponse } from "../types/api";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  baseUrl?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  token?: string;
  body?: unknown;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    baseUrl = process.env.NEXT_PUBLIC_API_URL || "",
    params,
    token,
    headers,
    body,
    ...customConfig
  } = options;

  let url = endpoint;
  if (!/^https?:\/\//i.test(endpoint)) {
    const base = baseUrl.replace(/\/+$/, "");
    const path = endpoint.replace(/^\/+/, "");
    url = base ? `${base}/${path}` : endpoint;
  }

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const reqHeaders = new Headers(headers);

  if (token) {
    reqHeaders.set("Authorization", `Bearer ${token}`);
  }

  let reqBody: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (
      typeof body === "string" ||
      body instanceof Blob ||
      body instanceof FormData ||
      body instanceof URLSearchParams
    ) {
      reqBody = body;
    } else {
      reqBody = JSON.stringify(body);
      if (!reqHeaders.has("Content-Type")) {
        reqHeaders.set("Content-Type", "application/json");
      }
    }
  }

  try {
    const res = await fetch(url, {
      ...customConfig,
      headers: reqHeaders,
      body: reqBody,
    });

    let data: unknown = null;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const message =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
          ? (data as { message: string }).message
          : res.statusText || `Request failed with status ${res.status}`;

      return {
        success: false,
        message,
      };
    }

    if (typeof data === "object" && data !== null && "success" in data) {
      return data as ApiResponse<T>;
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
