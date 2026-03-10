"use client"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

GradientButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  href: PropTypes.string,
};

export default function GradientButton({ children, onClick, icon, href }) {
  const buttonStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 24px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#fff',
    fontFamily: "'Space Grotesk', sans-serif",
    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    border: '1px solid rgba(6,182,212,0.4)',
    boxShadow: '0 0 18px rgba(6,182,212,0.35)',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    overflow: 'hidden',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = '0 0 32px rgba(6,182,212,0.6), 0 0 80px rgba(6,182,212,0.15)';
    e.currentTarget.style.background = 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)';
    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.7)';
    e.currentTarget.style.transform = 'translateY(-1px)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = '0 0 18px rgba(6,182,212,0.35)';
    e.currentTarget.style.background = 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)';
    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = 'translateY(1px)';
    e.currentTarget.style.boxShadow = '0 0 12px rgba(6,182,212,0.4)';
  };

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = 'translateY(-1px)';
    e.currentTarget.style.boxShadow = '0 0 32px rgba(6,182,212,0.6)';
  };

  const content = (
    <>
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        {children}
        {icon}
      </span>
    </>
  );

  const eventHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };

  if (href) {
    return (
      <Link to={href} style={buttonStyle} {...eventHandlers}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} style={buttonStyle} {...eventHandlers}>
      {content}
    </button>
  );
}
