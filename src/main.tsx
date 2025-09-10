import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryProvider } from "@/app/providers";
import { Provider } from "@/shared/ui/provider";

import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Provider>
        <App />
      </Provider>
    </QueryProvider>
  </StrictMode>,
);
