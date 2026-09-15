import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import HostProvider from "./store/host/HostProvider.jsx";
import UserProvider from "./store/user/UserProvider.jsx";
import AuthenticationProvider from "./store/auth/AuthenticationProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthenticationProvider>
      <HostProvider>
        <UserProvider>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </UserProvider>
      </HostProvider>
    </AuthenticationProvider>
  </StrictMode>
);
