import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Toast } from '@/src/components/common/Toast';

// Layout wrapper for the Engulfic high-fashion urban streetwear theme
export const EngulficLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-400">
      <Toast />
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
