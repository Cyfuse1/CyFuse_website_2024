import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Team from './components/Team';
import About from './components/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/aboutus" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;