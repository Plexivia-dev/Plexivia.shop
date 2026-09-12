import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { OffersPage } from './components/pages/OffersPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProfileModal } from './components/auth/ProfileModal';
import { SearchModal } from './components/common/SearchModal';
import { CalendarModal } from './components/common/CalendarModal';
import { AiChatbot } from './components/chat/AiChatbot';
import { Toast } from './components/common/Toast';

export default function App() {
  const { activePage, fetchProducts, fetchCategories } = useStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#0C1618] text-[#F5F7F7] flex flex-col font-sans selection:bg-[#58C1C3]/30 selection:text-[#58C1C3]">
      {/* Toast Feedback */}
      <Toast />

      {/* Global Header (3 Levels + Mobile Drawer) */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product-details' && <ProductDetailsPage />}
        {activePage === 'offers' && <OffersPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'checkout' && <CheckoutPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Modals & Drawers */}
      <ProfileModal />
      <SearchModal />
      <CalendarModal />

      {/* Floating AI Shopping Assistant */}
      <AiChatbot />
    </div>
  );
}
