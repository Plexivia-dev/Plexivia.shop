import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../../data/products';
import { DemoBookingButton } from '../common/DemoBookingButton';
import { useStore } from '../../store/useStore';

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const navigateTo = useStore((state) => state.navigateTo);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto advance slides every 6 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
  };

  const handlePrev = () => {
    resetTimer();
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    resetTimer();
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Bespoke slide content data matching mockups
  const slidesData = [
    {
      badge: 'NEW ARRIVALS 2026',
      title: 'Style Meets Everyday Essentials',
      subtitle:
        'Discover unique bags, wallets, keychains and t-shirts crafted for your lifestyle with effortless modern minimalism.',
      image:
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80',
    },
    {
      badge: 'DIGITAL CRAFTSMANSHIP',
      title: 'Precision Design For Modern Living',
      subtitle:
        'Engineered with immaculate aesthetic balance, tactile materials, and forward-thinking digital commerce experiences.',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80',
    },
    {
      badge: 'PLEXIVIA DEMO PLATFORM',
      title: 'Crafting Next-Gen E-Commerce',
      subtitle:
        'Experience responsive fluid layouts, instant Gemini AI shopping assistance, and seamless Google Calendar scheduling.',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  return (
    <section
      id="hero-slider-section"
      className="relative w-full overflow-hidden bg-[#0C1618] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Homepage Hero Carousel"
    >
      {/* 
        CRITICAL CONSTRAINT: FULL-BLEED container with FIXED EXACT HEIGHT across all slides.
        Height is explicitly identical: h-[480px] sm:h-[540px] md:h-[600px] lg:h-[650px]
      */}
      <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[650px]">
        {slidesData.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background with Dark Subtle Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Dark Vignette & Brand Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C1618] via-[#0C1618]/85 to-[#0C1618]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1618] via-transparent to-transparent" />
                {/* Subtle Cyan / Green atmospheric glow */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#58C1C3]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 right-10 w-96 h-96 bg-[#97CC6F]/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Slide Content Container (constrained to 1240px inside the full-width viewport) */}
              <div className="relative h-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
                <div className="max-w-2xl text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15272B]/80 border border-[#58C1C3]/30 text-[#58C1C3] text-[11px] font-bold tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#97CC6F] animate-pulse" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Heading */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F7F7] tracking-tight leading-[1.1] mb-4 sm:mb-6 font-['Space_Grotesk']">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-lg text-[#94AFB5] leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
                    {slide.subtitle}
                  </p>

                  {/* Action CTAs */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Primary: VIEW DEMO Button */}
                    <DemoBookingButton
                      size="lg"
                      label="View Demo"
                      variant="primary"
                    />

                    {/* Secondary: Shop Now */}
                    <button
                      id="hero-shop-now-btn"
                      onClick={() => navigateTo('shop')}
                      className="px-7 py-3.5 rounded-full border border-[#1E373D] hover:border-[#58C1C3] bg-[#122225]/80 hover:bg-[#15272B] text-[#F5F7F7] font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="w-4 h-4 text-[#58C1C3]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous & Next Chevron Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#122225]/80 hover:bg-[#58C1C3] border border-[#1E373D] hover:border-[#58C1C3] text-[#F5F7F7] hover:text-[#0C1618] flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#122225]/80 hover:bg-[#58C1C3] border border-[#1E373D] hover:border-[#58C1C3] text-[#F5F7F7] hover:text-[#0C1618] flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Navigation Indicator Dots */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slidesData.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                resetTimer();
                setCurrentIndex(dotIdx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex
                  ? 'w-8 bg-[#58C1C3]'
                  : 'w-2 bg-[#1E373D] hover:bg-[#94AFB5]'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
