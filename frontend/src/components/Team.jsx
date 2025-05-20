import React, { useEffect, useState } from 'react';
import { fetchDataFromCollection } from './script';
import { motion } from 'framer-motion';

async function fetchTeamData() {
  try {
    const data = await fetchDataFromCollection('team_details');
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

  useEffect(() => {
    fetchTeamData()
      .then((data) => {
        if (Array.isArray(data)) {
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
              // Uncomment to include other teams as needed
              // case 'development':
              //   acc.development.push({ ... });
              //   break;
              default:
                break;
            }
            return acc;
          }, {
            coordinators: [],
            // development: [],
            // creatives: [],
            // prAndContent: [],
            // events: [],
          });
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
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="relative min-h-screen text-white font-sans py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1e3c72 0%, #0a0a0a 70%)' }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #1e3c72 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 70% 30%, #2a5298 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 30% 60%, #1e3c72 0%, #0a0a0a 70%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {/* Particle Overlay */}
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
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Meet the Team
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          We believe in investing in people and forming meaningful bonds
        </motion.p>
      </header>

      {/* Team Sections */}
      <div className="relative z-10">
        {Object.entries(teamData).map(([section, members]) => (
          <TeamSection key={section} section={section} members={members} />
        ))}
      </div>
    </div>
  );
}

const TeamSection = ({ section, members }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const sectionName = section.replace(/([A-Z])/g, ' $1').toUpperCase();

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-20"
    >
      <h2 className="text-4xl font-bold mb-10 relative text-center group">
        {sectionName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="flex flex-col items-center justify-center text-center p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
          >
            <img
              src={member.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXBfhC-QlgM4DmR6VXrznFyXdNwytV9-SOMw&s"}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border border-white/10"
            />
            <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
              {member.name}
            </p>
            {member.quote && (
              <p className="text-sm italic text-gray-400 mt-2">{`"${member.quote}"`}</p>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 mt-2 hover:underline"
              >
                LinkedIn Profile
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Team;