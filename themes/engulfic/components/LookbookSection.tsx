import React from 'react';
import { Sparkles, ShoppingCart } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { Product } from '@/src/types';

interface LookbookSectionProps {
  onQuickView?: (product: Product) => void;
}

// Renders the interactive runway editorial lookbook with clickable product hotspots
export const LookbookSection: React.FC<LookbookSectionProps> = ({ onQuickView }) => {
  const { products, navigateTo } = useStore();

  const featuredPiece1 = products[0] || {
    id: 'lookbook-1',
    name: 'Oversized Trench Parka',
    price: 3250,
    priceFormatted: '৳ 3,250',
    category: 'Tshirts' as any,
    image: '/themes/engulfic/shirt.webp',
    description: 'Structured cotton blend outerwear with geometric cutouts.',
    inStock: true,
  };

  const featuredPiece2 = products[1] || {
    id: 'lookbook-2',
    name: 'Heavyweight Graphic Tee',
    price: 1450,
    priceFormatted: '৳ 1,450',
    category: 'Tshirts' as any,
    image: '/themes/engulfic/T-shirt.webp',
    description: '300GSM drop shoulder street garment.',
    inStock: true,
  };

  const featuredPiece3 = products[2] || {
    id: 'lookbook-3',
    name: 'Tailored Baggy Cargo',
    price: 2100,
    priceFormatted: '৳ 2,100',
    category: 'Bags' as any,
    image: '/themes/engulfic/pant.webp',
    description: 'Signature architectural drape trouser.',
    inStock: true,
  };

  const handleHotspotClick = (product: Product) => {
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigateTo('product-details', product.id);
    }
  };

  return (
    <section id="lookbook" className="bg-[#050505] py-14 sm:py-20 border-t border-neutral-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-orange-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>INTERACTIVE RUNWAY EDITORIAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            SHOP THE <span className="text-orange-500">CURATED</span> LOOK
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
            Hover or click over the runway hotspots below to inspect and shop individual garments directly from the autumn collection showcase.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-[16/9] sm:aspect-[21/9] shadow-2xl">
          <img
            src="/themes/engulfic/lookbook.jpg"
            alt="Fashion Lookbook Showcase"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />

          {/* Hotspot 1: Upper Left */}
          <div className="absolute top-[35%] left-[28%] group z-20">
            <button
              onClick={() => handleHotspotClick(featuredPiece1)}
              className="relative w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-xl animate-bounce hover:animate-none hover:scale-125 transition-transform border border-orange-400/50 cursor-pointer"
              title={featuredPiece1.name}
            >
              <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
              <ShoppingCart className="w-4 h-4 z-10" />
            </button>

            <div className="absolute left-11 top-0 hidden group-hover:flex flex-col bg-black/90 border border-neutral-700 p-3.5 rounded-2xl w-52 backdrop-blur-xl shadow-2xl z-30">
              <p className="text-xs font-bold text-white line-clamp-1">{featuredPiece1.name}</p>
              <p className="text-[10px] text-orange-400 font-mono mt-0.5">{featuredPiece1.priceFormatted || `৳ ${featuredPiece1.price}`}</p>
              <button
                onClick={() => handleHotspotClick(featuredPiece1)}
                className="mt-2 py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] uppercase rounded-lg transition-colors cursor-pointer"
              >
                Inspect Piece
              </button>
            </div>
          </div>

          {/* Hotspot 2: Center Right */}
          <div className="absolute top-[50%] left-[64%] group z-20">
            <button
              onClick={() => handleHotspotClick(featuredPiece2)}
              className="relative w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-xl hover:scale-125 transition-transform border border-orange-400/50 cursor-pointer"
              title={featuredPiece2.name}
            >
              <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
              <ShoppingCart className="w-4 h-4 z-10" />
            </button>

            <div className="absolute right-11 top-0 hidden group-hover:flex flex-col bg-black/90 border border-neutral-700 p-3.5 rounded-2xl w-52 backdrop-blur-xl shadow-2xl z-30">
              <p className="text-xs font-bold text-white line-clamp-1">{featuredPiece2.name}</p>
              <p className="text-[10px] text-orange-400 font-mono mt-0.5">{featuredPiece2.priceFormatted || `৳ ${featuredPiece2.price}`}</p>
              <button
                onClick={() => handleHotspotClick(featuredPiece2)}
                className="mt-2 py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] uppercase rounded-lg transition-colors cursor-pointer"
              >
                Inspect Piece
              </button>
            </div>
          </div>

          {/* Hotspot 3: Bottom Center */}
          <div className="absolute top-[75%] left-[48%] group z-20">
            <button
              onClick={() => handleHotspotClick(featuredPiece3)}
              className="relative w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-xl hover:scale-125 transition-transform border border-orange-400/50 cursor-pointer"
              title={featuredPiece3.name}
            >
              <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
              <ShoppingCart className="w-4 h-4 z-10" />
            </button>

            <div className="absolute left-11 top-0 hidden group-hover:flex flex-col bg-black/90 border border-neutral-700 p-3.5 rounded-2xl w-52 backdrop-blur-xl shadow-2xl z-30">
              <p className="text-xs font-bold text-white line-clamp-1">{featuredPiece3.name}</p>
              <p className="text-[10px] text-orange-400 font-mono mt-0.5">{featuredPiece3.priceFormatted || `৳ ${featuredPiece3.price}`}</p>
              <button
                onClick={() => handleHotspotClick(featuredPiece3)}
                className="mt-2 py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] uppercase rounded-lg transition-colors cursor-pointer"
              >
                Inspect Piece
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-xs font-mono text-neutral-300 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-neutral-800">
            <span>RUNWAY LOOK #04 • AUTUMN 2026</span>
            <span className="hidden sm:inline text-orange-400 font-bold">3 GARMENTS FEATURED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
