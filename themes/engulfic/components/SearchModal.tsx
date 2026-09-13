import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Renders the quick search modal allowing instantaneous garment filtering by name and category
export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products, navigateTo } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const results = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigateTo('product-details', productId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-orange-500 shrink-0" />
          <input
            type="text"
            placeholder="Search streetwear by name, cut, or collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm font-sans focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {searchTerm.trim() && results.length === 0 && (
            <p className="text-center py-8 text-xs font-mono text-neutral-500">
              No garments found matching "{searchTerm}".
            </p>
          )}

          {!searchTerm.trim() && (
            <div className="py-6 px-2 text-xs font-mono text-neutral-400 space-y-2">
              <p className="uppercase tracking-widest text-neutral-500 font-bold text-[10px]">
                Popular Inquiries:
              </p>
              <div className="flex flex-wrap gap-2">
                {['T-Shirt', 'Sweatshirt', 'Baggy Pants', 'Graphic', 'Heavyweight'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-orange-500 hover:text-white transition text-xs cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelectProduct(product.id)}
              className="p-3 rounded-xl hover:bg-neutral-800/80 transition flex items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-14 object-cover rounded-lg bg-black shrink-0"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-orange-400 transition">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    {product.category} • {product.priceFormatted || `৳ ${product.price}`}
                  </p>
                </div>
              </div>

              <div className="p-2 rounded-full bg-neutral-800 group-hover:bg-orange-500 text-neutral-400 group-hover:text-white transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
