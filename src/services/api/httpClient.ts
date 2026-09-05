import axios from "axios";

import { env } from "@/config/env.config";
import type { ApiErrorBody } from "@/types/api.types";

export class ApiError extends Error {
  readonly code?: string;
  readonly details?: ApiErrorBody["error"]["details"];

  constructor(
    message: string,
    readonly status: number,
    body?: ApiErrorBody,
  ) {
    super(message);
    this.name = "ApiError";
    this.code = body?.error.code;
    this.details = body?.error.details;
  }
}

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (!value || typeof value !== "object") return false;
  const candidate = value as ApiErrorBody;
  return Boolean(candidate.error && typeof candidate.error.message === "string");
}

export function normalizeApiError(error: unknown) {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const data = error.response?.data;
    const body = isApiErrorBody(data) ? data : undefined;
    return new ApiError(body?.error.message ?? error.message ?? "Request failed.", status, body);
  }

  if (error instanceof Error) return error;

  return new ApiError("Request failed.", 0);
}

export function getApiErrorMessage(error: unknown, fallback = "Không thể kết nối máy chủ.") {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
);
