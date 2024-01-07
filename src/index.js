import React from 'react';
import ReactDOM from 'react-dom/client';
import AddMod from './AddMod';
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from './404';

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    path: "/",
    element: <App />,
  },
  {
    path: "/add-mod",
    element: <AddMod />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);