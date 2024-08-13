import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Loading from './Loading';

const { Suspense } = React;

createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
