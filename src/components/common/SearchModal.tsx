import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useStore();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-[#122225] border border-[#1E373D] rounded-2xl p-5 shadow-2xl shadow-black/60"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-4 right-4 text-[#94AFB5] hover:text-[#F5F7F7] p-2 rounded-full hover:bg-[#1E373D]/50"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#1E373D] pb-3 pr-10">
          <Search className="w-5 h-5 text-[#58C1C3]" />
          <input
            type="text"
            placeholder="Search products (e.g., Tote Bag, Wallet, Kuromi, Tshirt)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-[#F5F7F7] placeholder-[#94AFB5] focus:outline-none"
          />
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2">
          {query.trim() === '' ? (
            <div className="py-6 text-center text-xs text-[#94AFB5]">
              Type a product name from our 15 curated items
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#94AFB5]">
              No products found for "{query}".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateTo('product-details', product.id);
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#15272B] cursor-pointer transition-colors border border-transparent hover:border-[#1E373D]"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#0C1618] flex-shrink-0 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#F5F7F7] truncate">{product.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#94AFB5]">
                    <span className="text-[#58C1C3]">{product.category}</span>
                    <span>•</span>
                    <span className="text-[#97CC6F] font-medium">{product.priceFormatted}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#94AFB5]" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
