import Cyfuse from "../assets/CyFuseLogo.png";
import { Link } from "react-router-dom";
import { WhatsAppOutlined, InstagramOutlined, LinkedinFilled }  from "@ant-design/icons"

function Footer() {
  
  return (
    <footer
      className={"bg-gray-900 text-gray-300 py-14"}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo & Title */}
        <div className="flex items-center justify-center md:justify-start mb-8 py-5">
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
              <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li><Link href="#" className="hover:text-white transition-colors">
                    Events
                  </Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">
                    Team
                  </Link></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-6">
            <Link
                to="https://www.instagram.com/cyfuse_iiitd/"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  {<InstagramOutlined />}
                </div>
            </Link>
            <Link
                to=""
                className="transform hover:scale-110 transition-transform"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  {<WhatsAppOutlined/>}
                </div>
              </Link>
              <Link
                to="https://in.linkedin.com/company/cyfuse"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  {<LinkedinFilled/>}
                </div>
              </Link>
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
