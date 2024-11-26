import React, { useState } from 'react';
import CyfuseLogo from '../Assets/CyFuseLogo.png';
import AboutBg from '../Assets/about-bg.png';
import InnovationVideo from '../Assets/allLow1.m4v';
import EventsHomeBg from '../Assets/events-home-bg.png';
import ProjectHomeBg from '../Assets/project-home-bg.png';

function Home() {
  const [isNavActive, setIsNavActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <>
      <div className="relative text-white bg-black">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-screen object-cover z-[1]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={InnovationVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Navbar */}
        <div className="flex justify-between items-center w-full p-12 z-[10] relative">
          <div className="flex items-center ml-4 text-xl tracking-wider"> {/* Increased text size */}
            <img src={CyfuseLogo} alt="CyFuse Logo" className="w-7 h-12 ml-1 mr-2" /> {/* Increased logo size */}
            <h1>CyFuse</h1>
          </div>
          <div className={`navbar ${isNavActive ? 'flex' : 'hidden'} flex-col md:flex md:flex-row md:mr-7`}>
            <ul className="flex flex-col md:flex-row items-center list-none">
              <li><a href="#home" className="text-white mx-2 text-lg">Home</a></li> {/* Increased text size */}
              <li><a href="#projects" className="text-white mx-2 text-lg">Projects</a></li> {/* Increased text size */}
              <li><a href="#team" className="text-white mx-2 text-lg">Team</a></li> {/* Increased text size */}
              <li><a href="#about" className="text-white mx-2 text-lg">About Us</a></li> {/* Increased text size */}
            </ul>
          </div>
          <div className={`hamburger ${isNavActive ? 'active' : ''} md:hidden`} onClick={handleHamburgerClick}>
            <div className="w-8 h-1 bg-white my-1 transition-transform"></div> {/* Slightly larger hamburger lines */}
            <div className="w-8 h-1 bg-white my-1 transition-opacity"></div>
            <div className="w-8 h-1 bg-white my-1 transition-transform"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex justify-center items-center w-full h-screen relative z-[5]">
          <div className="text-center mt-[-5vh]"> {/* Adjusted margin to shift heading up */}
            <h1 className="text-8xl font-bold">CyFuse</h1>
            <h2 className="text-2xl mt-4">Dare to Innovate, Unite to Create</h2>
          </div>
        </div>

        {/* About Section */}
        <div className="flex justify-center items-center w-full h-screen relative bg-black">
          <div className="flex flex-col justify-center items-start z-[5]">
            <h1 className="text-3xl mx-2">About Us</h1>
            <span className="mx-2 my-2 p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black">Learn More</span>
          </div>
          <div className="flex justify-center items-center w-1/3 h-1/2 min-w-[160px] min-h-[320px] ml-12 p-16 text-lg bg-gradient-to-br from-white/10 to-white/30 shadow-lg backdrop-blur-md rounded-2xl z-[5]">
            <p>
              An ultimate tech club where we're all about fusing diverse technologies and domains to create groundbreaking innovations! From blending cutting-edge software with the latest hardware to exploring the intersection of different fields, CyFuse is your go-to hub for pushing the boundaries of what's possible in the tech world. Join us on this exciting journey of creativity, collaboration, and innovation. Let's fuse ideas and build the future together!
            </p>
          </div>
          <img src={AboutBg} className="absolute w-2/5 right-0 top-[-2vh] min-w-[450px] z-[2]" alt="About Background" />
        </div>

        {/* Projects Section */}
        <div className="flex justify-center items-center w-full h-screen relative">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl mx-2">Projects</h1>
            <span className="mx-2 my-2 p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black">View More</span>
          </div>
          <div className="flex justify-center items-center w-1/3 h-1/3 min-w-[280px] min-h-[280px] ml-5 p-12">
            <img src={ProjectHomeBg} alt="Project Background" />
          </div>
        </div>

        {/* Events Section */}
        <div className="flex justify-center items-center w-full h-screen relative">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl mx-2">Events</h1>
            <span className="mx-2 my-2 p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black">View More</span>
          </div>
          <div className="flex justify-center items-center w-1/3 h-1/3 min-w-[280px] min-h-[280px] ml-5 p-12">
            <img src={EventsHomeBg} alt="Events Background" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;