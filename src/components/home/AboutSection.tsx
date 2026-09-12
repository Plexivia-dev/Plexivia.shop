import React from 'react';
import { ArrowRight, Code2, Sparkles, Layers } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AboutSection: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);

  return (
    <section className="w-full py-12 sm:py-16 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-[#122225] border border-[#1E373D] rounded-3xl p-6 sm:p-10">
          {/* Left: Curated Product / Workspace Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0C1618] border border-[#1E373D]">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
              alt="Plexivia Craftsmanship"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1618]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#15272B]/90 border border-[#58C1C3]/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#58C1C3]">
                <Code2 className="w-4 h-4 text-[#97CC6F]" />
                <span>Modern Web Architecture Demo</span>
              </div>
            </div>
          </div>

          {/* Right: Focused Brand Content */}
          <div className="text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#58C1C3] font-bold block mb-2">
              About Plexivia
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5F7F7] tracking-tight mb-4 font-['Space_Grotesk']">
              Crafting Digital Dreams
            </h2>
            <p className="text-sm sm:text-base text-[#94AFB5] leading-relaxed mb-6 font-normal">
              We create modern websites and digital solutions that help businesses stand out, attract customers, and grow faster. Every interface is designed with precision, aesthetic harmony, and seamless interaction.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#58C1C3]/20 flex items-center justify-center text-[#58C1C3] flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-sm text-[#F5F7F7]">
                  High-end e-commerce experiences with fluid responsive layouts
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#97CC6F]/20 flex items-center justify-center text-[#97CC6F] flex-shrink-0 mt-0.5">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-sm text-[#F5F7F7]">
                  Tailored web applications combining cutting-edge performance and clean code
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('about')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15272B] hover:bg-[#1E373D] border border-[#58C1C3]/50 text-[#F5F7F7] hover:text-[#58C1C3] text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
