import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './css/index.css';

const router = createBrowserRouter([
  {
    path: '/checkout/cart',
    lazy: async () => ({ Component: React.lazy(() => import('./CartPage')) }),
  },
  {
    path: '/checkout/checkout',
    lazy: async () => ({ Component: React.lazy(() => import('./Checkout')) }),
  },
  {
    path: '/checkout/thanks',
    lazy: async () => ({ Component: React.lazy(() => import('./Thanks')) }),
  },
])

createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
