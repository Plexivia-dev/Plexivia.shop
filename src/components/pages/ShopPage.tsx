import React, { useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PRODUCTS } from '../../data/products';
import { ProductGrid } from '../product/ProductGrid';
import { ProductCategory } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    selectedCategory,
    searchQuery,
    navigateTo,
  } = useStore();

  const [localSearch, setLocalSearch] = React.useState(searchQuery);
  const [activeFilter, setActiveFilter] = React.useState<string>(selectedCategory || 'All');

  const categories = ['All', 'Bags', 'Wallet', 'Keychains', 'Tshirts'];

  // Sync if store category changed
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveFilter(selectedCategory);
    }
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCat =
        activeFilter === 'All' || product.category === (activeFilter as ProductCategory);
      const matchSearch =
        localSearch.trim() === '' ||
        product.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(localSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeFilter, localSearch]);

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#94AFB5] mb-6" aria-label="Breadcrumb">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-[#58C1C3] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F5F7F7] font-semibold">Shop</span>
          {activeFilter !== 'All' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#58C1C3] font-semibold">{activeFilter}</span>
            </>
          )}
        </nav>

        {/* Page Title */}
        <div className="mb-6 sm:mb-8 text-left">
          <h1 className="text-2xl sm:text-4xl font-black text-[#F5F7F7] tracking-tight font-['Space_Grotesk']">
            Shop All Products
          </h1>
          <p className="text-xs sm:text-sm text-[#94AFB5] mt-1">
            Find your favorite items from our curated collections
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94AFB5]" />
          <input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#122225] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl text-sm text-[#F5F7F7] placeholder-[#94AFB5]/70 transition-colors"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94AFB5] hover:text-[#F5F7F7]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#58C1C3] text-[#0C1618] shadow-md shadow-[#58C1C3]/30'
                    : 'bg-[#122225] text-[#94AFB5] border border-[#1E373D] hover:border-[#58C1C3]/50 hover:text-[#F5F7F7]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Count & Results */}
        <div className="flex items-center justify-between text-xs text-[#94AFB5] mb-6">
          <span>Showing {filteredProducts.length} of 15 products</span>
          {activeFilter !== 'All' && (
            <span className="text-[#58C1C3]">Filtered by: {activeFilter}</span>
          )}
        </div>

        {/* Product Grid: Desktop 4-col, Tablet 2-3 col, Mobile 2-col */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="py-16 text-center bg-[#122225] border border-[#1E373D] rounded-2xl p-8">
            <p className="text-base text-[#F5F7F7] font-semibold mb-2">
              No products found matching "{localSearch}"
            </p>
            <p className="text-xs text-[#94AFB5] mb-4">
              Try searching for Tote Bag, Wallet, Kuromi, or Keychain.
            </p>
            <button
              onClick={() => {
                setLocalSearch('');
                setActiveFilter('All');
              }}
              className="px-5 py-2 bg-[#58C1C3] text-[#0C1618] font-bold text-xs rounded-full hover:bg-[#97CC6F] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
