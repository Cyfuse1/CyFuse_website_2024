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
import ProjectDetail from './components/ProjectDetail.jsx';
import EventDetail from './components/EventDetail.jsx';


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
        children: [
          { index: true, element: <Projects /> },
          { path: ':projectId', element: <ProjectDetail /> }
        ]
      },
      {
        path: 'team',
        element: <Team />
      },
      {
        path: 'events',
        children: [
          { index: true, element: <Event /> },
          { path: ':eventId', element: <EventDetail /> }
        ]
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