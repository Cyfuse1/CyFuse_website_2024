import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import About from './components/About.jsx';
import Home from './components/Home.jsx';
import Projects from './components/Projects.jsx';
import Team from './components/Team.jsx';
import Event from './components/Event.jsx';
import './index.css';
import WebLayout from './WebLayout.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'aboutus',
        element: <About />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'team',
        element: <Team />
      },
      {
        path: 'events',
        element: <Event />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)