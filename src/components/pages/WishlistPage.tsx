import React from 'react';
import { Heart, Trash2, ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PRODUCTS } from '../../data/products';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useStore();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#94AFB5] mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigateTo('home')} className="hover:text-[#58C1C3]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F5F7F7] font-semibold">Wishlist</span>
        </nav>

        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#58C1C3] hover:text-[#97CC6F] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#F5F7F7] tracking-tight font-['Space_Grotesk']">
              Your Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#94AFB5] mt-1">
              Saved items to review or purchase later
            </p>
          </div>
          <span className="text-xs font-bold text-[#58C1C3] px-3 py-1 bg-[#122225] border border-[#1E373D] rounded-full">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#122225] border border-[#1E373D] rounded-3xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#15272B] border border-[#1E373D] flex items-center justify-center text-[#94AFB5] mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#F5F7F7] mb-1">Your wishlist is empty</h3>
            <p className="text-xs text-[#94AFB5] mb-6">
              Browse the store and tap the heart icon on any product to save it here.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-2.5 bg-[#58C1C3] text-[#0C1618] font-bold text-xs rounded-full hover:bg-[#97CC6F] transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#122225] border border-[#1E373D] rounded-2xl p-4 flex gap-4 items-center group hover:border-[#58C1C3]/60 transition-all"
              >
                {/* 1:1 image */}
                <div
                  onClick={() => navigateTo('product-details', product.id)}
                  className="w-24 h-24 rounded-xl overflow-hidden bg-[#0C1618] flex-shrink-0 cursor-pointer"
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#58C1C3]">{product.category}</span>
                  <h3
                    onClick={() => navigateTo('product-details', product.id)}
                    className="text-sm font-semibold text-[#F5F7F7] truncate cursor-pointer hover:text-[#58C1C3]"
                  >
                    {product.name}
                  </h3>
                  <div className="text-xs font-bold text-[#97CC6F] mt-1">{product.priceFormatted}</div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3 py-1.5 rounded-lg bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-1.5 rounded-lg bg-[#15272B] hover:bg-red-500/20 text-[#94AFB5] hover:text-red-400 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
