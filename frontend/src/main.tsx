import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/browser'; // Ton fichier MSW
import { BrowserRouter } from 'react-router-dom';

async function prepare() {
  if (import.meta.env.DEV) {
    // Démarre MSW en mode dev
    await worker.start();
  }

  const root = document.getElementById('root')!;
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}

prepare();
