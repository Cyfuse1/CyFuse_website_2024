import { motion } from 'framer-motion';
import Cyfuse from '../Assets/CyFuseLogo.png';
import { Link } from 'react-router-dom';
import { WhatsAppOutlined, InstagramOutlined, LinkedinFilled } from '@ant-design/icons';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Footer() {
  return (
    <motion.footer
      className="relative text-white py-14 overflow-hidden"
      style={{
        background: '#030712',
        borderTop: '1px solid rgba(6,182,212,0.12)',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Subtle tech grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.05) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.4), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Club Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={Cyfuse}
                alt="CyFuse logo"
                className="w-10 h-10 object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))' }}
              />
              <h1
                className="text-xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}
              >
                CyFuse
              </h1>
            </div>
            <p className="text-sm" style={{ color: '#475569', fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}>
              Technology Innovation Club at IIIT Delhi
            </p>
            <p className="text-sm" style={{ color: '#334155', fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}>
              Fostering innovation through interdisciplinary collaboration
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2
              className="text-sm font-semibold mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Contact
            </h2>
            <p
              className="text-sm transition-colors duration-200 cursor-pointer"
              style={{ color: '#475569', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}
              onMouseEnter={e => e.target.style.color = '#06b6d4'}
              onMouseLeave={e => e.target.style.color = '#475569'}
            >
              cyfuse@sc.iiitd.ac.in
            </p>
            <p className="text-sm" style={{ color: '#334155', fontFamily: "'Inter', sans-serif", lineHeight: '1.7', fontSize: '0.82rem' }}>
              IIIT Delhi<br />
              Okhla Industrial Estate, Phase III<br />
              New Delhi — 110020
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2
              className="text-sm font-semibold mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Explore
            </h2>
            <ul className="space-y-2">
              {[
                { label: 'About Us', to: '/aboutus' },
                { label: 'Projects', to: '/projects' },
                { label: 'Events', to: '/events' },
                { label: 'Team', to: '/team' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ color: '#475569', fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                  >
                    <span style={{ color: '#06b6d4', opacity: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }} className="group-hover:opacity-100 transition-opacity">&gt;</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2
              className="text-sm font-semibold mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Connect
            </h2>
            <div className="flex items-center gap-4">
              {[
                { to: 'https://www.instagram.com/cyfuse_iiitd/', icon: <InstagramOutlined />, label: 'Instagram' },
                { to: '#', icon: <WhatsAppOutlined />, label: 'WhatsApp' },
                { to: 'https://in.linkedin.com/company/cyfuse', icon: <LinkedinFilled />, label: 'LinkedIn' },
              ].map(({ to, icon, label }) => (
                <Link
                  key={label}
                  to={to}
                  title={label}
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{
                    color: '#475569',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.03)',
                    fontSize: '1rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#06b6d4';
                    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)';
                    e.currentTarget.style.background = 'rgba(6,182,212,0.08)';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(6,182,212,0.6))';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.filter = 'none';
                  }}
                >
                  {icon}
                </Link>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: '#334155', fontFamily: "'Inter', sans-serif" }}>
              Follow our latest updates
            </p>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#334155' }}
          >
            <span style={{ color: '#06b6d4' }}>// </span>
            © {new Date().getFullYear()} CyFuse — IIIT Delhi. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#1e293b' }}
          >
            Build tomorrow&apos;s technology today
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;