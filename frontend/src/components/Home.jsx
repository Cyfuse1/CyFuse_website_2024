import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import AnnouncementSlider from "./announcement-slider";
import GradientButton from "./gradient-button";
import { ArrowRight, Code, Calendar, Zap } from "lucide-react";
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
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

// Tech Stack Tag component
const TechTag = ({ children }) => (
  <span
    className="px-3 py-1 rounded text-xs border"
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      color: "#06b6d4",
      backgroundColor: "rgba(6,182,212,0.08)",
      borderColor: "rgba(6,182,212,0.25)",
    }}
  >
    {children}
  </span>
);

export default function Home() {
  const horizontalRef = useRef(null);
  const containerRef = useRef(null);
  const [Announcements, setAnnouncements] = useState([
    {
      id: 0,
      title: "No New Announcements for now",
      date: "To be Announced Eventually",
      content:
        "We will be right back with some exciting updates soon! Stay tuned for more information.",
      image: "https://blocks.astratic.com/img/general-img-portrait.png",
      link: "/",
    },
  ]);

  const fetchAnnouncements = async () => {
    try {
      const data = await fetchDataFromCollection("Announcements");
      if (data.length === 0) {
        console.warn("No announcements found, using fallback data.");
        return;
      }
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    if (!horizontalRef.current || !containerRef.current) return;

    const updateScroll = () => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;
      const scrollWidth = horizontal.scrollWidth;
      const viewportWidth = window.innerWidth;
      const marginLeft = viewportWidth * 0.02;
      const maxScroll = Math.max(0, scrollWidth - viewportWidth - marginLeft);

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      if (scrollWidth > viewportWidth + marginLeft) {
        gsap.to(horizontal, {
          x: -maxScroll,
          ease: "power1.out",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${maxScroll}`,
            scrub: 0.2,
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
    const fallback = [
      {
        id: 0,
        title: "No New Announcements for now",
        date: "To be Announced Eventually",
        content:
          "We will be right back with some exciting updates soon! Stay tuned for more information.",
        image: "https://blocks.astratic.com/img/general-img-portrait.png",
        link: "/",
      },
    ];
    fetchAnnouncements();
    if (Announcements.length === 0) setAnnouncements(fallback);
    if (!Announcements) setAnnouncements(fallback);
  }, [Announcements]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden" style={{ background: "#030712" }}>
      {/* Global Tech Grid Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(6,182,212,0.07) 1px, transparent 0),
            linear-gradient(to right, rgba(6,182,212,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6,182,212,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 96px 96px, 96px 96px",
        }}
      />
      {/* Radial glow focus */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 10%, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ——————————————————
          HERO SECTION
      —————————————————— */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full h-[75vh] flex justify-center items-center z-[5]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.5) saturate(0.9)" }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={HeroVideo} type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712] z-[1]" />
          {/* Scan-line effect */}
          <div className="scanline-overlay z-[2]" />
        </div>

        <motion.div className="text-center relative z-[5] px-4">
          {/* HUD status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex justify-center mb-4"
          >
            <span
              className="mono-badge flex items-center gap-1.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SYS_ONLINE · IIIT DELHI
            </span>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl font-black mb-4 tracking-tighter"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#fff',
              textShadow: '0 0 40px rgba(255,255,255,0.15)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            CyFuse
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-4 space-y-1"
          >
            <p
              className="text-base md:text-xl text-slate-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-cyan-500">&gt; </span>Fusing tech to build tomorrow.
            </p>
            <p
              className="text-base md:text-xl text-slate-400"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-cyan-500">&gt; </span>Dare to Innovate, Unite to Create.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ——————————————————
          ANNOUNCEMENTS SECTION
      —————————————————— */}
      <section id="announcements" className="relative w-full py-16 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-cyan-500 text-xl select-none"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                //
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Latest{" "}
                <span
                  style={{
                    color: "#06b6d4",
                    textShadow: "0 0 20px rgba(6,182,212,0.4)",
                  }}
                >
                  Announcements
                </span>
              </h2>
            </div>
            <div
              className="h-px w-24"
              style={{
                background: "linear-gradient(to right, #06b6d4, transparent)",
              }}
            />
          </motion.div>
          <AnnouncementSlider announcements={Announcements} />
        </div>
      </section>

      {/* ——————————————————
          ABOUT SECTION
      —————————————————— */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row justify-center items-center w-full h-auto py-16 md:h-screen relative px-4 z-[5]"
      >
        <motion.div variants={cardVariants} className="flex flex-col justify-center items-start z-[5]">
          <p
            className="text-xs mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#06b6d4" }}
          >
            SECTION_01
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            About <span style={{ color: "#06b6d4" }}>Us</span>
          </h1>
          <Link to="/aboutus" className="mt-2">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#06b6d4",
                borderColor: "rgba(6,182,212,0.3)",
                background: "rgba(6,182,212,0.05)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 18px rgba(6,182,212,0.3)",
                borderColor: "rgba(6,182,212,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Zap className="w-4 h-4" />
              Learn More
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="hud-corners flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/2 min-w-[200px] min-h-[200px] ml-0 md:ml-12 mt-8 md:mt-0 p-6 md:p-10 text-sm md:text-base rounded-xl z-[5] transition-all duration-300"
          style={{
            background: "#0d1117",
            border: "1px solid rgba(6,182,212,0.15)",
            fontFamily: "'Inter', sans-serif",
            color: "#94a3b8",
            lineHeight: "1.8",
          }}
          whileHover={{
            borderColor: "rgba(6,182,212,0.4)",
            boxShadow: "0 0 25px rgba(6,182,212,0.12)",
          }}
        >
          <p>
            An ultimate tech club where we&apos;re all about fusing diverse technologies and
            domains to create groundbreaking innovations!
          </p>
        </motion.div>

        <motion.img
          variants={cardVariants}
          src={About}
          className="absolute w-4/5 md:w-2/5 right-0 top-[-2vh] min-w-[320px] z-[4]"
          style={{ opacity: 0.4 }}
          alt="About Background"
        />
      </motion.section>

      {/* ——————————————————
          HORIZONTAL SCROLL (Projects + Events)
      —————————————————— */}
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
                  className="mb-8 flex items-center gap-3"
                >
                  <Code className="w-6 h-6" style={{ color: "#06b6d4" }} />
                  <h2
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span style={{ color: "#06b6d4" }}>Projects</span>
                  </h2>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:w-1/2"
                  >
                    <div
                      className="relative overflow-hidden rounded-xl"
                      style={{
                        border: "1px solid rgba(6,182,212,0.2)",
                        boxShadow: "0 0 20px rgba(6,182,212,0.12)",
                      }}
                    >
                      <img src={Project} alt="Featured Project" className="w-full h-[65vh] object-cover" />
                      {/* Scanline overlay on image */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/30 to-transparent flex flex-col justify-end p-6">
                        <span className="mono-badge mb-3 w-fit" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          FEATURED
                        </span>
                        <h3
                          className="text-2xl md:text-3xl font-bold mb-2 text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          AI-Powered Analytics
                        </h3>
                        <p className="text-slate-400 mb-4 max-w-lg text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Our flagship project combining ML with real-time data processing.
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
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-4 text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Explore Our Tech Projects
                    </h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Discover innovative solutions by our team. From AI and machine learning to web development
                      and IoT — our projects showcase cutting-edge tech and creative problem-solving.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {["AI", "Machine Learning", "Web3", "IoT"].map((t) => (
                        <TechTag key={t}>{t}</TechTag>
                      ))}
                    </div>
                    <GradientButton href="/projects" icon={<ArrowRight className="ml-2 h-4 w-4" />}>
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
                  className="mb-8 flex items-center gap-3"
                >
                  <Calendar className="w-6 h-6" style={{ color: "#06b6d4" }} />
                  <h2
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span style={{ color: "#06b6d4" }}>Events</span>
                  </h2>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:w-1/2"
                  >
                    <div
                      className="relative overflow-hidden rounded-xl"
                      style={{
                        border: "1px solid rgba(6,182,212,0.2)",
                        boxShadow: "0 0 20px rgba(6,182,212,0.12)",
                      }}
                    >
                      <img src={Event} alt="Featured Event" className="w-full h-[65vh] object-cover" />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/30 to-transparent flex flex-col justify-end p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="mono-badge" style={{ fontFamily: "'JetBrains Mono', monospace" }}>UPCOMING</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded border"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              color: "#94a3b8",
                              borderColor: "rgba(148,163,184,0.2)",
                              background: "rgba(148,163,184,0.05)",
                            }}
                          >
                            JUN 15, 2025
                          </span>
                        </div>
                        <h3
                          className="text-2xl md:text-3xl font-bold mb-2 text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Annual Hackathon
                        </h3>
                        <p className="text-slate-400 mb-4 max-w-lg text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                          48 hours of coding, collaboration, and innovation.
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
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-4 text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Join Our Tech Events
                    </h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Participate in workshops, hackathons, and tech talks organized by CyFuse. Connect with fellow tech
                      enthusiasts, level up your skills, and showcase your talents.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {["Workshops", "Tech Talks", "Hackathons", "Networking"].map((t) => (
                        <TechTag key={t}>{t}</TechTag>
                      ))}
                    </div>
                    <GradientButton href="/events" icon={<ArrowRight className="ml-2 h-4 w-4" />}>
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