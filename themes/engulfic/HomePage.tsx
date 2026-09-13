import React, { useState } from 'react';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { BestSellingProducts } from './components/BestSellingProducts';
import { LookbookSection } from './components/LookbookSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuickViewModal } from './components/QuickViewModal';
import { Product } from '@/src/types';

// Assembles the complete Engulfic landing page with hero slider, curated collections, lookbook, and reviews
export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleScrollToCategories = () => {
    const el = document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Background Ambient Lighting Orbs */}
      <div className="fixed top-24 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 left-10 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Hero Banner Slider */}
      <HeroBanner onExploreClick={handleScrollToCategories} />

      {/* Signature Category Cards */}
      <CategoryGrid />

      {/* Best Selling Products */}
      <BestSellingProducts onQuickView={(p) => setQuickViewProduct(p)} />

      {/* Interactive Runway Lookbook Showcase */}
      <LookbookSection onQuickView={(p) => setQuickViewProduct(p)} />

      {/* Customer Community Reviews */}
      <TestimonialsSection />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
