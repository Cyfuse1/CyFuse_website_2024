import { useHover } from './Hover';

export const ProfileCard = ({ profile }) => {
  const [cardRef, isHovered] = useHover();
  const themeColor = profile.themeColor || '#06b6d4';
  const themeColorHalf = `${themeColor}77`;
  const themeColorLow = `${themeColor}22`;

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 ease-in-out max-w-xs w-full h-[420px]"
      style={{
        background: '#0d1117',
        border: `1px solid ${isHovered ? themeColor : themeColorLow}`,
        boxShadow: isHovered ? `0 0 25px ${themeColorLow}, 0 0 60px ${themeColorLow}` : '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={profile.imageUrl}
          alt={profile.name}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            filter: isHovered ? 'brightness(0.45) saturate(0.8)' : 'brightness(0.7) saturate(0.9)',
          }}
        />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
          }}
        />

        {/* Gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: isHovered
              ? 'linear-gradient(to top, #0d1117 40%, rgba(13,17,23,0.7) 70%, rgba(13,17,23,0.2) 100%)'
              : 'linear-gradient(to top, #0d1117 30%, rgba(13,17,23,0.2) 70%, transparent 100%)',
          }}
        />

        {/* HUD corner brackets (top-left) */}
        <div
          className="absolute top-3 left-3 w-5 h-5 pointer-events-none transition-opacity duration-300"
          style={{
            borderTop: `2px solid ${themeColorHalf}`,
            borderLeft: `2px solid ${themeColorHalf}`,
            opacity: isHovered ? 1 : 0.4,
          }}
        />
        <div
          className="absolute bottom-3 right-3 w-5 h-5 pointer-events-none transition-opacity duration-300"
          style={{
            borderBottom: `2px solid ${themeColorHalf}`,
            borderRight: `2px solid ${themeColorHalf}`,
            opacity: isHovered ? 1 : 0.4,
          }}
        />
      </div>

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ease-in-out flex flex-col items-center text-center"
        style={{ transform: isHovered ? 'translateY(0)' : 'translateY(0)' }}
      >
        <h2
          className="text-white text-xl font-bold mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {profile.name}
        </h2>

        {/* Description / quote — only on hover */}
        <p
          className="text-sm mb-4 transition-all duration-300"
          style={{
            color: '#94a3b8',
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.6',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {profile.description}
        </p>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-4 transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: themeColor,
                textDecoration: 'none',
                border: `1px solid ${themeColorHalf}`,
                padding: '2px 8px',
                borderRadius: '4px',
                background: `${themeColor}0D`,
              }}
              onMouseEnter={e => {
                e.target.style.background = `${themeColor}26`;
                e.target.style.borderColor = themeColor;
              }}
              onMouseLeave={e => {
                e.target.style.background = `${themeColor}0D`;
                e.target.style.borderColor = themeColorHalf;
              }}
            >
              LinkedIn
            </a>
          )}
          {profile.instagram && (
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: '#e879f9',
                textDecoration: 'none',
                border: '1px solid rgba(232,121,249,0.3)',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(232,121,249,0.05)',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(232,121,249,0.15)';
                e.target.style.borderColor = 'rgba(232,121,249,0.6)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(232,121,249,0.05)';
                e.target.style.borderColor = 'rgba(232,121,249,0.3)';
              }}
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
};