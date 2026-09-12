import React from 'react';
import {
  X,
  Search,
  Heart,
  User,
  Home,
  ShoppingBag,
  Sparkles,
  Info,
  Phone,
  Calendar,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PlexiviaLogo } from '../common/PlexiviaLogo';
import { PageView } from '../../types';

export const MobileDrawer: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activePage,
    navigateTo,
    setIsSearchOpen,
    setIsProfileOpen,
    setIsCalendarModalOpen,
    wishlist,
    isLoggedIn,
    user,
  } = useStore();

  if (!isMobileMenuOpen) return null;

  const handleNav = (page: PageView) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  const navItems: Array<{ page: PageView; label: string; icon: React.ReactNode }> = [
    { page: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { page: 'shop', label: 'Shop', icon: <ShoppingBag className="w-4 h-4" /> },
    { page: 'offers', label: 'Offers', icon: <Sparkles className="w-4 h-4" /> },
    { page: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { page: 'contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div
        className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#0C1618] border-r border-[#1E373D] p-6 flex flex-col justify-between shadow-2xl z-10 transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-[#1E373D]">
            <PlexiviaLogo
              size="sm"
              onClick={() => {
                handleNav('home');
              }}
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#94AFB5] hover:text-[#F5F7F7] rounded-lg hover:bg-[#15272B] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Actions (Search, Wishlist, Profile) */}
          <div className="py-4 border-b border-[#1E373D] space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#122225] border border-[#1E373D] text-sm text-[#94AFB5] hover:text-[#58C1C3] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#58C1C3]" />
                <span>Search Products</span>
              </span>
              <kbd className="text-[10px] bg-[#15272B] px-1.5 py-0.5 rounded border border-[#1E373D]">
                Search
              </kbd>
            </button>

            <button
              onClick={() => {
                handleNav('wishlist');
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#122225] border border-[#1E373D] text-sm text-[#94AFB5] hover:text-[#58C1C3] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[#58C1C3]" />
                <span>Wishlist</span>
              </span>
              {wishlist.length > 0 && (
                <span className="text-[11px] font-bold bg-[#58C1C3] text-[#0C1618] px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsProfileOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#122225] border border-[#1E373D] text-sm text-[#94AFB5] hover:text-[#58C1C3] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#58C1C3]" />
                <span>{isLoggedIn && user ? user.name : 'Account Login'}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#97CC6F] font-semibold">
                {isLoggedIn ? 'Online' : 'Sign in'}
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-4 space-y-1">
            <span className="block px-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#94AFB5]/70 mb-2">
              Menu Navigation
            </span>
            {navItems.map(({ page, label, icon }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activePage === page
                    ? 'bg-[#58C1C3]/15 text-[#58C1C3] border border-[#58C1C3]/30 font-semibold'
                    : 'text-[#94AFB5] hover:text-[#F5F7F7] hover:bg-[#122225]'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Booking Button */}
        <div className="pt-4 border-t border-[#1E373D]">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCalendarModalOpen(true);
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#58C1C3] text-[#0C1618] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#97CC6F] transition-colors shadow-lg shadow-[#58C1C3]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Demo Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};
