import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#122225] border-b border-[#1E373D]/80 text-[#94AFB5] text-[11px] sm:text-xs py-2 px-4 transition-colors">
      <div className="max-w-[1240px] mx-auto flex items-center justify-center sm:justify-between text-center font-medium">
        <div className="flex items-center justify-center gap-2 sm:gap-6 flex-wrap">
          <span className="hover:text-[#58C1C3] transition-colors">Free shipping on orders over ৳ 2,000</span>
          <span className="hidden sm:inline text-[#1E373D]">•</span>
          <span className="hidden sm:inline hover:text-[#58C1C3] transition-colors">Premium quality products</span>
          <span className="hidden sm:inline text-[#1E373D]">•</span>
          <span className="hidden sm:inline hover:text-[#58C1C3] transition-colors">New arrivals</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px]">
          <span className="text-[#58C1C3] font-semibold">PLEXIVIA DEMO STORE</span>
        </div>
      </div>
    </div>
  );
};
