import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./store/UserStore.tsx";
import { ResumeProvider } from "./store/ResumeStore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
