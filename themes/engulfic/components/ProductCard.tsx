import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/src/types';
import { useStore } from '@/src/store/useStore';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

// Renders an individual streetwear product card with image hover, wishlist toggling, and fast add-to-cart
export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { navigateTo, addToCart, toggleWishlist, isInWishlist } = useStore();

  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-details', product.id);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-neutral-900/90 rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-500/60 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer text-left h-full"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 block rounded-t-xl sm:rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
        />

        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-orange-600 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-md shadow-md">
            HOT
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleWishlistClick}
            className="p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all shadow-md border border-white/20 bg-black/50 text-white hover:bg-orange-500 cursor-pointer"
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-orange-500 text-orange-500' : 'text-white'}`} />
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickView}
              className="p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all shadow-md border border-white/20 bg-black/50 text-white hover:bg-orange-500 cursor-pointer opacity-0 group-hover:opacity-100"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-400 mb-1">
            <span className="truncate pr-1 uppercase tracking-wider font-mono">{product.category}</span>
            <div className="flex items-center gap-0.5 text-orange-400">
              <Star className="w-3 h-3 fill-orange-400" />
              <span className="font-bold text-[10px] sm:text-xs text-neutral-200">4.9</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight hover:text-orange-400 transition line-clamp-1 leading-snug uppercase font-sans">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-neutral-800 mt-auto">
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xs sm:text-sm md:text-base font-black text-white">
              {product.priceFormatted || `৳ ${product.price.toLocaleString()}`}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="p-1.5 sm:p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg sm:rounded-xl transition shadow-md flex items-center justify-center cursor-pointer border border-orange-400/30"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
