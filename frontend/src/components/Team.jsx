import { motion } from 'framer-motion'; // Import motion for animations
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchDataFromCollection } from './script'; // Import the fetchDataFromCollection function

async function fetchTeamData() {
  try {
    const data = await fetchDataFromCollection('team_details'); // Fetch 'team' collection
    return data;
  } catch (err) {
    console.error('Error fetching team:', err);
    throw new Error('Failed to load team.');
  }
}

function Team() {
  const [teamData, setTeamData] = useState({
    events: [],
    prAndContent: [],
    creatives: [],
    development: [],
    coordinators: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0); // For scroll progress bar

  useEffect(() => {
    fetchTeamData()
      .then((data) => {
        if (Array.isArray(data)) {
          // Map data to the corresponding team arrays
          const categorizedData = data.reduce((acc, member) => {
            const team = member.team_name.toLowerCase();
            switch (team) {
              case 'coordinators':
                acc.coordinators.push({
                  name: member.Name,
                  photo: member.Picture,
                  linkedin: member.Linkedin,
                  quote: member.Quote,
                });
                break;
              default:
                break;
            }
            return acc;
          }, { coordinators: [] });

          setTeamData(categorizedData);
        } else {
          throw new Error('Unexpected data format');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-black text-white font-sans min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
        style={{ scaleX: scrollProgress / 100 }} // Apply the smooth scroll progress here
      />

      {/* Heading */}
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-8xl font-bold">Meet the Team</h1>
        <p className="mt-4 text-lg">
          We believe in investing in people and forming meaningful bonds
        </p>
      </motion.div>

      {/* Render Each Section Dynamically */}
      {Object.entries(teamData).map(([section, members]) => (
        <TeamSection key={section} section={section} members={members} />
      ))}
    </div>
  );
}

const TeamSection = ({ section, members }) => {
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the section is visible
    triggerOnce: false, // Animate only once
  });

  // Capitalizing first letter for each section name
  const sectionName = section.replace(/([A-Z])/g, ' $1').toUpperCase();

  return (
    <motion.div
      ref={ref}
      className={`px-8 md:px-16 py-12 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Section Heading */}
      <motion.h2
        className="text-2xl font-semibold border-b border-white pb-2 mb-6 capitalize"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      >
        {sectionName}
      </motion.h2>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={index}
            className="card p-4 rounded-lg shadow-lg"
            style={{ background: 'rgb(128 128 128 / 0.2)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="flex flex-col items-center">
              {/* Image */}
              <img
                src={member.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXBfhC-QlgM4DmR6VXrznFyXdNwytV9-SOMw&s"}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4" // Adjusted size
              />

              {/* Name */}
              <motion.p
                className="text-lg font-bold mb-2"
                whileHover={{ color: '#4f46e5' }} // Change color on hover
              >
                {member.name}
              </motion.p>

              {/* Quote */}
              {member.quote && (
                <motion.p
                  className="text-sm italic text-gray-400 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 0 }}
                >
                  {`"${member.quote}"`}
                </motion.p>
              )}

              {/* LinkedIn */}
              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  whileHover={{ color: '#1a73e8' }} // Change color on hover
                >
                  LinkedIn Profile
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Team;
