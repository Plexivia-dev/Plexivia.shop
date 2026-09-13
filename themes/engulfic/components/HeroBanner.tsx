import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

interface HeroBannerProps {
  onExploreClick?: () => void;
}

// Renders the main streetwear runway hero banner with touch-slide gestures, auto-timer, and pagination
export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const { siteConfig, navigateTo } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const defaultSlides = [
    {
      title: 'STREETWEAR ARCHIVE 2026',
      subtitle: 'Heavyweight organic drop shoulder tees & tailored silhouettes.',
      badge: 'NEW DROP • URBAN EDITION',
      imageUrl: '/themes/engulfic/hero-banner.jpg',
      ctaText: 'SHOP THE DROP',
    },
    {
      title: 'LUXURY FRENCH TERRY HOODIES',
      subtitle: 'Architectural oversized cuts with premium comfort & durability.',
      badge: 'LIMITED RELEASE',
      imageUrl: '/themes/engulfic/lookbook.jpg',
      ctaText: 'EXPLORE HOODIES',
    },
  ];

  const configSlides = siteConfig?.banners?.heroBanners?.filter((b) => b.imageUrl) || [];
  const slides = configSlides.length > 0 ? configSlides : defaultSlides;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
  };

  const scrollPrev = () => {
    resetTimer();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollNext = () => {
    resetTimer();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      scrollNext();
    } else if (distance < -50) {
      scrollPrev();
    }
  };

  return (
    <section
      className="relative overflow-hidden w-full aspect-[4/3] sm:aspect-[16/9] md:h-[560px] lg:h-[680px] bg-neutral-950 text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title || 'Runway Slide'}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl space-y-3 sm:space-y-4">
                  {slide.badge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" />
                      <span>{slide.badge}</span>
                    </div>
                  )}

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight font-sans">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-base text-neutral-300 font-light max-w-lg">
                    {slide.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => navigateTo('shop')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 border border-orange-400/40"
                    >
                      <span>{slide.ctaText || 'Shop Collection'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {onExploreClick && (
                      <button
                        onClick={onExploreClick}
                        className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition backdrop-blur-md border border-white/20"
                      >
                        Explore Categories
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/20 pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    resetTimer();
                    setCurrentSlide(i);
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'w-6 sm:w-10 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]'
                      : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-white/80 tracking-widest font-bold">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-orange-500 text-white border border-white/20 transition backdrop-blur-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-orange-500 text-white border border-white/20 transition backdrop-blur-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
