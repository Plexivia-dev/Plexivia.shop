import React from 'react';

interface PlexiviaLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const PlexiviaLogo: React.FC<PlexiviaLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  onClick,
}) => {
  const iconSize = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center cursor-pointer select-none group transition-opacity hover:opacity-90 ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Plexivia Home"
    >
      <div className="flex items-center gap-2">
        {/* Geometric Plexivia Emblem */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Green facet (#97CC6F) */}
          <path
            d="M4 7L16 2L16 16L4 21V7Z"
            fill="#97CC6F"
            fillOpacity="0.95"
          />
          {/* Cyan facet (#58C1C3) */}
          <path
            d="M16 2L28 7V21L16 26V16L28 11"
            fill="#58C1C3"
          />
          {/* Bottom connecting geometric edge */}
          <path
            d="M16 16L28 21L16 30L4 21L16 16Z"
            fill="#58C1C3"
            fillOpacity="0.4"
          />
          <circle cx="16" cy="16" r="2.5" fill="#F5F7F7" />
        </svg>

        {/* Brand Text */}
        <span
          className={`font-black tracking-[0.18em] text-[#F5F7F7] ${textSize} uppercase font-['Space_Grotesk']`}
        >
          PLEX<span className="text-[#58C1C3]">IVIA</span>
        </span>
      </div>

      {showTagline && (
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#94AFB5] font-medium mt-0.5">
          Crafting Digital Dreams
        </span>
      )}
    </div>
  );
};
