import { Chip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchCollectionData } from './script'; // Import Firestore fetching function

function Projects() {
  const [projects, setProjects] = useState([]); // State to store project data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetchCollectionData('projects'); // Fetch 'projects' collection
        console.log('Fetched Projects Data:', data); // Log data to console
        setProjects(data); // Store fetched data
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="text-center text-white">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
        {projects.map((project, index) => (
          <Chip
            key={index}
            color="warning"
            variant="bordered"
            className="cursor-pointer border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            {project.Title} {/* Use Firestore Title field */}
          </Chip>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
        {projects.map((project, index) => {
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
                <h3 className="text-2xl font-bold mb-4">{project.Title}</h3>
                <p className="mb-4">{project.Description}</p>
                <p className="text-sm text-gray-400">
                  Status: {project.Status}
                </p>
                <p className="text-sm text-gray-400">
                  Members: {project['Members working'].join(', ')}
                </p>
                {project.Picture && (
                  <img
                    src={project.Picture}
                    alt={`${project.Title} illustration`}
                    className="mt-4 w-full rounded-md"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
