import React from "react";

const teamData = {
  coordinators: [
    { name: "Coordinator 1", photo: "coordinator1.jpg" },
    { name: "Coordinator 2", photo: "coordinator2.jpg" },
    { name: "Coordinator 3", photo: "coordinator3.jpg" },
    { name: "Coordinator 4", photo: "coordinator4.jpg" },
  ],
  leads: [
    { name: "Lead 1", photo: "lead1.jpg" },
    { name: "Lead 2", photo: "lead2.jpg" },
    { name: "Lead 3", photo: "lead3.jpg" },
    { name: "Lead 4", photo: "lead4.jpg" },
  ],
  creativeTeam: [
    { name: "Creative 1", photo: "creative1.jpg" },
    { name: "Creative 2", photo: "creative2.jpg" },
    { name: "Creative 3", photo: "creative3.jpg" },
    { name: "Creative 4", photo: "creative4.jpg" },
  ],
  webDevTeam: [
    { name: "Web Dev 1", photo: "webdev1.jpg" },
    { name: "Web Dev 2", photo: "webdev2.jpg" },
    { name: "Web Dev 3", photo: "webdev3.jpg" },
    { name: "Web Dev 4", photo: "webdev4.jpg" },
  ],
  operationsTeam: [
    { name: "Operations 1", photo: "operations1.jpg" },
    { name: "Operations 2", photo: "operations2.jpg" },
    { name: "Operations 3", photo: "operations3.jpg" },
    { name: "Operations 4", photo: "operations4.jpg" },
  ],
  
};

function Team() {
  return (
    <div className="bg-black text-white font-sans min-h-screen">
      {/* Heading */}
      <div className="text-center py-12">
        <h1 className="text-8xl font-bold">Meet the Team</h1>
        <p className="mt-4 text-lg">
          We believe in investing in people and forming meaningful bonds
        </p>
      </div>

      {/* Render Each Section Dynamically */}
      {Object.entries(teamData).map(([section, members]) => (
        <div key={section} className="px-8 md:px-16 py-12">
          {/* Section Heading */}
          <h2 className="text-2xl font-semibold border-b border-white pb-2 mb-6 capitalize">
            {section.replace(/([A-Z])/g, " $1")}
          </h2>
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-gray-700 aspect-square flex flex-col items-center justify-center text-center p-4"
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
      ))}
    </div>
  );
}

export default Team;
