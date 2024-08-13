import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from 'app/Loading';

import './css/index.css';

const { Suspense, lazy } = React;

const HomePage = lazy(() => import('./HomePage'));
const CategoryPage = lazy(() => import('./CategoryPage'));
const StoresPage = lazy(() => import('./StoresPage'));

export const routes = [
  {
    path: '/',
    element: <Suspense fallback={<Loading />}><HomePage /></Suspense>
  },
  {
    path: '/products/:category?',
    element: <Suspense fallback={<Loading />}><CategoryPage /></Suspense>
  },
  {
    path: '/stores',
    element: <Suspense fallback={<Loading />}><StoresPage /></Suspense>
  },
];

const App: React.FC = () => {
  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}

export default App;
