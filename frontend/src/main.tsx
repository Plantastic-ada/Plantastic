import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { worker } from "./mocks/browser";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "flowbite";

async function prepare() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration: ServiceWorkerRegistration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError: Error) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  if (import.meta.env.DEV) {
    // Starts MSW in dev mode
    await worker.start();
  }

  const root = document.getElementById("root")!;
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

prepare();
