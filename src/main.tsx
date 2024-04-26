import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { enableMSW } from "./api/mocks/index.ts";
import { CssBaseline } from "@mui/material";

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
});
