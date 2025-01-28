import { Chip } from '@nextui-org/react';
import { motion, useScroll, useSpring } from 'framer-motion'; // Import Framer Motion
import React, { useEffect, useState } from 'react';
import { fetchDataFromCollection } from './script'; // Import the fetchDataFromCollection function

async function fetchProjectsData() {
  try {
    const data = await fetchDataFromCollection('projects'); // Fetch 'projects' collection
    return data;
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw new Error('Failed to load projects.');
  }
}

function Projects() {
  const [projects, setProjects] = useState([]); // State to store project data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  const { scrollYProgress } = useScroll(); // Track scroll progress
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 }); // Smooth scroll animation

  useEffect(() => {
    fetchProjectsData()
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data); // Ensure data is an array
        } else if (Array.isArray(data[0])) {
          setProjects(data[0]); // Handle case where data[0] is the array of projects
        } else {
          throw new Error('Unexpected data format');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <motion.div className="relative bg-black text-white font-sans min-h-screen py-8 px-6 md:px-16">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }} // Apply the smooth scroll progress here
      />

      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-40 backdrop-blur-lg -z-10"></div>

      {/* Page Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-lg md:text-2xl font-bold tracking-wide">Projects</h1>
        <h2 className="text-xl md:text-4xl mt-4">Take a look at our projects</h2>
      </motion.div>

      {/* Project Chips */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {Array.isArray(projects) &&
          projects.map((project, index) => (
            <Chip
              key={index}
              color="warning"
              variant="bordered"
              className="cursor-pointer border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              {project.Title} {/* Use Firestore Title field */}
            </Chip>
          ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
        {Array.isArray(projects) &&
          projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col justify-center items-center transition-all duration-1000 w-full h-full aspect-square p-6 md:p-16 text-sm md:text-lg bg-gradient-to-br from-white/10 to-white/30 shadow-lg backdrop-blur-md rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-4">{project.Title}</h3>
                <p className="mb-4 text-sm">{project.Description}</p>
                <p className="text-sm text-gray-400">Status: {project.Status}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}

export default Projects;
