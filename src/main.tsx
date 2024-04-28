import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { App } from "./app.tsx";
import { enableMSW } from "./shared/api/index.ts";

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
});
