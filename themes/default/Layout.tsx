import React from 'react';
import { Header } from '@/src/components/header/Header';
import { Footer } from '@/src/components/footer/Footer';
import { CartDrawer } from '@/src/components/cart/CartDrawer';
import { ProfileModal } from '@/src/components/auth/ProfileModal';
import { SearchModal } from '@/src/components/common/SearchModal';
import { CalendarModal } from '@/src/components/common/CalendarModal';
import { AiChatbot } from '@/src/components/chat/AiChatbot';
import { Toast } from '@/src/components/common/Toast';

// Layout wrapper for the default Plexivia tech theme
export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0C1618] text-[#F5F7F7] flex flex-col font-sans selection:bg-[#58C1C3]/30 selection:text-[#58C1C3]">
      <Toast />
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <CartDrawer />
      <ProfileModal />
      <SearchModal />
      <CalendarModal />
      <AiChatbot />
    </div>
  );
};
