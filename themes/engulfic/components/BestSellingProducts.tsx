import React, { useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { ProductCard } from './ProductCard';
import { Product } from '@/src/types';

interface BestSellingProductsProps {
  onQuickView?: (product: Product) => void;
}

// Renders the best selling products section with category tab filtering and responsive product grid
export const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ onQuickView }) => {
  const { products, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Tshirts', 'Bags', 'Wallet', 'Keychains'];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category.toLowerCase() === activeTab.toLowerCase();
  }).slice(0, 4);

  return (
    <section id="bestsellers-section" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8 space-y-2.5">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-500 uppercase tracking-widest font-bold justify-center">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>MOST COVETED GARMENTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
          BEST SELLING PRODUCTS
        </h2>
      </div>

      <div className="hidden sm:flex items-center justify-center gap-2.5 mb-8 w-full max-w-3xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
              activeTab === tab
                ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)] scale-105'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex sm:hidden items-center justify-between gap-4 mb-6">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="bg-neutral-900 text-white border border-neutral-800 rounded-xl px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider focus:outline-none focus:border-orange-500"
        >
          {tabs.map((tab) => (
            <option key={tab} value={tab} className="bg-neutral-900 text-white">
              {tab}
            </option>
          ))}
        </select>

        <button
          onClick={() => navigateTo('shop')}
          className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-orange-500 hover:text-orange-400 tracking-wider"
        >
          <span>See More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
