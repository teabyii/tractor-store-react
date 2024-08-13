import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from 'app/Loading';

import './css/index.css';

const { Suspense, lazy } = React;

const CartPage = lazy(() => import('./CartPage'));
const Checkout = lazy(() => import('./Checkout'));
const Thanks = lazy(() => import('./Thanks'));

export const routes = [
  {
    path: '/checkout/cart',
    element: <Suspense fallback={<Loading />}><CartPage /></Suspense>
  },
  {
    path: '/checkout/checkout',
    element: <Suspense fallback={<Loading />}><Checkout /></Suspense>
  },
  {
    path: '/checkout/thanks',
    element: <Suspense fallback={null}><Thanks /></Suspense>
  },
];

const App: React.FC = () => {
  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
};

export default App;
