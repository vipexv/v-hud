import React from "react";
import ReactDOM from "react-dom/client";
// import { VisibilityProvider } from "./providers/VisibilityProvider";
import Hud from "./components/Hud";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Hud />
  </React.StrictMode>
);
