import { motion, useScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { Suspense, useEffect, useState, useRef } from 'react';
import { ProfileCard } from './ProfileCard';
import { fetchDataFromCollection } from './script';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const indigoAccent = '#4f46e5';

const TeamSkeleton = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#030712' }}>
    <div className="flex gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-8 rounded"
          style={{ background: indigoAccent }}
          animate={{ scaleY: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
    <p style={{ fontFamily: "'JetBrains Mono', monospace", color: indigoAccent, fontSize: '0.8rem' }}>
      SYNCING_TEAM_INTEL...
    </p>
  </div>
);

const IndigoInfinityBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Infinite Moving Gradient */}
      <motion.div
        className="absolute inset-[-50%] opacity-20"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: 'radial-gradient(circle at center, #1e1b4b 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Background Grid */}
      <motion.div
        className="absolute inset-x-0 inset-y-[-20%] opacity-20"
        style={{
          y: y1,
          backgroundImage: `linear-gradient(to right, rgba(79,70,229,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,70,229,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Floating Tech Lines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: y2 }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-indigo-500/20"
            style={{
              height: '1px',
              width: `${20 + i * 10}%`,
              top: `${15 * i}%`,
              left: i % 2 === 0 ? '-10%' : '50%',
              boxShadow: `0 0 15px rgba(79,70,229,0.3)`
            }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 10%, transparent 20%, #030712 90%)' }} />
    </div>
  );
};

async function fetchTeamData() {
  try {
    const data = await fetchDataFromCollection('team_details');
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
      viewport={{ once: true, amount: 0.1 }}
      className="mb-24"
    >
      {/* Section header with bracket decoration */}
      <div className="flex items-center justify-center gap-6 mb-12">
        <div className="h-px flex-1 max-w-[120px]" style={{ background: `linear-gradient(to left, ${indigoAccent}44, transparent)` }} />
        <span className="text-xl" style={{ fontFamily: "'JetBrains Mono', monospace", color: indigoAccent }}>{'<'}</span>
        <h2
          className="text-3xl md:text-5xl font-black text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {sectionName}
        </h2>
        <span className="text-xl" style={{ fontFamily: "'JetBrains Mono', monospace", color: indigoAccent }}>{'/>'}</span>
        <div className="h-px flex-1 max-w-[120px]" style={{ background: `linear-gradient(to right, ${indigoAccent}44, transparent)` }} />
      </div>

      <div className="flex flex-wrap -mx-3 items-center justify-center">
        {members.map((member, idx) => {
          const profile = {
            name: member.name,
            imageUrl: member.photo || 'https://via.placeholder.com/150',
            description: member.quote,
            themeColor: indigoAccent,
            ...member,
          };
          return (
            <div key={idx} className="px-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pb-8 flex justify-center">
              <motion.div variants={cardVariants} className="w-full flex justify-center">
                <ProfileCard profile={profile} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

function Team() {
  const [teamData, setTeamData] = useState({
    coordinators: [], events: [], pr: [], content: [], creatives: [], development: [], design: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData()
      .then(data => {
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
          }, { coordinators: [], events: [], pr: [], content: [], creatives: [], development: [], design: [] });
          setTeamData(categorized);
        } else {
          throw new Error('Unexpected data format');
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const sectionsOrder = ['coordinators', 'events', 'pr', 'content', 'creatives', 'development', 'design'];

  if (loading) return <TeamSkeleton />;
  if (error) return <div className="text-center mt-20" style={{ color: '#f43f5e' }}>{error}</div>;

  return (
    <div className="relative min-h-screen text-white py-16 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#030712' }}>
      <IndigoInfinityBackground />

      {/* Header */}
      <header className="relative z-10 text-center mb-24 mt-20">
        <span
          className="mono-badge mb-6 inline-block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: indigoAccent,
            borderColor: `${indigoAccent}55`,
            background: `${indigoAccent}11`
          }}
        >
          // ACCESS_LEVEL_AUTHORISED
        </span>
        <motion.h1
          className="text-6xl md:text-9xl font-black mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#fff',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          The <span style={{ color: indigoAccent }}>Core</span>
        </motion.h1>
        <motion.p
          className="mt-6 text-base md:text-xl text-slate-500"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          &gt; High performance individuals building the future
        </motion.p>
      </header>

      {/* Team Sections */}
      <div className="relative z-10">
        <Suspense fallback={<TeamSkeleton />}>
          {sectionsOrder.map(sec =>
            teamData[sec]?.length > 0 ? (
              <TeamSection key={sec} section={sec} members={teamData[sec]} />
            ) : null
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Team;
