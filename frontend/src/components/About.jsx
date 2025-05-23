import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

function About() {
  const [heroRef, heroInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [missionRef, missionInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [visionRef, visionInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [activitiesRef, activitiesInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div className="relative text-white font-sans overflow-hidden min-h-screen">
      {/* Animated Background with Gradient and Particles */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0a0a 70%)' }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 70% 30%, #2a1a5e 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 30% 60%, #1e1b4b 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 70% 70%, #2a1a5e 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 30% 30%, #1e1b4b 0%, #0a0a0a 70%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
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

      {/* Hero Section */}
        <motion.section
          ref={heroRef}
          variants={sectionVariants}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          className="flex flex-col justify-center items-center w-full relative z-[5] px-4 py-20"
        >
          <motion.div variants={cardVariants} className="text-center max-w-4xl mt-10">
            <h1
          className="text-5xl md:text-7xl font-bold mb-6 mt-16 bg-gradient-to-r from-white to-indigo-300 text-transparent bg-clip-text"
            >
          About CyFuse
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Welcome to CyFuse! We are the official technology club of IIIT Delhi, dedicated to driving innovation and technical excellence through collaboration and creativity.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-4">
          CyFuse is a student-led initiative that brings together individuals from diverse academic backgrounds to explore emerging technologies and solve real-world problems through hands-on projects and research.
            </p>
            <p className="text-lg md:text-xl text-gray-300">
          As a member of CyFuse, you'll have the opportunity to refine your technical skills, expand your network, and contribute to impactful solutions in a professional yet inclusive environment.
            </p>
          </motion.div>
        </motion.section>

        {/* Mission Section */}
      <motion.section
        ref={missionRef}
        variants={sectionVariants}
        initial="hidden"
        animate={missionInView ? 'visible' : 'hidden'}
        className="flex flex-col justify-center items-center w-full py-20 relative px-4 z-[5]"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl md:text-4xl font-semibold text-white mb-8"
        >
          Our Mission
        </motion.h2>
        <motion.div
          variants={cardVariants}
          className="max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <p className="text-lg md:text-xl text-gray-300">
            To foster a culture of innovation and continuous learning by integrating technology and creativity, enabling students to develop practical skills and contribute to impactful solutions.
          </p>
        </motion.div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        ref={visionRef}
        variants={sectionVariants}
        initial="hidden"
        animate={visionInView ? 'visible' : 'hidden'}
        className="flex flex-col justify-center items-center w-full py-20 relative px-4 z-[5]"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl md:text-4xl font-semibold text-white mb-8"
        >
          Our Vision
        </motion.h2>
        <motion.div
          variants={cardVariants}
          className="max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <p className="text-lg md:text-xl text-gray-300">
            We envision a future where technology and innovation are accessible to all. CyFuse strives to be a leading tech community that inspires, educates, and fosters the next generation of tech leaders and creators.
          </p>
        </motion.div>
      </motion.section>

      {/* Activities Section */}
      <motion.section
        ref={activitiesRef}
        variants={sectionVariants}
        initial="hidden"
        animate={activitiesInView ? 'visible' : 'hidden'}
        className="flex flex-col justify-center items-center w-full py-20 relative px-4 z-[5]"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl md:text-4xl font-semibold text-white mb-12"
        >
          Our Activities
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              title: 'Technical Projects',
              description: 'Development of advanced projects in AI, cybersecurity, blockchain, and more.',
            },
            {
              title: 'Workshops',
              description: 'Hands-on sessions to equip students with in-demand technical skills.',
            },
            {
              title: 'Hackathons',
              description: 'Participation in and hosting of coding contests and innovation challenges.',
            },
            {
              title: 'Peer Learning',
              description: 'Mutual learning and growth through mentorship and collaboration.',
            },
            {
              title: 'Social Impact',
              description: 'Developing solutions that contribute to societal welfare.',
            },
          ].map((activity, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-2">{activity.title}</h3>
              <p className="text-gray-300">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        ref={ctaRef}
        variants={sectionVariants}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        className="flex flex-col justify-center items-center w-full py-20 relative px-4 z-[5]"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl md:text-4xl font-semibold text-white mb-8"
        >
          Join the CyFuse Community
        </motion.h2>
        <motion.div
          variants={cardVariants}
          className="text-center max-w-2xl"
        >
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Ready to innovate with us? Join our community to collaborate on exciting projects, attend tech events, and meet like-minded creators.
          </p>
          <p className="text-md md:text-md text-gray-300 mb-8">
            As a student-led initiative, CyFuse offers a professional yet inclusive environment where members can refine their technical expertise, expand their network, and gain exposure to real-world applications of their knowledge. The club stands as a testament to IIIT-Delhi’s commitment to academic and technological excellence.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="#"
              className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
            >
              Join Us
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default About;