import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { useStore } from '../../store/useStore';
import { ProductCategory } from '../../types';

export const CategorySection: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);

  const handleSelectCategory = (categoryId: ProductCategory) => {
    navigateTo('shop', undefined, categoryId);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7F7] tracking-tight font-['Space_Grotesk']">
            Shop by Category
          </h2>
          <p className="text-sm text-[#94AFB5] mt-1">
            Find what matches your style
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group cursor-pointer rounded-2xl bg-[#122225] border border-[#1E373D] hover:border-[#58C1C3]/60 p-3.5 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#58C1C3]/5 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* 1:1 Aspect Ratio Category Thumbnail */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0C1618] mb-3 sm:mb-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1618]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Text & Action */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#F5F7F7] group-hover:text-[#58C1C3] transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#58C1C3] group-hover:text-[#97CC6F] mt-1 transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
