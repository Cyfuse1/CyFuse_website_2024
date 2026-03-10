import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CyfuseLogo from "../Assets/CyFuseLogo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Projects", to: "/projects" },
  { label: "Team", to: "/team" },
  { label: "About Us", to: "/aboutus" },
];

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsNavActive(false);
  }, [location]);

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-500 flex justify-center ${isScrolled ? "top-4 px-4" : "top-0 px-0"
        }`}
    >
      <div
        className={`w-full max-w-7xl mx-auto flex items-center justify-between h-16 transition-all duration-500 ${isScrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_8px_32px_rgba(6,182,212,0.15)] px-6 md:px-10"
          : "bg-transparent border-transparent px-4 md:px-8"
          }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <img
              src={CyfuseLogo}
              alt="CyFuse Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(6,182,212,0.8)]"
            />
          </div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}
          >
            CyFuse
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="relative px-4 py-2 text-sm font-medium transition-all duration-200 group"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span
                className={`transition-colors duration-200 ${isActive(to) ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  }`}
              >
                {label}
              </span>
              {/* Active indicator glow underline */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${isActive(to)
                  ? "w-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                  : "w-0 group-hover:w-full bg-cyan-500/50"
                  }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setIsNavActive((p) => !p)}
          aria-label="Toggle nav"
        >
          <span
            className={`block w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isNavActive ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isNavActive ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isNavActive ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isNavActive && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d1117]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg">
          <nav className="flex flex-col py-2">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setIsNavActive(false)}
                className={`px-6 py-3 text-sm font-medium border-l-2 transition-all duration-200 ${isActive(to)
                  ? "text-cyan-400 border-cyan-400 bg-cyan-500/5"
                  : "text-slate-300 border-transparent hover:text-white hover:border-cyan-500/50 hover:bg-white/5"
                  }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;