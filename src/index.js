import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AddIdeas from './AddIdeas';
import App from './App';
import Navbar from './Navbar';
import Ideas from './Ideas'
import LiveChat from './LiveChat'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from './404';
import ClickerGame from './ClickerGame';

const router = createBrowserRouter([
  {
    errorElement: [<Navbar />, <NotFound />],
    path: "/",
    element: <App />
  },
  {
    path: "/ideas",
    element: [<Navbar />, <Ideas />],
  },
  {
    path: '/add-ideas',
    element: [<Navbar />, <AddIdeas />]
  },
  {
    path: '/live-chat',
    element: [<Navbar />, <LiveChat />]
  },
  {
    path: '/clicker-game',
    element: [<Navbar />, <ClickerGame />]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);