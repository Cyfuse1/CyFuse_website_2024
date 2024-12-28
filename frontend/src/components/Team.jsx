import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchCollectionData } from "./script"; // Assuming Firebase functions are in a separate file

function Team() {
  const [teamData, setTeamData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch team data from Firestore
    fetchCollectionData("Teams")
      .then((data) => {
        const structuredData = data.reduce((acc, member) => {
          acc[member.team] = acc[member.team] || [];
          acc[member.team].push({ name: member.name, photo: member.photo });
          return acc;
        }, {});
        setTeamData(structuredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching team data:", err);
        setError("Failed to fetch team data.");
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

  return (
    <div
      ref={ref}
      className={`px-8 md:px-16 py-12 ${
        inView ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold border-b border-white pb-2 mb-6 capitalize">
        {section.replace(/([A-Z])/g, " $1")}
      </h2>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-gray-700 aspect-square flex flex-col items-center justify-center text-center p-4 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <p className="text-lg font-medium">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
