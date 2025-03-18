import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";  // ✅ Import createRoot
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../public/assets/css/owl.carousel.css";
// import "../public/assets/css/vipodha_megamenu.css";
import "./index.css";
import { CurrencyProvider } from "./CurrencyContext";

const root = createRoot(document.getElementById("root")); // ✅ Correct usage
root.render(
  <StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>,
  </StrictMode>
);
