import React from 'react';
import { useInView } from 'react-intersection-observer';

function About() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div className="bg-black text-white font-sans h-full overflow-hidden">
      {/* About Section */}
      <div
        ref={aboutRef}
        className={`flex justify-center items-center w-full h-screen relative z-[5] ${aboutInView ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl mb-4">About Us</h1>
          <p className="text-lg md:text-xl mb-4">
            Welcome to CyFuse! We are a team of passionate individuals dedicated to creating innovative solutions.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Our mission is to fuse technology and creativity to deliver exceptional results.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Join us on our journey to make a difference in the world through technology.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;