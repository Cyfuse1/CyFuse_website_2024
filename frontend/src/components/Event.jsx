import { useEffect, useState } from 'react';
import { fetchPaginatedData, fetchDataFromCollection } from './script';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Zap } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const orangeAccent = '#ea580c';
const orangeLow = 'rgba(234,88,12,0.07)';
const orangeMid = 'rgba(234,88,12,0.2)';

const OrangeInfinityBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Infinite Moving Gradient */}
    <motion.div
      className="absolute inset-[-50%] opacity-20"
      animate={{
        scale: [1, 1.15, 1],
        x: ['-5%', '5%', '-5%'],
        y: ['-5%', '5%', '-5%'],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: 'radial-gradient(circle at center, #7c2d12 0%, transparent 60%)',
        filter: 'blur(100px)',
      }}
    />

    {/* Base Grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${orangeLow} 1.5px, transparent 0)`,
        backgroundSize: '32px 32px',
      }}
    />
    {/* Glowing Pulses */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 500 + i * 100,
          height: 500 + i * 100,
          background: `radial-gradient(circle, ${orangeAccent}11 0%, transparent 70%)`,
          top: i === 0 ? '-10%' : i === 1 ? '40%' : '80%',
          left: i === 0 ? '70%' : i === 1 ? '-10%' : '60%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(3,7,18,0.5) 100%)' }} />
  </div>
);

const EventSkeleton = () => (
  <div className="flex flex-col rounded-xl p-4 md:p-6 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] animate-pulse" style={{ background: '#0d1117', border: `1px solid ${orangeLow}` }}>
    <div className="w-full h-48 rounded-lg bg-gray-800 mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 w-3/4 rounded bg-gray-800"></div>
      <div className="h-4 w-full rounded bg-gray-800"></div>
    </div>
  </div>
);

