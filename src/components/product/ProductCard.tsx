import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-details', product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col justify-between bg-[#122225] border border-[#1E373D] hover:border-[#58C1C3]/60 rounded-2xl p-2.5 sm:p-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-[#58C1C3]/5"
    >
      {/* 
        CRITICAL CONSTRAINT: 1:1 Square Product Image.
        The product IMAGE itself is clickable and navigates to the dedicated Product Details page.
        NO Quick View feature!
      */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0C1618] cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          onClick={handleCardClick}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Wishlist Heart Button on top right */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-[#58C1C3] text-[#0C1618] shadow-md shadow-[#58C1C3]/40'
              : 'bg-[#0C1618]/60 text-[#94AFB5] hover:text-[#58C1C3] hover:bg-[#0C1618]/90'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="pt-3 sm:pt-4 flex flex-col flex-1 justify-between">
        {/* Product Name (Clickable) */}
        <h3
          onClick={handleCardClick}
          className="text-xs sm:text-sm font-semibold text-[#F5F7F7] group-hover:text-[#58C1C3] transition-colors line-clamp-1 cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Bottom Row: Price on Left, Add to Cart on Right */}
        <div className="flex items-center justify-between mt-2.5 sm:mt-3 pt-1 border-t border-[#1E373D]/50">
          <span className="text-xs sm:text-sm font-bold text-[#F5F7F7]">
            {product.priceFormatted}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] font-bold text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-[#58C1C3]/20 active:scale-95 cursor-pointer"
            aria-label={`Add ${product.name} to Cart`}
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden min-[380px]:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
