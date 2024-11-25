import React, { useState } from 'react';
import CyfuseLogo from '../Assets/CyFuseLogo.png';
import AboutBg from '../Assets/about-bg.png';
import EventsHomeBg from '../Assets/events-home-bg.png';
import ProjectHomeBg from '../Assets/project-home-bg.png';

function Home() {
  const [isNavActive, setIsNavActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className="bg-black text-white">
      <div className="flex justify-between items-center w-full h-15vh p-4">
        <div className="flex items-center ml-4 text-lg tracking-wider">
          <img src={CyfuseLogo} alt="CyFuse Logo" className="w-6 ml-1 mr-2" />
          <h1>CyFuse</h1>
        </div>
        <div className={`navbar ${isNavActive ? 'flex' : 'hidden'} flex-col md:flex md:flex-row md:mr-7`}>
          <ul className="flex flex-col md:flex-row items-center list-none">
            <li><a href="#home" className="text-white mx-2">Home</a></li>
            <li><a href="#projects" className="text-white mx-2">Projects</a></li>
            <li><a href="#team" className="text-white mx-2">Team</a></li>
            <li><a href="#about" className="text-white mx-2">About Us</a></li>
          </ul>
        </div>
        <div className={`hamburger ${isNavActive ? 'active' : ''} md:hidden`} onClick={handleHamburgerClick}>
          <div className="w-6 h-0.5 bg-white my-1 transition-transform"></div>
          <div className="w-6 h-0.5 bg-white my-1 transition-opacity"></div>
          <div className="w-6 h-0.5 bg-white my-1 transition-transform"></div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-85vh">
        <div className="flex flex-col justify-center items-start text-center">
          <h1 className="text-5xl mx-2">CyFuse</h1>
          <h2 className="mx-2">Dare to Innovate, Unite to Create</h2>
        </div>
      </div>
     
      <div className="fixed top-3/4 left-2 flex flex-col space-y-2.5">
        <i className="fab fa-whatsapp text-2xl"></i>
        <i className="fab fa-instagram text-2xl"></i>
        <i className="fab fa-linkedin text-2xl"></i>
      </div>
      <div className="flex justify-center items-center w-full h-screen relative">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-3xl mx-2">About Us</h1>
          <span className="mx-2 my-2 p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black">Learn More</span>
        </div>
        <div className="flex justify-center items-center w-1/3 h-1/3 min-w-[280px] min-h-[280px] ml-5 p-12 text-lg bg-gradient-to-br from-white/10 to-white/30 shadow-lg backdrop-blur-md rounded-2xl">
          <p>
            An ultimate tech club where we're all about fusing diverse technologies and domains to create groundbreaking innovations! From blending cutting-edge software with the latest hardware to exploring the intersection of different fields, CyFuse is your go-to hub for pushing the boundaries of what's possible in the tech world. Join us on this exciting journey of creativity, collaboration, and innovation. Let's fuse ideas and build the future together!
          </p>
        </div>
        <img src={AboutBg} className="absolute w-2/5 right-0 top-[-2vh] min-w-[450px] z-[-1]" alt="" />
      </div>
      <div className="flex justify-center items-center w-full h-screen relative">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-3xl mx-2">Projects</h1>
          <span className="mx-2 my-2 p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black">View More</span>
        </div>
        <div className="flex justify-center items-center w-1/3 h-1/3 min-w-[280px] min-h-[280px] ml-5 p-12">
          <img src={ProjectHomeBg} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-screen relative">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-3xl mx-2">Events</h1>
          <span className="mx-2 my-2 p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black">View More</span>
        </div>
        <div className="flex justify-center items-center w-1/3 h-1/3 min-w-[280px] min-h-[280px] ml-5 p-12">
          <img src={EventsHomeBg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;