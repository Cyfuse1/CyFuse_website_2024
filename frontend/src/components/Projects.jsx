import React from 'react';

const projectData = [
  { 
    title: 'Space Debris', 
    description: 'This project amalgamates nuclear physics and AI to identify and eliminate hazardous space debris. In-depth research focuses on devising AI-driven algorithms capable of detecting and tracking debris, coupled with developing innovative strategies for removal.' 
  },
  { 
    title: 'Automated Attendance', 
    description: 'Leveraging computer vision and machine learning, this project aims to revolutionize attendance tracking across varied settings. Participants will delve into image processing, data analytics, and algorithm development to streamline attendance processes efficiently.' 
  },
  { 
    title: 'Robotic Arm', 
    description: 'Harnessing computer vision and gesture control, this project focuses on innovating robotic arms capable of intricate and complex tasks. Participants will design, test, and refine gesture-controlled robotic arms, revolutionizing industries requiring precision and versatility.' 
  },
  { 
    title: 'LiFi Communication', 
    description: 'Exploring the fusion of LiFi technology with UAVs, this project aims to enhance communication and data transmission capabilities. Participants will experiment with networking protocols, hardware integration, and novel applications for this integrated system.' 
  },
];

function Projects() {
  return (
    <div className="relative bg-black text-white font-sans min-h-screen py-8 px-6 md:px-16">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-40 backdrop-blur-lg -z-10"></div>

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">Projects</h1>
        <h2 className="text-lg md:text-2xl mt-4">Take a look at our projects</h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-start items-start w-full h-auto p-6 md:p-8 text-sm md:text-lg bg-gradient-to-br from-white/10 to-white/30 shadow-lg backdrop-blur-[15%] rounded-2xl"
          >
            {/* Overlay Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-black opacity-50 rounded-2xl pointer-events-none"></div>

            {/* Project Content */}
            <span className="text-gray-300 text-xs uppercase tracking-widest mb-2">In Progress</span>
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
