import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Renders curated apparel category showcase grid with hover effects and shop filtering
export const CategoryGrid: React.FC = () => {
  const { navigateTo } = useStore();

  const curatedCategories: CategoryItem[] = [
    {
      id: 't-shirts',
      name: 'T-Shirts',
      image: '/themes/engulfic/T-shirt.webp',
      description: 'Heavyweight oversized drop shoulder tees in 300GSM organic cotton.',
    },
    {
      id: 'sweatshirts',
      name: 'Sweatshirts',
      image: '/themes/engulfic/sweatshirt.webp',
      description: 'Relaxed fit architectural silhouettes in premium French terry.',
    },
    {
      id: 'pants',
      name: 'Pants',
      image: '/themes/engulfic/pant.webp',
      description: 'Signature baggy cut trousers with tailored drape and comfort.',
    },
    {
      id: 'shirts',
      name: 'Shirts',
      image: '/themes/engulfic/shirt.webp',
      description: 'Contemporary oversized and casual shirts in Italian cotton poplin.',
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    navigateTo('shop', undefined, categoryName);
  };

  return (
    <section id="categories-section" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-500 mb-1.5 uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>CURATED ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
              SIGNATURE CATEGORIES
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-md font-mono">
            Explore our signature collections tailored from heavy French terry, Italian cotton poplin, and 300GSM organic jersey.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {curatedCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative block h-[220px] sm:h-[320px] md:h-[400px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 shadow-xl hover:border-orange-500/60 transition-all duration-500 flex flex-col justify-end p-4 sm:p-6 cursor-pointer bg-neutral-900"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base sm:text-2xl font-black text-white uppercase tracking-wider font-sans group-hover:text-orange-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-neutral-300 line-clamp-1 mt-0.5 hidden sm:block font-light">
                      {cat.description}
                    </p>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-orange-500 text-white rounded-full transition-all duration-300 shadow-xl flex-shrink-0">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
