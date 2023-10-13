import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { GlobalProvider } from "./shared/hooks/useGlobalContext";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <GlobalProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </GlobalProvider>
);
