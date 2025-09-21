import { Auth0Provider } from "@auth0/auth0-react";
import { CONFIG } from "../config";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  if (!CONFIG.AUTH0_DOMAIN || !CONFIG.AUTH0_CLIENT_ID) {
    console.error(
      "Auth0 configuration missing. Set VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID in your .env."
    );
    return (
      <div style={{ padding: 24 }}>
        <h2>Missing Auth0 configuration</h2>
        <p>
          Please set <code>VITE_AUTH0_DOMAIN</code> and <code>VITE_AUTH0_CLIENT_ID</code> in a
          <code>.env</code> file and restart the dev server.
        </p>
      </div>
    );
  }

  if (CONFIG.AUTH0_DOMAIN.includes("http://") || CONFIG.AUTH0_DOMAIN.includes("https://") || CONFIG.AUTH0_DOMAIN.includes("/")) {
    console.error("VITE_AUTH0_DOMAIN must be a bare domain like 'dev-xxxx.us.auth0.com' with no protocol or slashes.");
    return (
      <div style={{ padding: 24 }}>
        <h2>Invalid Auth0 Domain</h2>
        <p>
          VITE_AUTH0_DOMAIN must look like <code>dev-xxxx.us.auth0.com</code> (no <code>https://</code>, no trailing
          slash). Update your <code>.env</code> and restart the dev server.
        </p>
      </div>
    );
  }

  if (!CONFIG.AUTH0_AUDIENCE) {
    console.warn(
      "Auth0 API audience is empty. Protected API calls will fail. Set VITE_AUTH0_AUDIENCE."
    );
  }

  const onRedirectCallback = (appState?: { returnTo?: string }) => {
    const targetUrl = appState?.returnTo || window.location.pathname;
    window.history.replaceState({}, document.title, targetUrl);
  };

  return (
    <Auth0Provider
      domain={CONFIG.AUTH0_DOMAIN}
      clientId={CONFIG.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: CONFIG.AUTH0_REDIRECT_URI ?? window.location.origin,
        audience: CONFIG.AUTH0_AUDIENCE,
        scope: CONFIG.AUTH0_SCOPE,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
