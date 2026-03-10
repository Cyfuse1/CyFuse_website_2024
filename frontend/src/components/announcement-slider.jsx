"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import PropTypes from "prop-types"

export default function AnnouncementSlider({ announcements }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sliderRef = useRef(null)
  const autoplayRef = useRef(null)

  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0 },
    hiddenLeft: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  }

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    autoplayRef.current = setTimeout(() => {
      setDirection(1)
      setCurrentIndex(prev => (prev + 1) % announcements.length)
    }, 5000)
  }, [announcements.length])

  useEffect(() => {
    startAutoplay()
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current) }
  }, [currentIndex, announcements.length, startAutoplay])

  const handleNext = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % announcements.length)
  }

  const handlePrev = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + announcements.length) % announcements.length)
  }

  const { Title, Time, Description, Picture } = announcements[currentIndex]
  const date = Time?.seconds
    ? new Date(Time.seconds * 1000).toISOString().split("T")[0]
    : "TBA"

  // Progress bar for autoplay
  const [progressKey, setProgressKey] = useState(0)
  useEffect(() => {
    setProgressKey(k => k + 1)
  }, [currentIndex])

  return (
    <div
      ref={sliderRef}
      className="relative overflow-hidden rounded-xl"
      style={{
        border: '1px solid rgba(6,182,212,0.15)',
        boxShadow: '0 0 30px rgba(6,182,212,0.06)',
      }}
      onMouseEnter={() => { if (autoplayRef.current) clearTimeout(autoplayRef.current) }}
      onMouseLeave={() => startAutoplay()}
    >
      <div className="aspect-[15/7] md:aspect-[21/9] relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={Picture || "/placeholder.svg"}
                alt={Title}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.65) saturate(0.85)' }}
              />
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
                }}
              />
              {/* Gradient */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(3,7,18) 5%, rgba(3,7,18,0.6) 50%, rgba(3,7,18,0.2) 100%)' }} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-3.5 w-3.5" style={{ color: '#06b6d4' }} />
                  <span
                    className="text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: '#06b6d4' }}
                  >
                    {date}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}
                >
                  {Title}
                </h3>
                <p
                  className="max-w-2xl text-sm md:text-base"
                  style={{ color: '#94a3b8', fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}
                >
                  {Description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      {[
        { pos: 'left-4', onClick: handlePrev, Icon: ChevronLeft, label: 'Previous' },
        { pos: 'right-4', onClick: handleNext, Icon: ChevronRight, label: 'Next' },
      ].map(({ pos, onClick, Icon, label }) => (
        <button
          key={label}
          onClick={onClick}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 w-9 h-9 rounded flex items-center justify-center text-white z-10 transition-all duration-200`}
          style={{
            background: 'rgba(13,17,23,0.8)',
            border: '1px solid rgba(6,182,212,0.2)',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(6,182,212,0.5)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(6,182,212,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(6,182,212,0.2)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          aria-label={`${label} announcement`}
        >
          <Icon className="h-5 w-5" style={{ color: '#06b6d4' }} />
        </button>
      ))}

      {/* Slide progress indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
        {announcements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className="relative h-1 rounded-full transition-all duration-300 overflow-hidden"
            style={{
              width: currentIndex === idx ? '28px' : '8px',
              background: 'rgba(255,255,255,0.15)',
            }}
            aria-label={`Go to announcement ${idx + 1}`}
          >
            {currentIndex === idx && (
              <motion.div
                key={progressKey}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

AnnouncementSlider.propTypes = {
  announcements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
      Time: PropTypes.shape({
        seconds: PropTypes.number.isRequired,
        nanoseconds: PropTypes.number,
      }).isRequired,
      Description: PropTypes.string.isRequired,
      Picture: PropTypes.string,
      Link: PropTypes.string,
    })
  ).isRequired,
}

AnnouncementSlider.defaultProps = {
  announcements: [],
}
