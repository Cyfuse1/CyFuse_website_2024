import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Rocket, Users, BookOpen, ChevronRight } from 'lucide-react';
import GradientButton from './gradient-button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const PurpleInfinityBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Infinite Moving Gradient */}
    <motion.div
      className="absolute inset-[-50%] opacity-30"
      animate={{
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.2, 1, 1.1, 1],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: 'radial-gradient(circle at 40% 40%, #581c87 0%, transparent 40%), radial-gradient(circle at 60% 60%, #7e22ce 0%, transparent 40%)',
        filter: 'blur(80px)',
      }}
    />

    {/* Grid Base */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168,85,247,0.1) 1.5px, transparent 0)`,
        backgroundSize: '40px 40px',
      }}
    />

    {/* Drifting Orbs */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 300 + i * 50,
          height: 300 + i * 50,
          background: i % 2 === 0 ? 'rgba(168,85,247,0.08)' : 'rgba(59,130,246,0.05)',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15 + i * 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
    {/* Vignette Overlay */}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(3,7,18,0.7) 100%)' }} />
  </div>
);

function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const activities = [
    { icon: <Cpu className="w-6 h-6" />, title: 'Workshops', desc: 'Dive into hands-on sessions covering the latest tech stacks.' },
    { icon: <Rocket className="w-6 h-6" />, title: 'Hackathons', desc: 'Build and innovate under pressure to solve real-world problems.' },
    { icon: <Users className="w-6 h-6" />, title: 'Networking', desc: 'Connect with mentors and like-minded tech enthusiasts.' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Open Source', desc: 'Contribute to meaningful projects and learn collaboration.' },
  ];

  const purpleAccent = '#a855f7';

  return (
    <div className="relative min-h-screen text-white py-16 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#030712' }}>
      <PurpleInfinityBackground />

      {/* Hero Section */}
      <header className="relative z-10 text-center my-24">
        <span
          className="mono-badge mb-6 inline-block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: purpleAccent,
            borderColor: 'rgba(168,85,247,0.3)',
            background: 'rgba(168,85,247,0.05)'
          }}
        >
          // INTEL_OVERVIEW
        </span>
        <motion.h1
          className="text-5xl md:text-8xl font-black mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            textShadow: `0 0 50px rgba(168,85,247,0.3)`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span style={{ color: purpleAccent }}>Us</span>
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto text-base md:text-xl text-slate-400"
          style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We are <span style={{ color: '#fff' }}>CyFuse</span> — where interdisciplinary magic happens.
          We bridge the gap between imagination and execution.
        </motion.p>
      </header>

      {/* Mission & Vision */}
      <motion.section
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-32"
      >
        {[
          { title: 'MISSION', content: 'Our mission is to foster a community representing different backgrounds and academic programs to collaborate on diverse technological projects.' },
          { title: 'VISION', content: 'We aim to become a nexus of innovation where students from all disciplines come together to build products that solve real problems.' },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="hud-corners p-8 md:p-12 relative overflow-hidden group"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid rgba(168,85,247,0.15)`,
            }}
            whileHover={{ borderColor: 'rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.03)' }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl select-none group-hover:opacity-20 transition-opacity">
              0{i + 1}
            </div>
            <h2
              className="text-sm font-bold mb-6 tracking-widest text-slate-500"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              [ {item.title} ]
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-slate-300">
              {item.content}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* Activities Grid */}
      <section className="relative z-10 max-w-6xl mx-auto mb-32">
        <header className="mb-16">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What We Do</h2>
          <div className="h-1 w-20 rounded-full" style={{ background: `linear-gradient(to right, ${purpleAccent}, transparent)` }} />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              className="hud-corners p-6 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(168,85,247,0.3)',
                boxShadow: `0 10px 30px -10px rgba(168,85,247,0.2)`
              }}
            >
              <div className="mb-4 text-purple-400">{activity.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{activity.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{activity.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="relative z-10 text-center py-20 rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, rgba(168,85,247,0.05), transparent)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Ready to <span style={{ color: purpleAccent }}>Build</span>?
        </h2>
        <div
          onClick={() => window.location.hash = '#/team'}
          className="inline-block"
        >
          <GradientButton
            icon={<ChevronRight className="ml-2 w-4 h-4" />}
          >
            JOIN_OUR_MISSION
          </GradientButton>
        </div>
      </motion.section>
    </div>
  );
}

export default About;