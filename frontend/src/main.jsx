import React from 'react';
import ReactDOM from 'react-dom';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import About from './components/About.jsx';
import Event from './components/Event.jsx';
import EventDetail from './components/EventDetail.jsx';
import Home from './components/Home.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import Projects from './components/Projects.jsx';
import Team from './components/Team.jsx';
import './index.css';
import WebLayout from './WebLayout.jsx';


const router = createHashRouter([
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