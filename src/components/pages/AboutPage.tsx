import React from 'react';
import { ChevronRight, Sparkles, Terminal, Palette, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { DemoBookingButton } from '../common/DemoBookingButton';
import { WhatsAppButton } from '../common/WhatsAppButton';

export const AboutPage: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#94AFB5] mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigateTo('home')} className="hover:text-[#58C1C3]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F5F7F7] font-semibold">About Us</span>
        </nav>

        {/* Hero Banner */}
        <div className="mb-12 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#58C1C3]/10 border border-[#58C1C3]/30 text-[#58C1C3] text-[11px] font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3 h-3 text-[#97CC6F]" />
            <span>Digital Development Agency</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F7F7] tracking-tight font-['Space_Grotesk'] leading-tight mb-4">
            PLEXIVIA – Crafting Digital Dreams
          </h1>
          <p className="text-base sm:text-lg text-[#94AFB5] leading-relaxed">
            We build bespoke web applications, modern e-commerce systems, and high-performance digital platforms that help brands grow and leave lasting impressions.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#122225] border border-[#1E373D] rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#58C1C3]/20 flex items-center justify-center text-[#58C1C3] mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F5F7F7] mb-2">Precision Engineering</h3>
            <p className="text-xs text-[#94AFB5] leading-relaxed">
              Every interface is crafted with clean modular architecture, optimal load speeds, and rock-solid state management.
            </p>
          </div>

          <div className="bg-[#122225] border border-[#1E373D] rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#97CC6F]/20 flex items-center justify-center text-[#97CC6F] mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F5F7F7] mb-2">Modern Visual Aesthetics</h3>
            <p className="text-xs text-[#94AFB5] leading-relaxed">
              Minimalist, brand-aligned color palettes, mathematical typography hierarchy, and deliberate micro-interactions.
            </p>
          </div>

          <div className="bg-[#122225] border border-[#1E373D] rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#58C1C3]/20 flex items-center justify-center text-[#58C1C3] mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F5F7F7] mb-2">Conversion Focused</h3>
            <p className="text-xs text-[#94AFB5] leading-relaxed">
              Designed from the ground up to turn visitors into buyers with frictionless navigation and direct booking actions.
            </p>
          </div>
        </div>

        {/* Interactive Strategy Call Banner */}
        <div className="bg-[#122225] border border-[#1E373D] rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7F7] mb-3 font-['Space_Grotesk']">
            Ready to bring your digital vision to life?
          </h2>
          <p className="text-sm text-[#94AFB5] mb-8">
            Schedule a 1-on-1 walkthrough with our development team to discuss your project requirements.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <DemoBookingButton size="lg" label="View Demo" variant="glow" />
            <WhatsAppButton size="lg" label="Chat on WhatsApp" variant="pill" />
          </div>
        </div>
      </div>
    </div>
  );
};
