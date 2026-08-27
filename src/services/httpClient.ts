export interface HttpRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

/** Minimal, dependency-free fetch wrapper shared by campaign services. */
export async function request<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers, signal } = options;

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...(signal ? { signal } : {}),
  });

  if (!response.ok) {
    throw new HttpError(`Request failed: ${response.status}`, response.status);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const httpClient = {
  get: <T>(url: string, options?: Omit<HttpRequestOptions, "method" | "body">) =>
    request<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, body: unknown, options?: Omit<HttpRequestOptions, "method" | "body">) =>
    request<T>(url, { ...options, method: "POST", body }),
};
