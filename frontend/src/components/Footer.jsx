import { motion } from 'framer-motion';
import Cyfuse from '../assets/CyFuseLogo.png';
import { Link } from 'react-router-dom';
import { WhatsAppOutlined, InstagramOutlined, LinkedinFilled } from '@ant-design/icons';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-b from-gray-900 to-gray-950 text-white font-sans py-14 border-t border-white/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Club Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center mb-4">
              <img
                src={Cyfuse}
                alt="CyFuse logo"
                className="w-12 h-12 object-contain mr-3"
              />
              <h1 className="text-2xl font-bold text-white">CyFuse</h1>
            </div>
            <p className="text-gray-400 text-sm">
              Technology Innovation Club at IIIT Delhi
            </p>
            <p className="text-gray-400 text-sm">
              Fostering innovation through interdisciplinary collaboration
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
            <p className="text-gray-400 text-sm hover:text-indigo-400 transition-colors">
              cyfuse@sc.iiitd.ac.in
            </p>
            <p className="text-gray-400 text-sm">
              IIIT Delhi<br/>
              Okhla Industrial Estate, Phase III<br/>
              New Delhi - 110020
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">Explore</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-400 text-sm hover:text-indigo-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 text-sm hover:text-indigo-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 text-sm hover:text-indigo-400 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-gray-400 text-sm hover:text-indigo-400 transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">Connect</h2>
            <div className="flex space-x-4">
              <Link
                to="https://www.instagram.com/cyfuse_iiitd/"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <InstagramOutlined className="text-xl" />
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <WhatsAppOutlined className="text-xl" />
              </Link>
              <Link
                to="https://in.linkedin.com/company/cyfuse"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <LinkedinFilled className="text-xl" />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Follow our latest updates and innovations
            </p>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} CyFuse - IIIT Delhi. All rights reserved.</p>
          <p className="mt-2">Building tomorrow's technology today</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;