import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchDataFromCollection } from './script'; // Import the fetchDataFromCollection function

async function fetchTeamData() {
  try {
    const data = await fetchDataFromCollection('team_details'); // Fetch 'team' collection
    console.log('Fetched Team Data:', data); // Log data to console
    return data;
  } catch (err) {
    console.error('Error fetching team:', err);
    throw new Error('Failed to load team.');
  }
}

function Team() {
  const [teamData, setTeamData] = useState({
    events: [],
    prAndContent: [],
    creatives: [],
    development: [],
    coordinators: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData()
      .then((data) => {
        if (Array.isArray(data)) {
          // Map data to the corresponding team arrays
            const categorizedData = data.reduce((acc, member) => {
            // Get the team name from the 'team_name' field
            const team = member.team_name.toLowerCase();
            
            // Categorize members based on the team_name field
            switch (team) {
              case 'coordinators':
              acc.coordinators.push({
                name: member.Name,
                photo: member.Picture, // Assuming 'Picture' is the URL
                linkedin: member.Linkedin,
                quote: member.Quote,
              });
              break;
              // case 'development':
              // acc.development.push({
              //   name: member.Name,
              //   photo: member.Picture,
              //   linkedin: member.Linkedin,
              //   quote: member.Quote,
              // });
              // break;
              // case 'creatives':
              // acc.creatives.push({
              //   name: member.Name,
              //   photo: member.Picture,
              //   linkedin: member.Linkedin,
              //   quote: member.Quote,
              // });
              // break;
              // case 'pr and content':
              // acc.prAndContent.push({
              //   name: member.Name,
              //   photo: member.Picture,
              //   linkedin: member.Linkedin,
              //   quote: member.Quote,
              // });
              // break;
              // case 'events':
              // acc.events.push({
              //   name: member.Name,
              //   photo: member.Picture,
              //   linkedin: member.Linkedin,
              //   quote: member.Quote,
              // });
              // break;
              default:
              break;
            }
            return acc;
            }, {
            coordinators: [],
            // development: [],
            // creatives: [],
            // prAndContent: [],
            // events: [],
            });

          setTeamData(categorizedData);
        } else {
          throw new Error('Unexpected data format');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-black text-white font-sans min-h-screen">
      {/* Heading */}
      <div className="text-center py-12">
        <h1 className="text-8xl font-bold animate-fade-in">Meet the Team</h1>
        <p className="mt-4 text-lg animate-slide-down">
          We believe in investing in people and forming meaningful bonds
        </p>
      </div>

      {/* Render Each Section Dynamically */}
      {Object.entries(teamData).map(([section, members]) => (
        <TeamSection key={section} section={section} members={members} />
      ))}
    </div>
  );
}

const TeamSection = ({ section, members }) => {
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the section is visible
    triggerOnce: false, // Animate only once
  });

  // Capitalizing first letter for each section name
  const sectionName = section.replace(/([A-Z])/g, ' $1').toUpperCase();

  return (
    <div
      ref={ref}
      className={`px-8 md:px-16 py-12 ${
        inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold border-b border-white pb-2 mb-6 capitalize">
        {sectionName}
      </h2>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-gray-700 aspect-square flex flex-col items-center justify-center text-center p-4 transition-transform duration-300 hover:scale-105"
          >
          <img
  src={member.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXBfhC-QlgM4DmR6VXrznFyXdNwytV9-SOMw&s"}
  alt={member.name}
  className="w-20 h-20 rounded-full object-cover mb-4"
/>


            <p className="text-lg font-medium">{member.name}</p>

            {/* Quote */}
            {member.quote && (
              <p className="text-sm italic text-gray-400 mt-2">{`"${member.quote}"`}</p>
            )}

            {/* LinkedIn */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 hover:underline"
              >
                LinkedIn Profile
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
