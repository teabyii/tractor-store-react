import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './css/index.css';

const router = createBrowserRouter([
  {
    path: '/product/:id',
    lazy: async() => ({ Component: React.lazy(() => import('./ProductPage'))}),
  },
])

createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
