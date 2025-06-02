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
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    autoplayRef.current = setTimeout(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)
  }, [announcements.length])

  useEffect(() => {
    startAutoplay()
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
    }
  }, [currentIndex, announcements.length, startAutoplay])

  const handleNext = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % announcements.length)
  }

  const handlePrev = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)
  }

  const handleMouseEnter = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
  }

  const handleMouseLeave = () => {
    startAutoplay()
  }

  const { title, date, content, image } = announcements[currentIndex]

  return (
    <div
      ref={sliderRef}
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <img
                src={image || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10">
                <div className="flex items-center text-gray-300 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 mb-4 max-w-2xl">{content}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
        aria-label="Previous announcement"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
        aria-label="Next announcement"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {announcements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to announcement ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

AnnouncementSlider.propTypes = {
  announcements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      image: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
}

AnnouncementSlider.defaultProps = {
  announcements: [],
}
