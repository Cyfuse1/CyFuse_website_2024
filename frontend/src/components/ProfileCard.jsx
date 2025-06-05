import { CheckCircle } from 'lucide-react';
import { useHover } from './Hover';

export const ProfileCard = ({ profile }) => {
  const [cardRef, isHovered] = useHover();

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden bg-gray-900 rounded-2xl shadow-xl transition-all duration-500 ease-in-out max-w-xs w-full h-[440px]"
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={profile.imageUrl}
          alt={profile.name}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content Container */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ease-in-out ${
          isHovered ? 'translate-y-0 bg-transparent' : 'bg-gray-900'
        }`}
      >
        <div className="flex items-center mb-2">
          <h2 className="text-white text-2xl font-bold mr-2">{profile.name}</h2>
          {profile.verified && (
            <CheckCircle className="w-5 h-5 text-green-400" fill="currentColor" />
          )}
        </div>
        <p className="text-gray-300 mb-4">{profile.description}</p>
        <div className="flex items-center justify-end gap-4">
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-lg"
            >
              LinkedIn
            </a>
          )}
          {profile.instagram && (
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:underline text-lg"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
};