import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { worker } from './mocks/browser';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "flowbite";
import { AuthProvider } from "./context/AuthContext";
import GardenProvider from "./context/GardenContext";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
	// MUST REMOVE <React.StrictMode> TO DEPLOY
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<GardenProvider>
					<App />
				</GardenProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
