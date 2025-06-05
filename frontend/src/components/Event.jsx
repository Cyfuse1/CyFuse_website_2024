// Event.jsx
// Copy this entire file into your project. Ensure `script.js` (with fetchDataFromCollection and fetchPaginatedData) lives alongside it.
// No other changes are required.

import { useEffect, useState } from 'react';
import { fetchPaginatedData, fetchDataFromCollection } from './script';
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
  <div className="flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] animate-pulse">
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
            className="flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-lg hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 hover:-rotate-1"
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
                <strong className="text-white">Date:</strong>{' '}
                {new Date(event.Time.seconds * 1000).toLocaleString().split(',')[0]}
              </p>
              <p className="text-gray-300 mb-2 text-sm">
                <strong className="text-white">Status:</strong> {event.Status}
              </p>
              {event.Registration && event.Registration !== 'OVER' ? (
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Registration:</strong>{' '}
                  <a
                    href={event.Registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 underline hover:text-pink-400 transition"
                  >
                    Register here
                  </a>
                </p>
              ) : null}
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
  // ---------- State for Upcoming & Live ----------
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);

  // ---------- State for Past (paginated) ----------
  const [pastEvents, setPastEvents] = useState([]); // current page of Completed events
  const [pageLoading, setPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  // pageRawCursors[i] = the Firestore document snapshot (lastDoc) from raw fetchPaginatedData
  // that allowed us to collect (i × LIMIT) Completed events so far.
  // pageRawCursors[0] = null (start from the very beginning for page 1).
  const [pageRawCursors, setPageRawCursors] = useState([null]);

  const LIMIT = 8;

  // Helper to scroll up when changing pages
  const scrollToTop = () => {
    const section = document.getElementById('events-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  // ---------- Fetch exactly one "Completed" page using raw pagination ----------
  const fetchPastPage = async (page) => {
    setPageLoading(true);

    try {
      // 1) The raw cursor from which to begin fetching
      const startingRawCursor = pageRawCursors[page - 1] || null;

      // 2) Collect enough raw batches to exceed page * LIMIT completed items
      let collectedCompleted = [];
      let rawCursor = startingRawCursor;
      let lastRawSeen = startingRawCursor;

      while (collectedCompleted.length < page * LIMIT) {
        const { data: rawBatch, lastDoc: newRawCursor, empty } =
          await fetchPaginatedData('events', LIMIT, rawCursor);

        const newCompleted = rawBatch.filter((e) => e.Status === 'Completed');
        collectedCompleted = [...collectedCompleted, ...newCompleted];

        lastRawSeen = newRawCursor;
        rawCursor = newRawCursor;
        if (empty) break; // no more raw docs
      }

      // 3) Now slice out exactly the desired page:
      const startIndex = (page - 1) * LIMIT;
      const pageSlice = collectedCompleted.slice(startIndex, startIndex + LIMIT);
      setPastEvents(pageSlice);

      // 4) Determine the next raw cursor (the document snapshot right after collecting page * LIMIT completed)
      //    We must re-run a smaller loop to find exactly where page * LIMIT ended.
      let count = 0;
      let cursorForNext = startingRawCursor;
      while (count < page * LIMIT) {
        const { data: rawBatch, lastDoc: nextRaw } =
          await fetchPaginatedData('Announcements', LIMIT, cursorForNext);
        const completedInBatch = rawBatch.filter((e) => e.Status === 'Completed');
        count += completedInBatch.length;
        cursorForNext = nextRaw;
        if (!nextRaw) break;
      }

      // 5) Save that raw cursor into our array so page+1 can start there
      setPageRawCursors((prev) => {
        const copy = [...prev];
        copy[page] = cursorForNext || null;
        return copy;
      });

      // 6) Determine if there's truly a next page:
      //    If total collectedCompleted length > page * LIMIT, there's at least one more completed left.
      setHasNextPage(collectedCompleted.length > page * LIMIT);

      setCurrentPage(page);
      scrollToTop();
      setError(null);
    } catch (err) {
      console.error('Error fetching past events page:', err);
      setError('Failed to load past events. Please try again later.');
    } finally {
      setPageLoading(false);
      setLoading(false);
    }
  };

  // ---------- Initial Load (Upcoming + Live + Past page 1) ----------
  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);

        // 1) Fetch all announcements once for Upcoming & Live
        const allAnnouncements = await fetchDataFromCollection('Announcements');
        setUpcomingEvents(allAnnouncements.filter((e) => e.Status === 'upcoming'));
        setLiveEvents(allAnnouncements.filter((e) => e.Status === 'live'));

        // 2) Fetch Past (Completed) → page 1
        await fetchPastPage(1);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch events. Please try again later.');
        setLoading(false);
      }
    };
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Pagination Handlers ----------
  const handleNext = () => {
    if (!hasNextPage) return;
    fetchPastPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage === 1) return;
    fetchPastPage(currentPage - 1);
  };

  const handleFirst = () => {
    if (currentPage === 1) return;
    fetchPastPage(1);
  };

  const handleLast = () => {
    if (!hasNextPage) return;
    fetchPastPage(currentPage + 1);
  };

  // Render pagination buttons (up to 3 numbers centered on currentPage)
  const renderPagination = () => {
    const pageButtons = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + maxPagesToShow - 1;
    if (!hasNextPage && endPage > currentPage) {
      endPage = currentPage;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => {
            if (i === currentPage) return;
            if (i < currentPage) return handlePrev();
            if (i > currentPage) return handleNext();
          }}
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
          disabled={!hasNextPage || pageLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            !hasNextPage || pageLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Next
        </button>
        <button
          onClick={handleLast}
          disabled={!hasNextPage || pageLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            !hasNextPage || pageLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Last
        </button>
      </div>
    );
  };

  // ---------- Loading & Error States ----------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <motion.p
          className="text-white text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading events...
        </motion.p>
      </div>
    );
  }
  if (error) {
    return (
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
  }

  // ---------- Final JSX: Upcoming, Live, and Past Sections ----------
  return (
    <div
      id="events-section"
      className="relative min-h-screen text-white font-sans py-16 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Animated Background */}
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

      {/* Upcoming Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mb-20"
      >
        <h2 className="text-4xl font-bold mb-10 text-center">Upcoming Events</h2>
        <EventList events={upcomingEvents} />
      </motion.section>

      {/* Live Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mb-20"
      >
        <h2 className="text-4xl font-bold mb-10 text-center">Live Events</h2>
        <EventList events={liveEvents} />
      </motion.section>

      {/* Past (Paginated) Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mb-20"
      >
        <h2 className="text-4xl font-bold mb-10 text-center">Past Events</h2>

        {pageLoading ? (
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : (
          <EventList events={pastEvents} />
        )}

        {renderPagination()}
      </motion.section>
    </div>
  );
}

export default Event;
