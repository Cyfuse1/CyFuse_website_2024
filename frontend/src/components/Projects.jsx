import { useEffect, useState } from 'react';
import { fetchDataFromCollection } from './script';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
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

const statusColor = (status) => {
  if (!status) return { color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.2)' };
  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('ongoing')) return { color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.25)' };
  if (s.includes('complete') || s.includes('done')) return { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' };
  if (s.includes('hold') || s.includes('paused')) return { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' };
  return { color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.25)' };
};

const EmeraldInfinityBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Infinite Moving Gradient */}
    <motion.div
      className="absolute inset-[-50%] opacity-20"
      animate={{
        x: ['-10%', '10%', '-10%'],
        y: ['-5%', '5%', '-5%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: 'radial-gradient(ellipse at center, #064e3b 0%, transparent 70%)',
        filter: 'blur(100px)',
      }}
    />

    {/* Grid Base */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(16,185,129,0.1) 1.5px, transparent 0),
          linear-gradient(to right, rgba(16,185,129,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16,185,129,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px, 96px 96px, 96px 96px',
      }}
    />
    {/* Dynamic Data Pulses */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.15), rgba(16,185,129,0.4), rgba(16,185,129,0.15), transparent)',
          top: `${20 * (i + 1)}%`,
        }}
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 3 + i,
          repeat: Infinity,
          ease: "linear",
          delay: i * 0.5
        }}
      />
    ))}
    {/* Vignette */}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(3,7,18,0.4) 100%)' }} />
  </div>
);

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    fetchProjectsData()
      .then(data => {
        if (Array.isArray(data)) setProjects(data);
        else if (Array.isArray(data[0])) setProjects(data[0]);
        else throw new Error('Unexpected data format');
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = activeFilter ? projects.filter(p => p.Title === activeFilter) : projects;

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ background: '#030712' }}>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-8 rounded"
            style={{ background: '#10b981' }}
            animate={{ scaleY: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", color: '#10b981', fontSize: '0.8rem' }}>
        SCANNING_PROJECT_DATS...
      </p>
    </div>
  );
  if (error) return <p className="text-center mt-20" style={{ color: '#f43f5e' }}>{error}</p>;

  return (
    <div className="relative min-h-screen text-white py-16 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#030712' }}>
      <EmeraldInfinityBackground />

      {/* Header */}
      <header className="relative z-10 text-center my-24">
        <span
          className="mono-badge mb-6 inline-block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#10b981',
            borderColor: 'rgba(16,185,129,0.3)',
            backgroundColor: 'rgba(16,185,129,0.05)'
          }}
        >
          CYFUSE · PROJECTS_DB
        </span>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#fff',
            textShadow: '0 0 40px rgba(16,185,129,0.3)',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ color: '#059669' }}>Pro</span>jects
        </motion.h1>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          &gt; {projects.length} repository entries found
        </motion.p>
      </header>

      {/* Filter chips */}
      <div className="relative z-10 flex flex-wrap gap-3 justify-center mb-12">
        <button
          onClick={() => setActiveFilter(null)}
          className="px-4 py-1.5 rounded text-xs font-medium transition-all duration-200"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: activeFilter === null ? '#10b981' : '#64748b',
            background: activeFilter === null ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeFilter === null ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          ALL_REPOS
        </button>
        {projects.map((project, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setActiveFilter(project.Title === activeFilter ? null : project.Title)}
            className="px-4 py-1.5 rounded text-xs font-medium transition-all duration-200"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: activeFilter === project.Title ? '#10b981' : '#64748b',
              background: activeFilter === project.Title ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeFilter === project.Title ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            {project.Title}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto max-w-5xl">
        {filtered.map((project, index) => {
          const sc = statusColor(project.Status);
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="hud-corners flex flex-col rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: '#0d1117',
                border: '1px solid rgba(16,185,129,0.12)',
              }}
              whileHover={{
                borderColor: 'rgba(16,185,129,0.4)',
                boxShadow: '0 0 25px rgba(16,185,129,0.1)',
              }}
            >
              {project.Picture && (
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.Picture}
                    alt={`${project.Title} illustration`}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ filter: 'brightness(0.85) saturate(0.6) contrast(1.1)' }}
                  />
                  {/* Scanline on image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #0d1117 0%, transparent 50%)' }}
                  />
                </div>
              )}

              <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3
                    className="text-xl font-bold leading-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#e2e8f0' }}
                  >
                    {project.Title}
                  </h3>
                  {project.Status && (
                    <span
                      className="shrink-0 text-[10px] px-2 py-0.5 rounded uppercase"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: sc.color,
                        background: sc.bg,
                        border: `1px solid ${sc.border}`,
                      }}
                    >
                      {project.Status}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#64748b', fontFamily: "'Inter', sans-serif" }}
                >
                  {project.Description}
                </p>

                {/* Tech Bar */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span style={{ color: '#059669', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
                    0x{index.toString(16).toUpperCase().padStart(2, '0')}
                  </span>
                  <div className="h-1 w-16 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ background: '#059669' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;