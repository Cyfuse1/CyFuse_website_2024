import React from "react";
import { useInView } from "react-intersection-observer";

function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div
      ref={footerRef}
      className={`bg-gradient-to-b from-[#5980A1] to-[#24426E] text-white py-8 transition-all duration-1000 ${
        footerInView ? "animate-fade-up" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Main Content */}
      <div className="text-center max-w-5xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-4">CyFuse</h1>

        {/* Subtitle */}
        <p className="text-lg mt-6 mb-3">We are always happy to help</p>

        {/* Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 hover:scale-110 active:bg-blue-700 transition-colors rounded-full shadow-md">
            Brief Us
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 hover:scale-110 active:bg-blue-700 transition-colors rounded-full shadow-md">
            Contact Us
          </button>
        </div>

        {/* Address and Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Address */}
          <div className="text-sm text-center md:text-left mb-4 md:mb-0">
            <p>cyfuse@sc.iiitd.ac.in</p>
            <p>IIIT Delhi, New Delhi–110020</p>
          </div>

          {/* Footer Links */}
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <img
                src="https://via.placeholder.com/24"
                alt="WhatsApp"
                className="w-6 h-6"
              />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <img
                src="https://via.placeholder.com/24"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <img
                src="https://via.placeholder.com/24"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
