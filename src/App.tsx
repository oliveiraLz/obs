import React from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "primeflex/primeflex.css";

import AppProvider from "./shared/hooks";

import { AppRoutes } from "./routes/routes";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
