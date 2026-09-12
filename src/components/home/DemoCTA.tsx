import React from 'react';
import { DemoBookingButton } from '../common/DemoBookingButton';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { Laptop, Sparkles, Send } from 'lucide-react';

interface DemoCTAProps {
  variant: 'laptop-preview' | 'whatsapp-focus' | 'final-cta';
}

export const DemoCTA: React.FC<DemoCTAProps> = ({ variant }) => {
  if (variant === 'laptop-preview') {
    return (
      <section className="w-full py-10 sm:py-14 bg-[#0C1618]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#122225] to-[#15272B] border border-[#1E373D] p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-black/40">
            {/* Left Content */}
            <div className="max-w-xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#58C1C3]/10 border border-[#58C1C3]/30 text-[#58C1C3] text-[11px] font-bold tracking-wider uppercase mb-3">
                <Sparkles className="w-3 h-3" />
                <span>Client Architecture Demo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5F7F7] tracking-tight mb-3 font-['Space_Grotesk']">
                Want to See What We Can Build?
              </h3>
              <p className="text-sm sm:text-base text-[#94AFB5] leading-relaxed mb-6">
                Book a quick demo and explore how Plexivia can bring your ideas to life with high-performance digital stores and custom web platforms.
              </p>
              <DemoBookingButton size="md" label="View Demo" variant="glow" />
            </div>

            {/* Right Visual: Stylized Digital Device Showcase */}
            <div className="relative w-full md:w-auto flex-shrink-0 flex items-center justify-center">
              <div className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl bg-[#0C1618] border-2 border-[#1E373D] p-3 shadow-2xl overflow-hidden group">
                {/* Browser frame dots */}
                <div className="flex items-center gap-1.5 pb-2 border-b border-[#1E373D]/60 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="text-[10px] text-[#94AFB5] ml-2 font-mono">plexivia.com/showcase</span>
                </div>
                {/* Screen Preview */}
                <div className="w-full h-full rounded-lg bg-[#122225] p-2 flex flex-col gap-2">
                  <div className="w-full h-12 rounded bg-[#15272B] border border-[#58C1C3]/30 flex items-center px-3 justify-between">
                    <span className="text-[10px] font-bold text-[#58C1C3]">PLEXIVIA STORE</span>
                    <div className="w-12 h-3 rounded-full bg-[#58C1C3]/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="rounded bg-[#15272B] border border-[#1E373D]" />
                    <div className="rounded bg-[#15272B] border border-[#1E373D]" />
                  </div>
                </div>
                {/* Glow accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#58C1C3]/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'whatsapp-focus') {
    return (
      <section className="w-full py-8 sm:py-12 bg-[#0C1618]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#122225] border border-[#1E373D] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7F7] mb-1.5 font-['Space_Grotesk']">
                Have a Project in Mind?
              </h3>
              <p className="text-xs sm:text-sm text-[#94AFB5]">
                Let's talk about your business. We're here to help you turn digital dreams into reality.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <WhatsAppButton size="md" label="Chat on WhatsApp" variant="primary" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Final CTA near end
  return (
    <section className="w-full py-14 sm:py-20 bg-gradient-to-b from-[#0C1618] to-[#122225] border-t border-[#1E373D]/60">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl sm:text-4xl font-black text-[#F5F7F7] tracking-tight mb-3 font-['Space_Grotesk']">
          Ready to Build Something Great?
        </h3>
        <p className="text-sm sm:text-base text-[#94AFB5] max-w-xl mx-auto mb-8">
          Let's discuss your ideas and create a digital solution designed for your business.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <DemoBookingButton size="lg" label="View Demo" variant="glow" />
          <WhatsAppButton size="lg" label="Chat on WhatsApp" variant="pill" />
        </div>
      </div>
    </section>
  );
};
