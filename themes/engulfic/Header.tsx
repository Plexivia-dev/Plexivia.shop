import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

interface HeaderProps {
  onOpenSearch?: () => void;
}

// Renders Engulfic high-fashion navbar with top marquee announcement bar and mobile drawer
export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const {
    activePage,
    navigateTo,
    getCartItemCount,
    setIsCartOpen,
    wishlist,
    siteConfig,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = getCartItemCount();
  const wishlistCount = wishlist.length;

  const navItems = [
    { label: 'HOME', page: 'home' as const },
    { label: 'SHOP', page: 'shop' as const },
    { label: 'OFFERS', page: 'offers' as const },
    { label: 'ABOUT', page: 'about' as const },
    { label: 'CONTACT', page: 'contact' as const },
  ];

  const handleNavClick = (page: any) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-neutral-800 transition-colors">
      {/* Top Marquee Announcement Bar */}
      <div className="bg-orange-600 text-white text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase overflow-hidden py-1.5 flex items-center">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> FREE SHIPPING ON ORDERS OVER ৳ 2,000 NATIONWIDE
          </span>
          <span>•</span>
          <span>AUTUMN / WINTER 2026 CURATED DROP IS LIVE</span>
          <span>•</span>
          <span>AUTHENTIC HEAVYWEIGHT STREETWEAR CRAFTED IN BANGLADESH</span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> CASH ON DELIVERY AVAILABLE IN ALL 64 DISTRICTS
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu Button & Brand Name */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-white hover:text-orange-500 lg:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <img
                src={siteConfig?.branding?.logoUrl || '/themes/engulfic/logo.webp'}
                alt="ENGULFIC"
                className="h-8 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black uppercase tracking-widest text-white font-sans group-hover:text-orange-500 transition-colors">
                  ENGULFIC
                </span>
                <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">
                  Urban Luxury Apparel
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono font-bold tracking-widest uppercase text-neutral-300">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`transition-colors py-1 relative cursor-pointer ${
                  activePage === item.page
                    ? 'text-orange-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500'
                    : 'hover:text-orange-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="p-2 text-neutral-300 hover:text-orange-500 rounded-full hover:bg-neutral-800 transition cursor-pointer"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-neutral-300 hover:text-orange-500 rounded-full hover:bg-neutral-800 transition relative cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 text-white hover:text-orange-500 rounded-xl transition relative flex items-center gap-2 cursor-pointer shadow-md"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-mono font-bold hidden sm:inline">
                CART ({cartCount})
              </span>
              {cartCount > 0 && (
                <span className="sm:hidden absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3 text-sm font-mono font-bold tracking-wider uppercase text-white">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left py-2 border-b border-neutral-800/60 ${
                  activePage === item.page ? 'text-orange-500' : 'text-neutral-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
