import React, { useState, useEffect } from 'react';
import { getDynamicLogoUrl, apiGetLogoInfo } from '../../services/api';
import { useStore } from '../../store/useStore';

interface PlexiviaLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

// Renders the dynamic tenant logo or brand title with graceful SVG fallback
export const PlexiviaLogo: React.FC<PlexiviaLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  onClick,
}) => {
  const siteConfig = useStore((state) => state.siteConfig);
  const [logoUrl, setLogoUrl] = useState(() => getDynamicLogoUrl());
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (siteConfig?.branding?.logoUrl) {
      setLogoUrl(siteConfig.branding.logoUrl);
      setImageError(false);
      return;
    }

    apiGetLogoInfo().then((info) => {
      if (info?.logoUrl) {
        setLogoUrl(info.logoUrl);
        setImageError(false);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const ver = customEvent.detail?.timestamp || Date.now();
      try {
        localStorage.setItem('brand_logo_version', String(ver));
      } catch {}
      setLogoUrl(getDynamicLogoUrl());
      setImageError(false);
    };

    window.addEventListener('brand-logo-updated', handleUpdate);
    return () => window.removeEventListener('brand-logo-updated', handleUpdate);
  }, [siteConfig]);

  const iconSize = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const imgHeight = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-10' : 'h-8';

  const siteName = siteConfig?.general?.siteName || 'PLEXIVIA';
  const tagline = siteConfig?.general?.tagline || 'Crafting Digital Dreams';
  const shouldShowTagline = showTagline && (siteConfig?.branding?.showTagline !== false);

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center cursor-pointer select-none group transition-opacity hover:opacity-90 ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`${siteName} Home`}
    >
      {!imageError && logoUrl ? (
        <div className="flex items-center gap-2">
          <img
            src={logoUrl}
            alt={siteName}
            className={`${imgHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:scale-105"
          >
            <path d="M4 7L16 2L16 16L4 21V7Z" fill="var(--color-plexivia-green, #97CC6F)" fillOpacity="0.95" />
            <path d="M16 2L28 7V21L16 26V16L28 11" fill="var(--color-plexivia-cyan, #58C1C3)" />
            <path d="M16 16L28 21L16 30L4 21L16 16Z" fill="var(--color-plexivia-cyan, #58C1C3)" fillOpacity="0.4" />
            <circle cx="16" cy="16" r="2.5" fill="var(--color-plexivia-white, #F5F7F7)" />
          </svg>

          <span
            className={`font-black tracking-[0.18em] text-[#F5F7F7] ${textSize} uppercase font-['Space_Grotesk']`}
          >
            {siteName}
          </span>
        </div>
      )}

      {shouldShowTagline && (
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#94AFB5] font-medium mt-0.5">
          {tagline}
        </span>
      )}
    </div>
  );
};
