import React, { useState } from 'react';
import { Tag, Sparkles, Truck, Copy, Check, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

// Renders seasonal promotional discounts, coupon codes, and shipping incentives
export const OffersPage: React.FC = () => {
  const { navigateTo, showNotification, addToCart } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showNotification(`Promo code ${code} copied!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const offers = [
    {
      code: 'PLEXIVIA10',
      title: '10% Welcome Discount',
      description: 'Enjoy 10% off your entire first demo purchase across any bags, wallets, keychains or tshirts.',
      badge: 'POPULAR',
      expiry: 'Valid for current demo session',
    },
    {
      code: 'FREESHIP2K',
      title: 'Free Express Shipping',
      description: 'Automatic free nationwide delivery on all orders exceeding ৳ 2,000.',
      badge: 'AUTOMATIC',
      expiry: 'Always active on orders ৳ 2,000+',
    },
    {
      code: 'BUNDLEDUO',
      title: 'Couple Tshirt Combo Perks',
      description: 'Get an exclusive matching bundle price on the Couple Tshirt Pair with free gift wrapping.',
      badge: 'SPECIAL',
      expiry: 'Limited demo inventory',
    },
  ];

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#94AFB5] mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigateTo('home')} className="hover:text-[#58C1C3]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F5F7F7] font-semibold">Special Offers</span>
        </nav>

        <div className="mb-8 text-left">
          <span className="text-xs uppercase tracking-widest text-[#58C1C3] font-bold">
            Curated Deals & Perks
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F5F7F7] tracking-tight mt-1 font-['Space_Grotesk']">
            Exclusive Store Promotions
          </h1>
          <p className="text-xs sm:text-sm text-[#94AFB5] mt-1">
            Real e-commerce bundle promotions and discount mechanisms built for modern conversions.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {offers.map((offer) => (
            <div
              key={offer.code}
              className="bg-[#122225] border border-[#1E373D] hover:border-[#58C1C3]/60 rounded-2xl p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#58C1C3]/15 text-[#58C1C3] border border-[#58C1C3]/30">
                    {offer.badge}
                  </span>
                  <Tag className="w-4 h-4 text-[#94AFB5]" />
                </div>

                <h3 className="text-lg font-bold text-[#F5F7F7] mb-2">{offer.title}</h3>
                <p className="text-xs text-[#94AFB5] leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              <div>
                <div className="p-3 bg-[#15272B] rounded-xl border border-[#1E373D] flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-[#58C1C3]">{offer.code}</span>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="p-1.5 rounded-lg hover:bg-[#1E373D] text-[#94AFB5] hover:text-[#F5F7F7] transition-colors"
                    title="Copy code"
                  >
                    {copiedCode === offer.code ? (
                      <Check className="w-4 h-4 text-[#97CC6F]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <span className="text-[11px] text-[#94AFB5]">{offer.expiry}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Promotion Product Feature */}
        <div className="bg-gradient-to-r from-[#122225] to-[#15272B] border border-[#1E373D] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#58C1C3]/20 flex items-center justify-center text-[#58C1C3] flex-shrink-0">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#F5F7F7]">Free Delivery Nationwide</h4>
              <p className="text-xs text-[#94AFB5]">
                Order ৳ 2,000 or more to qualify for complimentary courier delivery across Bangladesh.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 rounded-full bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <span>Shop Qualified Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
