import React, { useState } from 'react';
import { X, ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from '@/src/types';
import { useStore } from '@/src/store/useStore';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

// Renders an interactive quick preview modal for rapid garment inspection and instant cart addition
export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, navigateTo } = useStore();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleViewFullDetails = () => {
    onClose();
    navigateTo('product-details', product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-orange-500 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-1/2 aspect-[4/5] bg-black relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono uppercase tracking-wider text-orange-500 font-bold">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-orange-400">
                <Star className="w-3.5 h-3.5 fill-orange-400" />
                <span className="font-bold text-white">4.9 (128 reviews)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans">
              {product.name}
            </h2>

            <div className="font-mono">
              <span className="text-2xl font-black text-white">
                {product.priceFormatted || `৳ ${product.price.toLocaleString()}`}
              </span>
            </div>

            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              {product.description || 'Premium streetwear silhouette crafted from organic heavyweight cotton with reinforced stitching.'}
            </p>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono font-bold uppercase text-neutral-300">
                Select Size
              </label>
              <div className="flex items-center gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-9 h-9 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition border ${
                      selectedSize === s
                        ? 'bg-orange-500 text-white border-orange-400 shadow-md'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-xl px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-white hover:text-orange-500 font-mono font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 text-white hover:text-orange-500 font-mono font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-wider text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            <button
              onClick={handleViewFullDetails}
              className="w-full text-center text-xs font-mono text-neutral-400 hover:text-orange-400 underline transition cursor-pointer"
            >
              View Full Garment Specifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
