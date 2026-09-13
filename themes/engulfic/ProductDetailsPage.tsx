import React, { useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { ProductCard } from './components/ProductCard';

// Renders the single garment product detail page with sizing pills, gallery, specs, and related streetwear
export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setIsCartOpen,
  } = useStore();

  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Vintage Black');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="font-mono text-sm text-neutral-400">Garment not found.</p>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Vintage Black', hex: '#171717' },
    { name: 'Charcoal Wash', hex: '#262626' },
    { name: 'Mauve Pink', hex: '#834c5b' },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050505] text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left: Product Image Showcase */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/60 text-white hover:bg-orange-500 transition border border-white/20"
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-orange-500 text-orange-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Garment Information & Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-orange-500 uppercase tracking-widest font-bold">
                  {product.category} ARCHIVE
                </span>
                <div className="flex items-center gap-1 text-orange-400">
                  <Star className="w-4 h-4 fill-orange-400" />
                  <span className="font-bold text-white">4.9 / 5.0</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {product.priceFormatted || `৳ ${product.price.toLocaleString()}`}
                </span>
                <span className="text-xs text-neutral-400">
                  (VAT Inclusive • Standard Delivery)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {product.description ||
                  'Constructed with meticulous attention to detail using heavyweight 300GSM organic cotton. Cut with an architectural drop shoulder silhouette that drapes naturally without losing structural form.'}
              </p>

              {/* Size Selector */}
              <div className="space-y-2 pt-3 border-t border-neutral-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase text-neutral-300 font-bold">Size: {selectedSize}</span>
                  <span className="text-orange-400 hover:underline cursor-pointer">Size Guide</span>
                </div>
                <div className="flex items-center gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-10 min-w-10 px-3 rounded-xl text-xs font-mono font-bold transition border cursor-pointer ${
                        selectedSize === s
                          ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2 pt-3 border-t border-neutral-800">
                <div className="text-xs font-mono uppercase text-neutral-300 font-bold">
                  Color Shade: {selectedColor}
                </div>
                <div className="flex items-center gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full transition-all border-2 ${
                        selectedColor === c.name
                          ? 'border-orange-500 scale-110'
                          : 'border-transparent hover:border-neutral-500'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 text-neutral-300 hover:text-white font-mono font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 text-neutral-300 hover:text-white font-mono font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-black uppercase tracking-wider text-xs rounded-xl transition border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingCart className="w-4 h-4 text-orange-500" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 cursor-pointer"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-[10px] text-neutral-400 font-mono text-center">
                <div className="flex flex-col items-center gap-1 p-2 bg-neutral-900/60 rounded-xl border border-neutral-800/60">
                  <Truck className="w-4 h-4 text-orange-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-neutral-900/60 rounded-xl border border-neutral-800/60">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-neutral-900/60 rounded-xl border border-neutral-800/60">
                  <RotateCcw className="w-4 h-4 text-orange-500" />
                  <span>7 Days Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans">
                SIMILAR RUNWAY PIECES
              </h2>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-mono text-orange-500 hover:text-orange-400 uppercase font-bold"
              >
                View Catalog
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
