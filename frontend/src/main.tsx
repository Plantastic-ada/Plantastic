import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { worker } from './mocks/browser';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "flowbite";
import { AuthProvider } from "./context/AuthContext";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  // MUST REMOVE <React.StrictMode> TO DEPLOY
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
