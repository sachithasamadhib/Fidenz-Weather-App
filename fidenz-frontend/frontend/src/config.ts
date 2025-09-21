export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN ?? "",
  AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID ?? "",
  AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE ?? "https://fidenz-weather-api",
  AUTH0_SCOPE: (import.meta.env.VITE_AUTH0_SCOPE as string | undefined) ?? "openid profile email read:weather",
  AUTH0_REDIRECT_URI: (import.meta.env.VITE_AUTH0_REDIRECT_URI as string | undefined),
};
