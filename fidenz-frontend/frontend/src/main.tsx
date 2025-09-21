import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./auth/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
