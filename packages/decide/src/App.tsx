import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Loading from 'app/Loading';

import './css/index.css';

const { Suspense, lazy } = React;

const ProductPage = lazy(() => import('./ProductPage'));

export const routes = [
  {
    path: '/product/:id',
    element: <Suspense fallback={<Loading />}><ProductPage /></Suspense>
  },
];

const App: React.FC = () => {
  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}

export default App;
