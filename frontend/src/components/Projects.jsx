import { Chip } from '@nextui-org/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const projectData = [
  {
    title: 'Space Debris',
    description:
      'This project amalgamates nuclear physics and AI to identify and eliminate hazardous space debris. In-depth research focuses on devising AI-driven algorithms capable of detecting and tracking debris, coupled with developing innovative strategies for removal.',
  },
  {
    title: 'Automated Attendance',
    description:
      'Leveraging computer vision and machine learning, this project aims to revolutionize attendance tracking across varied settings. Participants will delve into image processing, data analytics, and algorithm development to streamline attendance processes efficiently.',
  },
  {
    title: 'Robotic Arm',
    description:
      'Harnessing computer vision and gesture control, this project focuses on innovating robotic arms capable of intricate and complex tasks. Participants will design, test, and refine gesture-controlled robotic arms, revolutionizing industries requiring precision and versatility.',
  },
  {
    title: 'LiFi Communication',
    description:
      'Exploring the fusion of LiFi technology with UAVs, this project aims to enhance communication and data transmission capabilities. Participants will experiment with networking protocols, hardware integration, and novel applications for this integrated system.',
  },
];

function Projects() {
  return (
    <div className="relative bg-black text-white font-sans min-h-screen py-8 px-6 md:px-16">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-40 backdrop-blur-lg -z-10"></div>

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-lg md:text-2xl font-bold tracking-wide animate-fade-in">
          Projects
        </h1>
        <h2 className="text-xl md:text-4xl mt-4 animate-slide-down">
          Take a look at our projects
        </h2>
      </div>

      {/* Project Chips */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {projectData.map((project, index) => (
          <Chip
            key={index}
            color="warning"
            variant="bordered"
            className="cursor-pointer border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            {project.title}
          </Chip>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
        {projectData.map((project, index) => {
          const [ref, inView] = useInView({
            threshold: 0.2, // Trigger animation when 20% of the card is visible
            triggerOnce: false, // Animate only once per card
          });

          return (
            <div
              key={index}
              ref={ref}
              className={`relative flex flex-col justify-center items-center transition-all duration-1000 w-full h-full aspect-square p-6 md:p-16 text-sm md:text-lg bg-gradient-to-br from-white/10 to-white/30 shadow-lg backdrop-blur-md rounded-2xl 
              ${inView ? 'animate-fade-in' : 'opacity-0 translate-y-8'}
              hover:scale-105 transition-transform duration-300`}
            >
              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
