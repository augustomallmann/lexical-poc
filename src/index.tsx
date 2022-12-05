import "./setupEnv";
import "./index.scss";
import "playbook-ui/dist/reset.css";
import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/fontawesome-min";
import "playbook-ui/dist/fonts/regular-min";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Background } from "playbook-ui";
import App from "./App";

// Handle runtime errors
const showErrorOverlay = (err: Event) => {
  const ErrorOverlay = customElements.get("vite-error-overlay");
  if (!ErrorOverlay) {
    return;
  }
  const overlay = new ErrorOverlay(err);
  const body = document.body;
  if (body !== null) {
    body.appendChild(overlay);
  }
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
  showErrorOverlay(reason)
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Background backgroundColor="light" padding="xl">
      <App />
    </Background>
  </React.StrictMode>
);
