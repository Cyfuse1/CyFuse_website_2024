import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CyfuseLogo from "../Assets/CyFuseLogo.png";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const location = useLocation();

  const handleHamburgerClick = () => {
    setIsNavActive(!isNavActive);
  };

  const isHome = location.pathname === "/home";

  return (
    <div
      className={`flex justify-between items-center w-full p-4 md:p-6 z-[10] relative ${
        isHome ? "text-black bg-transparent" : "bg-black text-white"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center text-lg md:text-xl tracking-wider">
        <img
          src={CyfuseLogo}
          alt="CyFuse Logo"
          className="w-6 h-8 md:w-7 md:h-12 ml-1 mr-2"
        />
        <h1 className="font-bold text-white">CyFuse</h1>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isNavActive ? "flex" : "hidden"
        } flex-col md:flex md:flex-row md:mr-7 bg-black md:bg-transparent absolute md:static top-full left-0 w-full md:w-auto text-center md:space-x-4 transition-all duration-500 ease-in-out`}
      >
        <ul className="flex flex-col md:flex-row items-center list-none">
          {["Home", "Events", "Projects", "Team", "About Us"].map((item, index) => (
            <li
              key={index}
              className={`py-2 md:py-0 ${
                isNavActive
                  ? "opacity-0 translate-y-5 animate-slide-in"
                  : "opacity-100"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="text-white mx-2 text-base md:text-lg hover:text-blue-400 transition-colors duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger Menu */}
      <div
        className="hamburger md:hidden cursor-pointer"
        onClick={handleHamburgerClick}
        aria-label="Toggle Navigation"
      >
        <div
          className={`w-6 h-0.5 bg-white my-1 transition-transform duration-300 ${
            isNavActive ? "rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${
            isNavActive ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white my-1 transition-transform duration-300 ${
            isNavActive ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </div>
    </div>
  );
}

export default Header;
