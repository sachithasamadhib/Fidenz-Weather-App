import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CityDetail from "./pages/CityDetail";
import { useAuth0 } from "@auth0/auth0-react";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PrivateRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect({
        appState: { returnTo: location.pathname + location.search + location.hash },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location.pathname, location.search, location.hash]);

  if (isLoading || !isAuthenticated) return <p>Redirecting to login...</p>;
  return children;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/city/:cityId" element={<PrivateRoute><CityDetail /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
