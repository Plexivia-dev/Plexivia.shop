import React from 'react';
import { useStore } from '../../store/useStore';

// Displays top promotional announcement bar with dynamic message and brand indicator
export const AnnouncementBar: React.FC = () => {
  const siteConfig = useStore((state) => state.siteConfig);
  const promo = siteConfig?.banners?.promoBanner;
  const siteName = siteConfig?.general?.siteName || 'PLEXIVIA';

  if (promo && promo.enabled === false) {
    return null;
  }

  const badge = promo?.badge || '⚡ Special Launch Offer';
  const text = promo?.text || 'Free shipping on orders over ৳ 2,000';

  return (
    <div className="w-full bg-[#122225] border-b border-[#1E373D]/80 text-[#94AFB5] text-[11px] sm:text-xs py-2 px-4 transition-colors">
      <div className="max-w-[1240px] mx-auto flex items-center justify-center sm:justify-between text-center font-medium">
        <div className="flex items-center justify-center gap-2 sm:gap-6 flex-wrap">
          <span className="font-semibold text-[var(--color-plexivia-green,#97CC6F)]">{badge}</span>
          <span className="hidden sm:inline text-[#1E373D]">•</span>
          <span className="hover:text-[var(--color-plexivia-cyan,#58C1C3)] transition-colors">{text}</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px]">
          <span className="text-[var(--color-plexivia-cyan,#58C1C3)] font-semibold tracking-wider uppercase">
            {siteName} STORE
          </span>
        </div>
      </div>
    </div>
  );
};
