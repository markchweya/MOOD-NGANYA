import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { Providers } from "@/app/Providers";
import "@/styles/index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

createRoot(root).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
