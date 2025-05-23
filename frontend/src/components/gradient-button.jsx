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
  const buttonClasses = `
    relative px-8 py-3 rounded-full font-medium text-white
    overflow-hidden group
    before:absolute before:inset-0
    before:bg-gradient-to-r before:from-indigo-600 before:via-indigo-500 before:to-purple-600
    hover:before:bg-gradient-to-r hover:before:from-indigo-500 hover:before:via-purple-600 hover:before:to-indigo-600
    before:transition-all before:duration-500
    after:absolute after:inset-0 after:bg-gradient-to-r after:from-indigo-600 after:via-indigo-500 after:to-purple-600
    after:opacity-0 hover:after:opacity-100
    after:transition-opacity after:duration-500
    shadow-[0_0_15px_rgba(99,102,241,0.5)]
    hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]
    transition-all duration-300
  `;

  const contentClasses = `
    relative z-10 flex items-center justify-center
  `;

    if (href) {
    return (
      <Link to={href} className={buttonClasses}>
        <span className={contentClasses}>
          {children}
          {icon}
        </span>
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      <span className={contentClasses}>
        {children}
        {icon}
      </span>
    </button>
  );
}
