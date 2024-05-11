//modules
import React from "react";
import ReactDOM from "react-dom/client";

//components
import AppRoutes from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
