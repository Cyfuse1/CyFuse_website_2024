import { useInView } from "react-intersection-observer";
import Cyfuse from "../assets/CyFuseLogo.png";
import { Link } from "react-router-dom";
import { DynamicIcon } from 'lucide-react/dynamic';


function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <footer
      ref={footerRef}
      className={`bg-gray-900 text-gray-300 py-12 transition-all duration-1000 ${
        footerInView ? "animate-fade-up" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo & Title */}
        <div className="flex items-center justify-center md:justify-start mb-8">
          {/* Logo container */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 overflow-hidden">
            <img
              src={Cyfuse}
              alt="CyFuse logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            CyFuse
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center md:text-left text-gray-400 mb-6">
          Always here to assist you.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center md:justify-start flex-wrap gap-4 mb-10">
          {["Brief Us", "Contact Us"].map((label) => (
            <button
              key={label}
              className="px-6 py-2 border border-gray-600 text-gray-200 hover:text-white hover:border-gray-400 hover:scale-105 transition-transform rounded-full shadow-sm"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-lg font-semibold text-white">Contact Us</h2>
            <p className="font-medium">cyfuse@sc.iiitd.ac.in</p>
            <p className="font-medium">IIIT Delhi, New Delhi–110020</p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center md:justify-start">
            <ul className="space-y-2">
              <li className="text-lg font-semibold text-white">About Us</li>
              {["Services", "Privacy Policy", "Terms of Use"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-6">
            {["WhatsApp", "Instagram", "LinkedIn"].map((name) => (
              <Link
                key={name}
                to=""
                className="transform hover:scale-110 transition-transform"
                aria-label={name}
              >
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <DynamicIcon name={name} size={24} className="text-gray-300 bg-gray-700 rounded-full p-1"/>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CyFuse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
