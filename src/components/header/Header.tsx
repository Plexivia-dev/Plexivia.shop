import React from 'react';
import {
  Search,
  User,
  LogIn,
  ShoppingBag,
  Heart,
  Menu,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PlexiviaLogo } from '../common/PlexiviaLogo';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileDrawer } from './MobileDrawer';
import { PageView } from '../../types';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    isLoggedIn,
    setIsProfileOpen,
    setIsSearchOpen,
    setIsCartOpen,
    setIsMobileMenuOpen,
    getCartItemCount,
    wishlist,
  } = useStore();

  const cartCount = getCartItemCount();
  const wishlistCount = wishlist.length;

  const navLinks: Array<{ page: PageView; label: string }> = [
    { page: 'home', label: 'Home' },
    { page: 'shop', label: 'Shop' },
    { page: 'offers', label: 'Offers' },
    { page: 'about', label: 'About' },
    { page: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0C1618]/95 backdrop-blur-md border-b border-[#1E373D]/80">
      {/* LEVEL 1: Announcement Bar */}
      <AnnouncementBar />

      {/* LEVEL 2: Main Header Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP HEADER (Hidden on mobile/tablet < 1024px) */}
        <div className="hidden lg:grid grid-cols-3 items-center py-4.5 border-b border-[#1E373D]/40">
          {/* LEFT: Profile & Search */}
          <div className="flex items-center gap-4 justify-start">
            <button
              id="desktop-header-profile"
              onClick={() => setIsProfileOpen(true)}
              className="p-2 text-[#94AFB5] hover:text-[#58C1C3] transition-colors rounded-full hover:bg-[#122225] relative"
              aria-label={isLoggedIn ? 'View Profile' : 'Login'}
              title={isLoggedIn ? 'Account Profile' : 'Sign In'}
            >
              {isLoggedIn ? (
                <div className="relative">
                  <User className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#97CC6F]" />
                </div>
              ) : (
                <LogIn className="w-5 h-5" />
              )}
            </button>

            <button
              id="desktop-header-search"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#94AFB5] hover:text-[#58C1C3] transition-colors rounded-full hover:bg-[#122225]"
              aria-label="Search products"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* CENTER: Plexivia Logo */}
          <div className="flex items-center justify-center">
            <PlexiviaLogo
              size="md"
              showTagline={false}
              onClick={() => navigateTo('home')}
            />
          </div>

          {/* RIGHT: Wishlist & Cart */}
          <div className="flex items-center gap-4 justify-end">
            <button
              id="desktop-header-wishlist"
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-[#94AFB5] hover:text-[#58C1C3] transition-colors rounded-full hover:bg-[#122225] relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#58C1C3] text-[#0C1618] text-[10px] font-extrabold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="desktop-header-cart"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#94AFB5] hover:text-[#58C1C3] transition-colors rounded-full hover:bg-[#122225] relative"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#58C1C3] text-[#0C1618] text-[10px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE & TABLET HEADER (< 1024px) */}
        <div className="flex lg:hidden items-center justify-between py-3.5">
          {/* LEFT: Hamburger Menu */}
          <button
            id="mobile-header-hamburger"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-[#94AFB5] hover:text-[#F5F7F7] rounded-lg hover:bg-[#15272B] transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* CENTER: Plexivia Logo */}
          <PlexiviaLogo
            size="sm"
            onClick={() => navigateTo('home')}
          />

          {/* RIGHT: Cart Icon */}
          <button
            id="mobile-header-cart"
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-[#94AFB5] hover:text-[#58C1C3] transition-colors rounded-full relative"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#58C1C3] text-[#0C1618] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* LEVEL 3: Desktop Navigation Menu */}
        <div className="hidden lg:flex items-center justify-center py-2.5">
          <nav className="flex items-center gap-8">
            {navLinks.map(({ page, label }) => {
              const isActive = activePage === page;
              return (
                <button
                  key={page}
                  id={`nav-link-${page}`}
                  onClick={() => navigateTo(page)}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#58C1C3] font-semibold'
                      : 'text-[#94AFB5] hover:text-[#F5F7F7]'
                  }`}
                >
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#58C1C3] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer />
    </header>
  );
};
