import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';

import './css/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    // lazy: async() => ({ Component: React.lazy(() => import('./HomePage'))}),
    element: <HomePage />
  },
  {
    path: '/products/:category?',
    lazy: async() => ({ Component: React.lazy(() => import('./CategoryPage'))}),
  },
  {
    path: '/stores',
    lazy: async() => ({ Component: React.lazy(() => import('./StoresPage'))}),
  },
])

createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
