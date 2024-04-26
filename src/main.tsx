import React from "react";
import ReactDOM from "react-dom/client";
import { enableMSW } from "./api/mocks/index.ts";
import { CssBaseline } from "@mui/material";
import { App } from "./app.tsx";

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
});
