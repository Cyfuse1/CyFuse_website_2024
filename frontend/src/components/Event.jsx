import { Chip } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const currentEvents = [
  { 
    title: 'Tech Conference 2023', 
    description: 'Join us for the annual Tech Conference where industry leaders discuss the latest trends in technology.' 
  },
  { 
    title: 'AI Workshop', 
    description: 'A hands-on workshop on Artificial Intelligence and Machine Learning, led by experts in the field.' 
  },
];

const pastEvents = [
  { 
    title: 'Hackathon 2022', 
    description: 'A 48-hour hackathon where participants developed innovative solutions to real-world problems.' 
  },
  { 
    title: 'Robotics Expo', 
    description: 'An exhibition showcasing the latest advancements in robotics and automation.' 
  },
];

function Event() {
  const navigate = useNavigate();

  const handleChipClick = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderEventCard = (event, index) => (
    <div 
      key={index} 
      className="flex flex-col md:flex-row bg-gradient-to-br backdrop-blur-md rounded-full p-6 md:p-12 mb-8 mx-4 border border-white"
    >
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
        <img 
          src={event.image || 'https://via.placeholder.com/150'} 
          alt={event.title} 
          className="w-full md:w-48 h-auto rounded-full object-cover" 
        />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
        <p className="text-gray-300">{event.description}</p>
      </div>
    </div>
  );

  return (
    <div className="relative bg-black text-white font-sans min-h-screen py-8 px-6 md:px-16">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-40 backdrop-blur-lg -z-10"></div>

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">Events</h1>
        <h2 className="text-lg md:text-2xl mt-4">Explore our events</h2>
      </div>

      {/* Chips to Redirect to Current and Past Events */}
      <div className="flex justify-center gap-4 mb-8">
        <Chip
          color="warning"
          variant="bordered"
          onClick={() => handleChipClick('current-events')}
          className="cursor-pointer border-white text-white"
        >
          Current Events
        </Chip>
        <Chip
          color="warning"
          variant="bordered"
          onClick={() => handleChipClick('past-events')}
          className="cursor-pointer border-white text-white"
        >
          Past Events
        </Chip>
      </div>

      {/* Current Events Section */}
      <div id="current-events" className="mb-12">
        <div className="ml-[7%]">

        
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Current Events</h2>
        <div className="flex flex-wrap gap-4">
          {currentEvents.map((event, index) => (
            <Chip
              key={index}
              color="warning"
              variant="bordered"
              onClick={() => handleChipClick(event.title)}
              className="cursor-pointer border-white text-white"
            >
              {event.title}
            </Chip>
          ))}
        </div>
        </div>
        <div className="mt-6">
          {currentEvents.map(renderEventCard)}
        </div>
      </div>

      {/* Past Events Section */}
      <div id="past-events" className="mb-12">
      <div className="ml-[7%]">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Past Events</h2>
        <div className="flex flex-wrap gap-4">
          {pastEvents.map((event, index) => (
            <Chip
              key={index}
              color="warning"
              variant="bordered"
              onClick={() => handleChipClick(event.title)}
              className="cursor-pointer border-white text-white"
            >
              {event.title}
            </Chip>
          ))}
        </div>
        </div>
        <div className="mt-6">
          {pastEvents.map(renderEventCard)}
        </div>
      </div>
    </div>
  );
}

export default Event;