const EventList = ({ events }) => (
  <>
    {events.length ? (
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {events.map((event) => (
          <motion.div
            key={event.id}
            variants={cardVariants}
            className="hud-corners flex flex-col rounded-xl p-4 md:p-6 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] transition-all duration-300"
            style={{
              background: '#0d1117',
              border: `1px solid ${orangeLow}`,
            }}
            whileHover={{
              borderColor: orangeMid,
              boxShadow: `0 0 25px ${orangeLow}`,
            }}
          >
            <div className="relative mb-4 overflow-hidden rounded-lg border border-white/5">
              <img
                src={event.Picture || 'https://blocks.astratic.com/img/general-img-portrait.png'}
                alt={event.Title}
                className="w-full h-48 object-cover"
                style={{ filter: 'brightness(0.85) saturate(0.8)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
                }}
              />
            </div>
            <div className="flex-1">
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}
              >
                {event.Title}
              </h3>

              <div className="space-y-2 mb-4">
                <p className="text-xs flex items-center gap-2" style={{ color: '#94a3b8', fontFamily: "'Inter', sans-serif" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: orangeAccent }} />
                  <span>{event.Venue}</span>
                </p>
                <p className="text-xs flex items-center gap-2" style={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                  <Calendar className="w-3.5 h-3.5" style={{ color: orangeAccent }} />
                  <span>{event.Time?.seconds ? new Date(event.Time.seconds * 1000).toLocaleDateString() : 'TBA'}</span>
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span
                  className="mono-badge"
                  style={{ fontSize: '0.65rem', padding: '1px 6px', color: orangeAccent, borderColor: orangeMid, background: orangeLow }}
                >
                  {event.Status?.toUpperCase() || 'UPCOMING'}
                </span>

                {event.Registration && event.Registration !== 'OVER' && (
                  <a
                    href={event.Registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold transition-colors"
                    style={{ color: orangeAccent }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = orangeAccent}
                  >
                    REGISTER <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <motion.p
        className="text-center text-slate-500 text-lg py-12"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        // NO_EVENTS_RECORDED
      </motion.p>
    )}
  </>
);

function Event() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageRawCursors, setPageRawCursors] = useState([null]);
  const LIMIT = 8;

  const scrollToTop = () => {
    const section = document.getElementById('events-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchPastPage = async (page) => {
    setPageLoading(true);
    try {
      const startingRawCursor = pageRawCursors[page - 1] || null;
      let collectedCompleted = [];
      let rawCursor = startingRawCursor;
      while (collectedCompleted.length < page * LIMIT) {
        const { data: rawBatch, lastDoc: newRawCursor, empty } =
          await fetchPaginatedData('events', LIMIT, rawCursor);
        const newCompleted = rawBatch.filter((e) => e.Status === 'Completed');
        collectedCompleted = [...collectedCompleted, ...newCompleted];
        rawCursor = newRawCursor;
        if (empty) break;
      }
      const startIndex = (page - 1) * LIMIT;
      const pageSlice = collectedCompleted.slice(startIndex, startIndex + LIMIT);
      setPastEvents(pageSlice);

      let count = 0;
      let cursorForNext = startingRawCursor;
      while (count < page * LIMIT) {
        const { data: rawBatch, lastDoc: nextRaw } =
          await fetchPaginatedData('events', LIMIT, cursorForNext);
        const completedInBatch = rawBatch.filter((e) => e.Status === 'Completed');
        count += completedInBatch.length;
        cursorForNext = nextRaw;
        if (!nextRaw) break;
      }
      setPageRawCursors((prev) => {
        const copy = [...prev];
        copy[page] = cursorForNext || null;
        return copy;
      });
      setHasNextPage(collectedCompleted.length > page * LIMIT);
      setCurrentPage(page);
      scrollToTop();
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load past events.');
    } finally {
      setPageLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);
        const allEvents = await fetchDataFromCollection('events');
        setUpcomingEvents(allEvents.filter((e) => e.Status?.toLowerCase() === 'upcoming'));
        setLiveEvents(allEvents.filter((e) => e.Status?.toLowerCase() === 'live'));
        await fetchPastPage(1);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch events.');
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  const handleNext = () => hasNextPage && fetchPastPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && fetchPastPage(currentPage - 1);

  const renderPagination = () => {
    const pageButtons = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + maxPagesToShow - 1;
    if (!hasNextPage && endPage > currentPage) endPage = currentPage;

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => i !== currentPage && (i < currentPage ? handlePrev() : handleNext())}
          disabled={pageLoading}
          className={`px-4 py-2 rounded font-medium text-xs transition-all duration-300 ${currentPage === i
              ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]'
              : 'bg-white/5 text-slate-400 hover:bg-orange-600/10 hover:text-orange-500 border border-white/5 hover:border-orange-600/20'
            }`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          PAG_{String(i).padStart(2, '0')}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-3 mt-12 pb-12">
        <button
          onClick={() => fetchPastPage(1)}
          disabled={currentPage === 1 || pageLoading}
          className="px-3 py-2 rounded text-xs text-slate-500 disabled:opacity-30 hover:text-orange-500 transition-colors"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          // FIRST
        </button>
        {pageButtons}
        <button
          onClick={handleNext}
          disabled={!hasNextPage || pageLoading}
          className="px-3 py-2 rounded text-xs text-slate-500 disabled:opacity-30 hover:text-orange-500 transition-colors"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          // NEXT
        </button>
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#030712' }}>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-8 rounded"
            style={{ background: orangeAccent }}
            animate={{ scaleY: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", color: orangeAccent, fontSize: '0.8rem' }}>
        LOADING_EVENTS_DB...
      </p>
    </div>
  );

  return (
    <div id="events-section" className="relative min-h-screen text-white py-16 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#030712' }}>
      <OrangeInfinityBackground />

      <header className="relative z-10 text-center my-24">
        <span
          className="mono-badge mb-6 inline-block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: orangeAccent,
            borderColor: orangeMid,
            background: orangeLow
          }}
        >
          CYFUSE · EVENTS_LOG
        </span>
        <motion.h1
          className="text-5xl md:text-9xl font-black"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff', textShadow: `0 0 50px ${orangeLow}` }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Eve<span style={{ color: orangeAccent }}>nts</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-base md:text-xl text-slate-500"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          &gt; Real-time activity tracking initiated
        </motion.p>
      </header>

      {liveEvents.length > 0 && (
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 mb-24">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
            <h2 className="text-4xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Live Now</h2>
          </div>
          <EventList events={liveEvents} />
        </motion.section>
      )}

      {upcomingEvents.length > 0 && (
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 mb-24">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <Zap className="w-8 h-8" style={{ color: orangeAccent }} />
            <h2 className="text-4xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Upcoming</h2>
          </div>
          <EventList events={upcomingEvents} />
        </motion.section>
      )}

      <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 mb-20">
        <div className="flex items-center gap-6 mb-10 justify-center">
          <div className="h-px w-20 bg-slate-800" />
          <h2 className="text-3xl font-bold text-slate-500 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Archive</h2>
          <div className="h-px w-20 bg-slate-800" />
        </div>

        {pageLoading ? (
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {Array.from({ length: LIMIT }).map((_, i) => <EventSkeleton key={i} />)}
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
