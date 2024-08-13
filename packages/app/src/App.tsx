import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Loading from "./Loading";

import "./css/App.css";

const App: React.FC = () => {
  const [routes, setRoutes] = useState<RouteObject[]>([]);

  useEffect(() => {
    Promise.all([
      import("explore/App"),
      import("checkout/App"),
      import("decide/App"),
    ]).then(([explore, checkout, decide]) => {
      setRoutes([...explore.routes, ...checkout.routes, ...decide.routes]);
    });
  }, [])

  return (
    routes.length ? <RouterProvider router={createBrowserRouter(routes)} /> : <Loading />
  );
}

export default App;
