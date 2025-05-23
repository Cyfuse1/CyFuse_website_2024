import { useEffect, useState, Suspense } from 'react';
import { fetchDataFromCollection } from './script';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Framer Motion variants for card animations
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// Skeleton Loader Component for Team
const TeamSkeleton = () => (
  <motion.section
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
    className="mb-20"
  >
    <div className="h-10 w-1/3 mx-auto bg-white/10 rounded animate-pulse mb-10" />
    <div className="flex flex-wrap -mx-2">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg animate-pulse h-96"
          >
            <div className="w-32 h-32 rounded-full bg-white/10 mb-4" />
            <div className="h-6 w-1/2 bg-white/10 rounded mb-2" />
            <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
            <div className="h-4 w-1/3 bg-white/10 rounded mb-2" />
            <div className="h-4 w-1/3 bg-white/10 rounded" />
          </motion.div>
        </div>
      ))}
    </div>
  </motion.section>
);

async function fetchTeamData() {
  try {
    const data = await fetchDataFromCollection('team_details');
    console.log('Fetched team data:', data);
    return data;
  } catch (err) {
    console.error('Error fetching team:', err);
    throw new Error('Failed to load team.');
  }
}

const TeamSection = ({ section, members }) => {
  const sectionName = section.replace(/([A-Z])/g, ' $1').toUpperCase();

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-20"
    >
      <h2 className="text-4xl font-bold mb-10 text-center">{sectionName}</h2>
      <div className="flex flex-wrap -mx-2 items-center justify-center">
        {members.map((member, idx) => (
          <div key={idx} className="px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pb-4">
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 h-96"
            >
              <img
                src={member.photo || 'https://via.placeholder.com/150'}
                alt={member.name}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                className="w-32 h-32 rounded-full object-cover mb-4 border border-white/10"
              />
              <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
                {member.name}
              </p>
              {member.quote && <p className="text-sm italic text-gray-400 mt-2">"{member.quote}"</p>}
              <div className="flex gap-3 mt-4">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    LinkedIn
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">
                    Instagram
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

TeamSection.propTypes = {
  section: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string,
      linkedin: PropTypes.string,
      instagram: PropTypes.string,
      quote: PropTypes.string,
    })
  ).isRequired,
};

function Team() {
  const [teamData, setTeamData] = useState({
    coordinators: [],
    events: [],
    pr: [],
    content: [],
    creatives: [],
    development: [],
    design: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData()
      .then((data) => {
        if (Array.isArray(data)) {
          const categorized = data.reduce((acc, m) => {
            const teamKey = m.team_name?.toLowerCase();
            const member = {
              name: m.Name,
              photo: m.Picture,
              linkedin: m.Linkedin,
              instagram: m.Instagram,
              quote: m.Quote,
            };
            if (acc[teamKey]) acc[teamKey].push(member);
            return acc;
          }, {
            coordinators: [], events: [], pr: [], content: [], creatives: [], development: [], design: []
          });
          setTeamData(categorized);
        } else {
          throw new Error('Unexpected data format');
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const sectionsOrder = ['coordinators', 'events', 'pr', 'content', 'creatives', 'development', 'design'];

  if (loading) return <TeamSkeleton />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="relative min-h-screen text-white font-sans py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background Animation */}
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

      {/* Content */}
      <header className="relative z-10 text-center mb-16 mt-16">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 pt-10"
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

      <div className="relative z-10">
        <Suspense fallback={<TeamSkeleton />}>
          {sectionsOrder.map((sec) =>
            teamData[sec]?.length > 0 ? <TeamSection key={sec} section={sec} members={teamData[sec]} /> : null
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Team;
