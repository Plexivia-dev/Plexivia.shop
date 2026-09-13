import { ThemeDefinition } from '../types';
import { defaultConfig } from './theme.config';
import { DefaultLayout } from './Layout';
import { Header } from '@/src/components/header/Header';
import { Footer } from '@/src/components/footer/Footer';
import { HomePage } from '@/src/components/home/HomePage';
import { ShopPage } from '@/src/components/pages/ShopPage';
import { ProductDetailsPage } from '@/src/components/pages/ProductDetailsPage';
import { CartDrawer } from '@/src/components/cart/CartDrawer';
import { CheckoutPage } from '@/src/components/pages/CheckoutPage';

export const defaultTheme: ThemeDefinition = {
  config: defaultConfig,
  components: {
    Layout: DefaultLayout,
    Header,
    Footer,
    HomePage,
    ShopPage,
    ProductDetailsPage,
    CartDrawer,
    CheckoutPage,
  },
};
