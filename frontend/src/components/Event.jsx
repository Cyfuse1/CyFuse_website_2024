import { useEffect, useState, Suspense } from 'react';
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
            key={event.id} // Changed from idx to event.id
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
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const { data, lastDoc: newLastDoc, empty } = await fetchPaginatedData('events', LIMIT, lastDoc); // Fixed destructuring to include empty
      console.log('Fetched page:', currentPage, data);

      setEvents(prev => [...prev, ...data]);
      setLastDoc(newLastDoc); // Fixed typo by removing extra 'S'
      setHasMore(!empty && data.length === LIMIT);
      setCurrentPage(prev => prev + 1);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        const { data, lastDoc: newLastDoc, empty } = await fetchPaginatedData('events', LIMIT, lastDoc);
        setEvents(data);
        setLastDoc(newLastDoc);
        setHasMore(!empty && data.length === LIMIT);
      } catch (err) {
        setError('Failed to fetch events');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <motion.p className="text-white text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        Loading events...
      </motion.p>
    </div>
  );
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

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
    <div className="relative min-h-screen text-white font-sans py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
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
        {/* Particle-like overlay with glow */}
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
            <h2 className="text-4xl font-bold mb-10 text-center group">{section.label}</h2>
            <EventList events={section.events} />
            {section.key === 'past' && hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadEvents}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-lg"
                >
                  Load More
                </button>
              </div>
            )}
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export default Event;