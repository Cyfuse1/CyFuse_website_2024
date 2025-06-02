import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Team from './components/Team';
import About from './components/About';
import Events from './components/Events';
import EventDetail from './components/EventDetail';
import WebLayout from './WebLayout';

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<About />} />
          <Route path="team" element={<Team />} />
          
          {/* Projects nested routes */}
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path=":projectId" element={<ProjectDetail />} />
          </Route>
          
          {/* Events nested routes */}
          <Route path="events">
            <Route index element={<Events />} />
            <Route path=":eventId" element={<EventDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;