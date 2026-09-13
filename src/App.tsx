import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { useThemeStore } from './store/useThemeStore';
import { getTheme } from '@themes/index';
import { OffersPage } from './components/pages/OffersPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { ThemeSwitcher } from './components/common/ThemeSwitcher';

// Root storefront application dynamically rendering active theme components with seamless switching
const App: React.FC = () => {
  const { activePage, fetchProducts, fetchCategories, fetchSiteConfig } = useStore();
  const { currentTheme } = useThemeStore();

  const themeDefinition = getTheme(currentTheme);
  const {
    Layout,
    HomePage,
    ShopPage,
    ProductDetailsPage,
    CheckoutPage,
  } = themeDefinition.components;

  useEffect(() => {
    fetchSiteConfig();
    fetchProducts();
    fetchCategories();
  }, [fetchSiteConfig, fetchProducts, fetchCategories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <Layout>
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
      <ThemeSwitcher />
    </Layout>
  );
};

export default App;
