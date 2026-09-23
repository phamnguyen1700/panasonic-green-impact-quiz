const rawApiBaseUrl = import.meta.env["VITE_API_BASE_URL"] as string | undefined;
const rawSubmitEnabled = import.meta.env["VITE_ENABLE_API_SUBMIT"] as string | undefined;
const rawShareBaseUrl = import.meta.env["VITE_SHARE_BASE_URL"] as string | undefined;

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const env = {
  apiBaseUrl: rawApiBaseUrl ? trimTrailingSlash(rawApiBaseUrl) : "/api",
  apiSubmitEnabled: rawSubmitEnabled !== "false",
  shareBaseUrl: rawShareBaseUrl ? trimTrailingSlash(rawShareBaseUrl) : "",
} as const;
