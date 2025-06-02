import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import AnnouncementSlider from "./announcement-slider";
import GradientButton from "./gradient-button";
import { ArrowRight, Code, Calendar } from "lucide-react";
import HeroVideo from "../Assets/hero.mp4";
import { fetchDataFromCollection } from "./script";
import About from "../Assets/about-bg.png";
import Project from "../Assets/project-home-bg.png";
import Event from "../Assets/events-home-bg.png";


// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};



export default function Home() {
  const horizontalRef = useRef(null);
  const containerRef = useRef(null);
  const [Announcements, setAnnouncements] = useState([
    {
      id: 0,
      title: "No New Announcements for now",
      date: "To be Announced Eventually",
      content: "We will be right back with some exciting updates soon! Stay tuned for more information.",
      image: "https://blocks.astratic.com/img/general-img-portrait.png",
      link: "/",
    },
  ]);
  const fetchAnnouncements = async () => {
    try {
      const data = await fetchDataFromCollection("Announcements");
      if(data.length === 0) {
        console.warn("No announcements found, using fallback data.");
        return;
      }
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  }
 useEffect(() => {
  if (!horizontalRef.current || !containerRef.current) return;

  const updateScroll = () => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const scrollWidth = horizontal.scrollWidth;
    const viewportWidth = window.innerWidth;

    // Set your desired margin (in px) from the LEFT edge
    const marginLeft = viewportWidth * 0.02; // e.g., 2% of viewport width

    // Calculate max scroll so last card stops at marginLeft from left
    const maxScroll = Math.max(0, scrollWidth - viewportWidth - marginLeft);

    // Kill previous triggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (scrollWidth > viewportWidth + marginLeft) {
      gsap.to(horizontal, {
        x: -maxScroll,
        ease: "power1.out", // Smoother ease
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${maxScroll}`,
          scrub: 0.2, // Lower value = faster response
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    } else {
      gsap.set(horizontal, { x: 0 });
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }
  };

  updateScroll();
  window.addEventListener("resize", updateScroll);

  return () => {
    window.removeEventListener("resize", updateScroll);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);


  useEffect(() => {
    const fall_back_announcements = [
    {
      id: 0,
      title: "No New Announcements for now",
      date: "To be Announced Eventually",
      content: "We will be right back with some exciting updates soon! Stay tuned for more information.",
      image: "https://blocks.astratic.com/img/general-img-portrait.png",
      link: "/",
    },
  ];
    fetchAnnouncements();
    if (Announcements.length === 0) {
      setAnnouncements(fall_back_announcements);
    }
    if(!Announcements) {
      setAnnouncements(fall_back_announcements);
    }
  }, [Announcements]);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden">
      {/* Global Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0a0a 70%)" }}
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0a0a 70%)",
            "radial-gradient(circle at 70% 30%, #2a1a5e 0%, #0a0a0a 70%)",
            "radial-gradient(circle at 30% 60%, #1e1b4b 0%, #0a0a0a 70%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
            filter: "blur(1px)",
          }}
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1], x: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full h-[70vh] flex justify-center items-center z-[5]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover filter brightness-75"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={HeroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/60 z-[1]" />
        </div>
        <motion.div className="text-center relative z-[2]">
          <h1
            className="text-4xl md:text-8xl font-bold bg-clip-text text-white">
            CyFuse
          </h1>
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

      {/* Announcements Section */}
      <section id="announcements" className="relative w-full py-16 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400 mb-4">
              Latest Announcements
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded" />
          </motion.div>
          <AnnouncementSlider announcements={Announcements} />
        </div>
      </section>

      {/* About Us Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row justify-center items-center w-full h-auto py-10 md:h-screen relative px-4 z-[5]"
      >
        <motion.div variants={cardVariants} className="flex flex-col justify-center items-start z-[5]">
          <h1 className="text-3xl md:text-4xl mx-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
            About Us
          </h1>
          <Link to="/aboutus" className="mt-4">
            <motion.span
              className="mx-3 my-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.span>
          </Link>
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/2 min-w-[160px] min-h-[320px] ml-0 md:ml-12 p-6 md:p-16 text-sm md:text-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:border-indigo-500/30 hover:-rotate-1 transition-all duration-300 z-[5]"
        >
          <p>
            An ultimate tech club where we're all about fusing diverse technologies and domains to create groundbreaking
            innovations!
          </p>
        </motion.div>
        <motion.img
          variants={cardVariants}
          src={About}
          className="absolute w-4/5 md:w-2/5 right-0 top-[-2vh] min-w-[320px] z-[4] opacity-70"
          alt="About Background"
        />
      </motion.section>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-[100vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div ref={horizontalRef} className="flex w-[200vw] h-full">
            {/* Projects Section */}
            <section className="w-screen h-screen flex flex-col justify-center px-4 md:px-16">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8 flex items-center"
                >
                  <Code className="w-8 h-8 mr-3 text-indigo-400" />
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
                    Projects
                  </h2>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:w-1/2"
                  >
                    <div className="relative overflow-hidden rounded-xl border-2 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      <img src={Project} alt="Featured Project" className="w-full h-[70vh]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <span className="px-3 py-1 bg-indigo-600/80 text-white text-sm rounded-full w-fit mb-3">
                          Featured
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">AI-Powered Analytics</h3>
                        <p className="text-gray-300 mb-4 max-w-lg">
                          Our flagship project combines machine learning with real-time data processing to deliver
                          actionable insights.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="md:w-1/2 flex flex-col justify-center"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Explore Our Tech Projects</h3>
                    <p className="text-gray-300 mb-6">
                      Discover innovative solutions created by our team. From AI and machine learning to web development
                      and IoT, our projects showcase cutting-edge technology and creative problem-solving.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">AI</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Machine Learning</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Web3</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">IoT</span>
                    </div>
                    <GradientButton href="/projects" icon={<ArrowRight className="ml-2 h-5 w-5" />}>
                      View All Projects
                    </GradientButton>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Events Section */}
            <section className="w-screen h-screen flex flex-col justify-center px-4 md:px-16">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8 flex items-center"
                >
                  <Calendar className="w-8 h-8 mr-3 text-indigo-400" />
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
                    Events
                  </h2>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:w-1/2"
                  >
                    <div className="relative overflow-hidden rounded-xl border-2 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      <img src={Event} alt="Featured Event" className="w-full h-[70vh]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-indigo-600/80 text-white text-sm rounded-full">Upcoming</span>
                          <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">June 15, 2025</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Annual Hackathon</h3>
                        <p className="text-gray-300 mb-4 max-w-lg">
                          Join us for 48 hours of coding, collaboration, and innovation. Prizes worth $10,000 to be won!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="md:w-1/2 flex flex-col justify-center"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Tech Events</h3>
                    <p className="text-gray-300 mb-6">
                      Participate in workshops, hackathons, and tech talks organized by CyFuse. Connect with fellow tech
                      enthusiasts, learn new skills, and showcase your talents.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Workshops</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Tech Talks</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Networking</span>
                    </div>
                    <GradientButton href="/events" icon={<ArrowRight className="ml-2 h-5 w-5" />}>
                      View All Events
                    </GradientButton>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}