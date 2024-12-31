import { Chip } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
function Event() {
  const navigate = useNavigate();
  const [inProgressEvents, setInProgressEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events...'); // Log when fetch starts
        const response = await axios.get('http://localhost:1000/api/getData'); // Fetch data from the API endpoint
        const events = response.data; // Get the data from the response
        console.log('Fetched Events Data:', events); // Log the fetched data

        if (!Array.isArray(events)) {
          console.error('Fetched data is not an array:', events);
          return;
        }

        // Filter events based on their status
        const inProgress = events.filter(event => event.Status === 'In progress');
        const completed = events.filter(event => event.Status === 'Completed');
        const upcoming = events.filter(event => event.Status === 'Upcoming');

        // Set state for the respective event categories
        setInProgressEvents(inProgress);
        setCompletedEvents(completed);
        setUpcomingEvents(upcoming);
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

      {/* Chips for navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <Chip
          color="warning"
          variant="bordered"
          onClick={() => handleChipClick('in-progress-events')}
          className="cursor-pointer border-white text-white hover:scale-110"
        >
          In Progress
        </Chip>
        <Chip
          color="warning"
          variant="bordered"
          onClick={() => handleChipClick('upcoming-events')}
          className="cursor-pointer border-white text-white hover:scale-110"
        >
          Upcoming
        </Chip>
        <Chip
          color="warning"
          variant="bordered"
          onClick={() => handleChipClick('completed-events')}
          className="cursor-pointer border-white text-white hover:scale-110"
        >
          Completed
        </Chip>
      </div>

      {/* In Progress Events Section */}
      <div id="in-progress-events" className="mb-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">In Progress Events</h2>
        <div>
          {inProgressEvents.length > 0
            ? inProgressEvents.map(renderEventCard)
            : <p className="text-gray-400">No in-progress events available.</p>}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div id="upcoming-events" className="mb-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Upcoming Events</h2>
        <div>
          {upcomingEvents.length > 0
            ? upcomingEvents.map(renderEventCard)
            : <p className="text-gray-400">No upcoming events available.</p>}
        </div>
      </div>

      {/* Completed Events Section */}
      <div id="completed-events" className="mb-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Completed Events</h2>
        <div>
          {completedEvents.length > 0
            ? completedEvents.map(renderEventCard)
            : <p className="text-gray-400">No completed events available.</p>}
        </div>
      </div>
    </div>
  );
}

export default Event;
