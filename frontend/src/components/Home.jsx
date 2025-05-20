import { motion } from 'framer-motion';
import AboutBg from '../Assets/about-bg.png';
import EventsHomeBg from '../Assets/events-home-bg.png';
import ProjectHomeBg from '../Assets/project-home-bg.png';
import Hero from "../Assets/hero.mp4";
import { Link } from 'react-router-dom';

// Framer Motion variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Home() {
  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden">
      {/* Global Animated Background with Gradient and Particles */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0a0a 70%)' }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 70% 30%, #2a1a5e 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 30% 60%, #1e1b4b 0%, #0a0a0a 70%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {/* Particle overlay */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
            filter: 'blur(1px)',
          }}
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1], x: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Hero Section with Video Background */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full h-screen flex justify-center items-center z-[5]"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover filter brightness-75"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={Hero} type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/60 z-[1]"></div>
        </div>

        {/* Hero Content */}
        <motion.div className="text-center relative z-[2]">
          <motion.h1
            className="text-4xl md:text-8xl font-bold bg-clip-text text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
          >
            CyFuse
          </motion.h1>
          <motion.h2
            className="text-lg md:text-2xl mt-4 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p>Fusing tech to build tomorrow.</p>
            <p>Dare to Innovate, Unite to Create.</p>
          </motion.h2>
        </motion.div>
      </motion.section>


      {/* About Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row justify-center items-center w-full h-auto py-10 md:h-screen relative px-4 z-[5]"
      >
        <motion.div variants={cardVariants} className="flex flex-col justify-center items-start z-[5]">
          <h1 className="text-2xl md:text-3xl mx-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
            About Us
          </h1>
          <motion.span
            className="mx-2 my-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.span>
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/2 min-w-[160px] min-h-[320px] ml-0 md:ml-12 p-6 md:p-16 text-sm md:text-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:border-indigo-500/30 hover:-rotate-1 transition-all duration-300 z-[5]"
        >
          <p>
            An ultimate tech club where we're all about fusing diverse technologies and
            domains to create groundbreaking innovations!
          </p>
        </motion.div>
        <motion.img
          variants={cardVariants}
          src={AboutBg}
          className="absolute w-4/5 md:w-2/5 right-0 top-[-2vh] min-w-[320px] z-[4] opacity-70"
          alt="About Background"
        />
      </motion.section>

      {/* Projects Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row justify-center items-center w-full h-auto py-10 md:h-screen relative px-4 z-[5]"
      >
        <motion.div variants={cardVariants} className="flex flex-col justify-center items-start">
          <h1 className="text-2xl md:text-3xl mx-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
            Projects
          </h1>
          <motion.span
            className="mx-2 my-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
          </motion.span>
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/3 min-w-[280px] ml-0 md:ml-5 p-6 md:p-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:border-indigo-500/30 hover:-rotate-1 transition-all duration-300"
        >
          <img
            src={ProjectHomeBg}
            alt="Project Background"
            className="w-full h-auto object-cover rounded-xl border border-white/10"
          />
        </motion.div>
      </motion.section>

      {/* Events Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row justify-center items-center w-full h-auto py-10 md:h-screen relative px-4 z-[5]"
      >
        <motion.div variants={cardVariants} className="flex flex-col justify-center items-start">
          <h1 className="text-2xl md:text-3xl mx-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
            <Link>Events</Link>
          </h1>
          <motion.span
            className="mx-2 my-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link>View More</Link>
          </motion.span>
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/3 min-w-[280px] ml-0 md:ml-5 p-6 md:p-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:border-indigo-500/30 hover:-rotate-1 transition-all duration-300"
        >
          <img
            src={EventsHomeBg}
            alt="Events Background"
            className="w-full h-auto object-cover rounded-xl border border-white/10"
          />
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Home;