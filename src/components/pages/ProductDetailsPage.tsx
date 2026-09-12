import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Minus, Plus, ShoppingBag, Heart, Check, Share2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PRODUCTS } from '../../data/products';

export const ProductDetailsPage: React.FC = () => {
  const {
    selectedProductId,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showNotification,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);

  // Fallback to first product if none selected
  const product =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showNotification('Product link copied to clipboard!');
    }
  };

  // Thumbnail variations based on primary 1:1 image
  const thumbnails = [
    product.image,
    // Complementary angle / detail representation
    `${product.image}&sat=10`,
  ];

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-[#94AFB5] mb-6 sm:mb-8" aria-label="Breadcrumb">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-[#58C1C3] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateTo('shop')}
            className="hover:text-[#58C1C3] transition-colors"
          >
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F5F7F7] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Back to Shop Link */}
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#58C1C3] hover:text-[#97CC6F] mb-6 sm:mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        {/* Product Details Layout: Desktop 2-column, Mobile Image First */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* LEFT: 1:1 Square Product Image & Gallery */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#122225] border border-[#1E373D] shadow-2xl">
              <img
                src={thumbnails[selectedThumb] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#15272B]/80 border border-[#58C1C3]/30 text-[#58C1C3] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center gap-3">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedThumb(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedThumb === idx
                      ? 'border-[#58C1C3] shadow-md shadow-[#58C1C3]/20'
                      : 'border-[#1E373D] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image thumbnail ${idx + 1}`}
                >
                  <img
                    src={thumb}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Information & Purchase Controls */}
          <div className="text-left space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#58C1C3]">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-[#F5F7F7] tracking-tight mt-1 font-['Space_Grotesk']">
                {product.name}
              </h1>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F7F7] mt-3">
                {product.priceFormatted}
              </div>
            </div>

            <div className="h-px bg-[#1E373D]" />

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94AFB5]">
                Quantity:
              </label>
              <div className="inline-flex items-center rounded-xl bg-[#122225] border border-[#1E373D] p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center text-[#94AFB5] hover:text-[#F5F7F7] disabled:opacity-40 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-[#F5F7F7]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-[#94AFB5] hover:text-[#F5F7F7] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart (Primary Cyan) & Add to Wishlist */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-3.5 px-6 bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-[#58C1C3]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full sm:w-auto py-3.5 px-5 rounded-xl border font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#58C1C3]/20 border-[#58C1C3] text-[#58C1C3]'
                    : 'bg-[#122225] border-[#1E373D] text-[#94AFB5] hover:text-[#F5F7F7] hover:border-[#58C1C3]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#58C1C3]' : ''}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-xl bg-[#122225] border border-[#1E373D] text-[#94AFB5] hover:text-[#F5F7F7] hover:border-[#58C1C3] transition-colors hidden sm:flex"
                title="Share product"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Product Details & Specifications */}
            <div className="bg-[#122225] border border-[#1E373D] rounded-2xl p-5 space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#F5F7F7]">
                Product Details
              </h3>
              <p className="text-sm text-[#94AFB5] leading-relaxed">
                {product.description}
              </p>

              {product.features && product.features.length > 0 && (
                <div className="pt-2 border-t border-[#1E373D]/60 space-y-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#F5F7F7]">
                      <Check className="w-3.5 h-3.5 text-[#58C1C3] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Demo Booking banner */}
            <div className="p-4 rounded-xl bg-[#15272B] border border-[#1E373D] flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#58C1C3] uppercase block">
                  Custom E-Commerce Development
                </span>
                <p className="text-xs text-[#94AFB5]">
                  Need a bespoke shop like this built for your brand?
                </p>
              </div>
              <button
                onClick={() => useStore.getState().setIsCalendarModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#58C1C3] text-[#0C1618] text-xs font-bold hover:bg-[#97CC6F] transition-colors whitespace-nowrap"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
