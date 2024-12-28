import { Chip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { fetchCollectionData } from './script'; // Ensure this path is correct

function Event() {
  const navigate = useNavigate();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    // Fetch current and past events from Firestore
    const fetchEvents = async () => {
      try {
        const current = await fetchCollectionData('CurrentEvents');
        const past = await fetchCollectionData('PastEvents');
        setCurrentEvents(current);
        setPastEvents(past);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleChipClick = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderEventCard = (event, index) => {
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: false,
    });

    return (
      <div
        ref={ref}
        key={index}
        className={`flex flex-col md:flex-row bg-gradient-to-br backdrop-blur-md rounded-xl p-6 md:p-12 mb-8 mx-4 border border-white transition-transform duration-300 
          ${inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}
          hover:scale-105 hover:brightness-125`}
      >
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <img
            src={event.Picture || 'https://via.placeholder.com/150'}
            alt={event.Title}
            className="w-full md:w-48 h-auto rounded-xl object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">{event.Title}</h3>
          <p className="text-gray-300 mb-2"><strong>Description:</strong> {event.Description}</p>
          <p className="text-gray-300 mb-2"><strong>Venue:</strong> {event.Venue}</p>
          <p className="text-gray-300 mb-2"><strong>Time:</strong> {new Date(event.Time).toLocaleString()}</p>
          <p className="text-gray-300 mb-2"><strong>Status:</strong> {event.Status}</p>
          <p className="text-gray-300"><strong>Registration:</strong> {event['Registration details']}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-black text-white font-sans min-h-screen py-8 px-6 md:px-16">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-40 backdrop-blur-lg -z-10"></div>

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">Events</h1>
        <h2 className="text-lg md:text-2xl mt-4 animate-slide-down">Explore our events</h2>
      </div>

      {/* Chips to Redirect to Current and Past Events */}
      <div className="flex justify-center gap-4 mb-8">
        <Chip
          color="warning"
          variant="bordered"
          onClick={() => handleChipClick('current-events')}
          className="cursor-pointer border-white text-white hover:scale-110"
        >
          Current Events
        </Chip>
        <Chip
          color="warning"
          variant="bordered"
          onClick={() => handleChipClick('past-events')}
          className="cursor-pointer border-white text-white hover:scale-110"
        >
          Past Events
        </Chip>
      </div>

      {/* Current Events Section */}
      <div id="current-events" className="mb-12">
        <div className="ml-[7%]">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Current Events</h2>
        </div>
        <div className="mt-6">
          {currentEvents.length > 0
            ? currentEvents.map(renderEventCard)
            : <p className="text-gray-400">No current events available.</p>}
        </div>
      </div>

      {/* Past Events Section */}
      <div id="past-events" className="mb-12">
        <div className="ml-[7%]">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Past Events</h2>
        </div>
        <div className="mt-6">
          {pastEvents.length > 0
            ? pastEvents.map(renderEventCard)
            : <p className="text-gray-400">No past events available.</p>}
        </div>
      </div>
    </div>
  );
}

export default Event;
