import React from "react";

function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#5980A1] to-[#24426E] text-white py-8 ">
      {/* Main Content */}
      <div className="text-center max-w-5xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-6xl font-semibold mb-4">CyFuse</h1>

        {/* Subtitle */}
        <p className="text-lg mt-6 mb-3">We are always happy to help</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full">
            Brief Us
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full">
            Contact Us
          </button>
        </div>

        {/* Address and Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Address */}
          <div className="text-sm text-left mb-4 md:mb-0">
            <p>cyfuse@sc.iiitd.ac.in</p>
            <p>IIIT Delhi, New Delhi–110020</p>
          </div>

          {/* Footer Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-white hover:text-gray-300"
              aria-label="WhatsApp"
            >
              <img src="https://via.placeholder.com/24" alt="WhatsApp" className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-300"
              aria-label="Instagram"
            >
              <img src="https://via.placeholder.com/24" alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-300"
              aria-label="LinkedIn"
            >
              <img src="https://via.placeholder.com/24" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;