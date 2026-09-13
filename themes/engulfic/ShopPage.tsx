import React, { useState, useMemo } from 'react';
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { Product } from '@/src/types';

// Renders the Engulfic catalog archive with category pills, piece counters, search, and sorting
export const ShopPage: React.FC = () => {
  const { products, selectedCategory, navigateTo } = useStore();
  const [currentCategory, setCurrentCategory] = useState<string>(selectedCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = ['All', 'Tshirts', 'Bags', 'Wallet', 'Keychains'];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (currentCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, currentCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#050505] text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-500 uppercase tracking-widest font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARCHIVE COLLECTION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
              FULL PRODUCT CATALOG
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
              Explore all signature Engulfic garments, heavyweights, and streetwear essentials.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-2xl text-xs font-mono">
            <span className="text-orange-500 font-bold">{filteredProducts.length}</span>
            <span className="text-neutral-400">Pieces Available</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setCurrentCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition border whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-orange-500 text-white border-orange-400 shadow-md'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 font-mono text-sm space-y-2">
            <p>No garments match your current filter criteria.</p>
            <button
              onClick={() => {
                setCurrentCategory('All');
                setSearchQuery('');
              }}
              className="text-orange-500 underline text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
