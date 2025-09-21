import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <nav className="px-6 py-5 bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <span role="img" aria-label="weather">🌤️</span>
          Fidenz Weather App
        </h1>
        {isAuthenticated && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
