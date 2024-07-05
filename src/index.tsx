import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Use contextBridge
window.electron.on("main-process-message", (_event, message) => {
  // eslint-disable-next-line no-console
  console.log(message);
});
