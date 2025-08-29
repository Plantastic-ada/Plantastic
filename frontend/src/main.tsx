import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/browser'; 
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'flowbite'

async function prepare() {
  if (import.meta.env.DEV) {
    // Starts MSW in dev mode
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
