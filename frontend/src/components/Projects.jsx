import { Chip } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { fetchDataFromCollection } from './script';
import { motion } from 'framer-motion';

// Framer Motion variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

async function fetchProjectsData() {
  try {
    const data = await fetchDataFromCollection('projects');
    return data;
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw new Error('Failed to load projects.');
  }
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectsData()
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (Array.isArray(data[0])) {
          setProjects(data[0]);
        } else {
          throw new Error('Unexpected data format');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <motion.p className="text-white text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        Loading projects...
      </motion.p>
    </div>
  );
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="relative min-h-screen text-white font-sans py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Animated Background with Gradient and Particles */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1a3c34 0%, #0a0a0a 70%)' }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #1a3c34 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 70% 30%, #2a5e52 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 30% 60%, #1a3c34 0%, #0a0a0a 70%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {/* Particle-like overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Header */}
      <header className="relative z-10 text-center my-24">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Take a look at our projects
        </motion.p>
      </header>

      {/* Project Chips */}
      <div className="relative z-10 flex flex-wrap gap-4 justify-center mb-12">
        {Array.isArray(projects) && projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Chip
              color="default"
              variant="bordered"
              className="cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 text-white hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300 hover:scale-110"
            >
              {project.Title}
            </Chip>
          </motion.div>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
        {Array.isArray(projects) && projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-green-500/30 transition-all duration-300"
          >
            <div className="flex-1 text-center">
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-400">
                {project.Title}
              </h3>
              <p className="text-gray-300 mb-3 text-base leading-relaxed">
                <strong className="text-white">Description:</strong> {project.Description}
              </p>
              <p className="text-gray-300 mb-3 text-base">
                <strong className="text-white">Status:</strong> {project.Status}
              </p>
              {/* Uncomment if Members field is needed */}
              {/* <p className="text-gray-300 mb-3 text-base">
                <strong className="text-white">Members:</strong> {project['Members working']?.join(', ') || 'N/A'}
              </p> */}
              {project.Picture && (
                <img
                  src={project.Picture}
                  alt={`${project.Title} illustration`}
                  className="mt-4 w-full rounded-xl object-cover border border-white/10"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;