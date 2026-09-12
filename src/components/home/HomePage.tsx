import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { HeroSlider } from './HeroSlider';
import { CategorySection } from './CategorySection';
import { ProductGrid } from '../product/ProductGrid';
import { DemoCTA } from './DemoCTA';
import { AboutSection } from './AboutSection';
import { PRODUCTS } from '../../data/products';
import { useStore } from '../../store/useStore';

export const HomePage: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);

  // Curate 4 featured items for the homepage hero showcase
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  // Curate 4 new arrival items
  const newArrivals = PRODUCTS.filter((p) => !p.featured).slice(0, 4);

  return (
    <div className="w-full bg-[#0C1618]">
      {/* 1. FULL-BLEED HOMEPAGE HERO SLIDER (CRITICAL: 100% viewport width) */}
      <HeroSlider />

      {/* 2. VALUE PROPOSITIONS STRIP (Constrained to 1240px) */}
      <section className="w-full py-8 border-b border-[#1E373D]/60 bg-[#0C1618]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#122225]/40 border border-[#1E373D]/40">
              <Truck className="w-5 h-5 text-[#58C1C3] flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-[#F5F7F7]">Free Delivery</div>
                <div className="text-[11px] text-[#94AFB5]">On orders over ৳ 2,000</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#122225]/40 border border-[#1E373D]/40">
              <ShieldCheck className="w-5 h-5 text-[#97CC6F] flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-[#F5F7F7]">100% Authentic</div>
                <div className="text-[11px] text-[#94AFB5]">Crafted quality guarantee</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#122225]/40 border border-[#1E373D]/40">
              <RefreshCw className="w-5 h-5 text-[#58C1C3] flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-[#F5F7F7]">Easy Exchange</div>
                <div className="text-[11px] text-[#94AFB5]">7-day hassle-free policy</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#122225]/40 border border-[#1E373D]/40">
              <Sparkles className="w-5 h-5 text-[#97CC6F] flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-[#F5F7F7]">Digital Commerce</div>
                <div className="text-[11px] text-[#94AFB5]">High-speed performance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION (Constrained to 1240px) */}
      <section className="w-full py-12 sm:py-16 bg-[#0C1618]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#58C1C3]">
                Handpicked Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7F7] tracking-tight mt-1 font-['Space_Grotesk']">
                Featured Products
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#58C1C3] hover:text-[#97CC6F] transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Grid: 4 Desktop / 2 Mobile */}
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* 4. CATEGORY CARDS SECTION */}
      <CategorySection />

      {/* 5. REPEATED VIEW DEMO CTA (Variant: Laptop Preview) */}
      <DemoCTA variant="laptop-preview" />

      {/* 6. NEW ARRIVALS SPOTLIGHT */}
      <section className="w-full py-12 sm:py-16 bg-[#0C1618]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#97CC6F]">
                Fresh Releases
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7F7] tracking-tight mt-1 font-['Space_Grotesk']">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#58C1C3] hover:text-[#97CC6F] transition-colors"
            >
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Grid: 4 Desktop / 2 Mobile */}
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* 7. WHATSAPP FOCUS CTA */}
      <DemoCTA variant="whatsapp-focus" />

      {/* 8. ABOUT PLEXIVIA COMPACT AGENCY SECTION */}
      <AboutSection />

      {/* 9. FINAL VIEW DEMO CONVERSION CTA */}
      <DemoCTA variant="final-cta" />
    </div>
  );
};
