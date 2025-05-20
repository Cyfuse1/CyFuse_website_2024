import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CyfuseLogo from "../Assets/CyFuseLogo.png";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener to toggle sticky state as soon as the user scrolls
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Wrapper: non-scrolled = absolute at top, scrolled = fixed at top
  const wrapperClasses = isScrolled
    ? "fixed top-0 w-full bg-black/60 shadow-lg z-50"
    : "absolute top-8 left-0 w-full z-50";

  // Inner container: pill shape with glass effect and dynamic text color
  const innerClasses = `mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex items-center justify-between py-4 ` +
    `${isScrolled ? "text-white" : "bg-white/20 text-gray-100"} ` +
    `backdrop-blur-lg rounded-full transition-all duration-300 ease-in-out`;

  return (
    <header className={wrapperClasses}>
      <div className={innerClasses}>
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={CyfuseLogo} alt="CyFuse Logo" className="w-6 h-8 md:w-7 md:h-12" />
        </Link>

        {/* Desktop Nav Pills */}
        <nav className="hidden md:flex space-x-6">
          {[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            { label: 'Projects', to: '/projects' },
            { label: 'Team', to: '/team' },
            { label: 'About Us', to: '/aboutus' },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="px-4 py-2 rounded-full font-medium hover:opacity-80 transition-opacity duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button onClick={() => setIsNavActive(p => !p)} aria-label="Toggle nav">
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 transition-transform duration-300 ${isNavActive ? 'rotate-45 translate-y-2 bg-white' : 'bg-gray-900'}`}
              />
              <span
                className={`block w-6 h-0.5 transition-opacity duration-300 ${isNavActive ? 'opacity-0' : 'bg-gray-900'}`}
              />
              <span
                className={`block w-6 h-0.5 transition-transform duration-300 ${isNavActive ? '-rotate-45 -translate-y-2 bg-white' : 'bg-gray-900'}`}
              />
            </div>
          </button>

          {isNavActive && (
            <div className="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-md rounded-xl p-4 flex flex-col space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Events', to: '/events' },
                { label: 'Projects', to: '/projects' },
                { label: 'Team', to: '/team' },
                { label: 'About Us', to: '/aboutus' },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-white px-3 py-2 rounded-full hover:opacity-80 transition-opacity duration-200"
                  onClick={() => setIsNavActive(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;