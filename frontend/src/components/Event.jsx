import { useEffect, useState } from 'react';
import { fetchPaginatedData } from './script';
import { motion } from 'framer-motion';

// Framer Motion variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Skeleton Loader Component for Events
const EventSkeleton = () => (
  <div className="flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 w-full md:w-[32%] animate-pulse">
    <div className="flex-shrink-0 mb-4">
      <div className="w-full h-48 rounded-xl bg-gray-700"></div>
    </div>
    <div className="flex-1 space-y-3">
      <div className="h-6 w-3/4 rounded bg-gray-700"></div>
      <div className="h-4 w-full rounded bg-gray-700"></div>
      <div className="h-4 w-1/2 rounded bg-gray-700"></div>
      <div className="h-4 w-2/3 rounded bg-gray-700"></div>
      <div className="h-4 w-1/3 rounded bg-gray-700"></div>
    </div>
  </div>
);

// Event Listing Component
const EventList = ({ events }) => (
  <>
    {events.length ? (
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {events.map((event) => (
          <motion.div
            key={event.id}
            variants={cardVariants}
            className="flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 w-full md:w-[20%] shadow-lg hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 hover:-rotate-1"
          >
            <div className="flex-shrink-0 mb-4">
              <img
                src={event.Picture || 'https://blocks.astratic.com/img/general-img-portrait.png'}
                alt={event.Title}
                className="w-full h-48 rounded-xl object-cover border border-white/10"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400">
                {event.Title}
              </h3>
              <p className="text-gray-300 mb-2 text-sm leading-relaxed">
                <strong className="text-white">Description:</strong> {event.Description}
              </p>
              <p className="text-gray-300 mb-2 text-sm">
                <strong className="text-white">Venue:</strong> {event.Venue}
              </p>
              <p className="text-gray-300 mb-2 text-sm">
                <strong className="text-white">Time:</strong> {new Date(event.Time).toLocaleString()}
              </p>
              <p className="text-gray-300 mb-2 text-sm">
                <strong className="text-white">Status:</strong> {event.Status}
              </p>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Registration:</strong> {event.Registration}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <motion.p
        className="text-center text-gray-400 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        No events in this category.
      </motion.p>
    )}
  </>
);

function Event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false); // For pagination loading
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const LIMIT = 8;

  // Scroll to top of events section
  const scrollToTop = () => {
    const eventsSection = document.getElementById('events-section');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch events for a specific page
  const fetchPage = async (page) => {
    setPageLoading(true);
    try {
      let newLastDoc = null;
      let fetchedEvents = [];
      let skip = (page - 1) * LIMIT;

      // Reset events and lastDoc for non-sequential navigation
      setEvents([]);
      setLastDoc(null);

      // Fetch events until we reach the desired page
      while (fetchedEvents.length < skip + LIMIT && hasMore) {
        const { data, lastDoc: nextLastDoc, empty } = await fetchPaginatedData('events', LIMIT, newLastDoc);
        fetchedEvents = [...fetchedEvents, ...data];
        newLastDoc = nextLastDoc;
        setHasMore(!empty && data.length === LIMIT);
        if (empty || data.length < LIMIT) break;
      }

      // Slice the events for the current page
      const pageEvents = fetchedEvents.slice(skip, skip + LIMIT);
      setEvents(pageEvents);
      setLastDoc(newLastDoc);
      setCurrentPage(page);
      // Estimate total pages
      setTotalPages(Math.max(totalPages, Math.ceil(fetchedEvents.length / LIMIT)));
      scrollToTop();
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setPageLoading(false);
      setLoading(false);
    }
  };

  // Handle initial load
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const { data, lastDoc: newLastDoc, empty } = await fetchPaginatedData('events', LIMIT, null);
        setEvents(data);
        setLastDoc(newLastDoc);
        setHasMore(!empty && data.length === LIMIT);
        setTotalPages(Math.max(totalPages, 1));
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  // Handle page navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchPage(page);
    }
  };

  // Handle First, Prev, Next, Last
  const handleFirst = () => handlePageChange(1);
  const handlePrev = () => handlePageChange(currentPage - 1);
  const handleNext = () => {
    if (hasMore) {
      fetchPage(currentPage + 1);
    }
  };
  const handleLast = () => handlePageChange(totalPages);

  // Pagination buttons
  const renderPagination = () => {
    const pageButtons = [];
    const maxPagesToShow = 3; // Show up to 3 page numbers
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={pageLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            currentPage === i
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : pageLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1 || pageLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            currentPage === 1 || pageLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          First
        </button>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1 || pageLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            currentPage === 1 || pageLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Prev
        </button>
        {pageButtons}
        <button
          onClick={handleNext}
          disabled={!hasMore || pageLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            !hasMore || pageLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Next
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages || !hasMore || pageLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            currentPage === totalPages || !hasMore || pageLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Last
        </button>
      </div>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <motion.p className="text-white text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        Loading events...
      </motion.p>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <motion.p
        className="text-center text-red-500 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.p>
    </div>
  );

  // Group events by status
  const grouped = {
    upcoming: events.filter(e => e.Status === 'Upcoming'),
    live: events.filter(e => e.Status === 'In progress'),
    past: events.filter(e => e.Status === 'Completed'),
  };

  // Define sections
  const sections = [
    { key: 'upcoming', label: 'Upcoming Events', events: grouped.upcoming },
    { key: 'live', label: 'Live Events', events: grouped.live },
    { key: 'past', label: 'Past Events', events: grouped.past },
  ];

  return (
    <div
      id="events-section"
      className="relative min-h-screen text-white font-sans py-16 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Animated Background with Gradient and Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #2a1a5e 0%, #0a0a0a 70%)' }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #2a1a5e 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 70% 30%, #3b2a8b 0%, #0a0a0a 70%)',
            'radial-gradient(circle at 30% 60%, #2a1a5e 0%, #0a0a0a 70%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            filter: 'blur(1px)',
          }}
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Header */}
      <header className="relative z-10 text-center my-24">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Events
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover what's happening at CyFuse
        </motion.p>
      </header>

      {/* Event Sections */}
      <div className="relative z-10">
        {sections.map(section => (
          <motion.section
            key={section.key}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold mb-10 text-center">{section.label}</h2>
            {pageLoading && section.key === 'past' ? (
              <div className="flex flex-wrap justify-center gap-6 px-4">
                {Array.from({ length: LIMIT }).map((_, i) => (
                  <EventSkeleton key={i} />
                ))}
              </div>
            ) : (
              <EventList events={section.events} />
            )}
            {section.key === 'past' && renderPagination()}
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export default Event;