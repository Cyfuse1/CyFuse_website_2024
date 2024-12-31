import { Chip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { fetchDataFromCollection } from './script'; // Import the fetchDataFromCollection function

async function fetchEventsData() {
  try {
    const data = await fetchDataFromCollection('events'); // Fetch 'events' collection
    console.log('Fetched Events Data:', data); // Log data to console
    return data;
  } catch (err) {
    console.error('Error fetching events:', err);
    throw new Error('Failed to load events.');
  }
}

function EventCard({ event, index }) {
  return (
    <div
      key={index}
      className="flex flex-col md:flex-row bg-gradient-to-br backdrop-blur-md rounded-xl p-6 md:p-12 mb-8 mx-4 border border-white transition-transform duration-300
        hover:scale-105 hover:brightness-125"
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
}

function Event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventsData()
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data); // Ensure data is an array
        } else {
          throw new Error('Unexpected data format');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Categorize events
  const inProgressEvents = events.filter(event => event.Status === 'In progress');
  const upcomingEvents = events.filter(event => event.Status === 'Upcoming');
  const completedEvents = events.filter(event => event.Status === 'Completed');

  return (
    <div className="relative bg-black text-white font-sans min-h-screen py-8 px-6 md:px-16">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-40 backdrop-blur-lg -z-10"></div>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">Events</h1>
        <h2 className="text-lg md:text-2xl mt-4">Explore our events</h2>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Chip onClick={() => document.getElementById('in-progress-events').scrollIntoView({ behavior: 'smooth' })}>
          In Progress
        </Chip>
        <Chip onClick={() => document.getElementById('upcoming-events').scrollIntoView({ behavior: 'smooth' })}>
          Upcoming
        </Chip>
        <Chip onClick={() => document.getElementById('completed-events').scrollIntoView({ behavior: 'smooth' })}>
          Completed
        </Chip>
      </div>

      <div id="in-progress-events" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">In Progress Events</h2>
        {inProgressEvents.length > 0
          ? inProgressEvents.map((event, index) => <EventCard key={index} event={event} index={index} />)
          : <p className="text-gray-400">No in-progress events available.</p>}
      </div>

      <div id="upcoming-events" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        {upcomingEvents.length > 0
          ? upcomingEvents.map((event, index) => <EventCard key={index} event={event} index={index} />)
          : <p className="text-gray-400">No upcoming events available.</p>}
      </div>

      <div id="completed-events" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Completed Events</h2>
        {completedEvents.length > 0
          ? completedEvents.map((event, index) => <EventCard key={index} event={event} index={index} />)
          : <p className="text-gray-400">No completed events available.</p>}
      </div>
    </div>
  );
}

export default Event;
