import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CyfuseLogo from '../Assets/CyFuseLogo.png';

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const location = useLocation();

  const handleHamburgerClick = () => {
    setIsNavActive(!isNavActive);
  };
  const isHome = location.pathname === '/home';
  return (
    <div className={`flex justify-between items-center w-full p-4 md:p-6 z-[10] relative ${isHome ? ' text-black' : 'bg-black text-white'}`}>
      <div className="flex items-center text-lg md:text-xl tracking-wider">
        <img
          src={CyfuseLogo}
          alt="CyFuse Logo"
          className="w-6 h-8 md:w-7 md:h-12 ml-1 mr-2"
        />
        <h1 className='text-white'>CyFuse</h1>
      </div>
      <div
        className={`${
          isNavActive ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row md:mr-7 bg-black md:bg-transparent absolute md:static top-full left-0 w-full md:w-auto md:space-x-4 text-center`}
      >
        <ul className="flex flex-col md:flex-row items-center list-none">
          <li className="py-2 md:py-0">
            <Link to="/" className="text-white mx-2 text-base md:text-lg">
              Home
            </Link>
          </li>

          <li className="py-2 md:py-0">
            <Link to="/events" className="text-white mx-2 text-base md:text-lg">
              Events
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link
              to="/projects"
              className="text-white mx-2 text-base md:text-lg"
            >
              Projects
            </Link>
          </li>

          <li className="py-2 md:py-0">
            <Link to="/team" className="text-white mx-2 text-base md:text-lg">
              Team
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/about" className="text-white mx-2 text-base md:text-lg">
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`hamburger ${isNavActive ? 'active' : ''} md:hidden`}
        onClick={handleHamburgerClick}
      >
        <div className="w-6 h-0.5 bg-white my-1 transition-transform"></div>
        <div className="w-6 h-0.5 bg-white my-1 transition-opacity"></div>
        <div className="w-6 h-0.5 bg-white my-1 transition-transform"></div>
      </div>
    </div>
  );
}

export default Header;