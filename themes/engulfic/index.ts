import { ThemeDefinition } from '../types';
import { engulficConfig } from './theme.config';
import { EngulficLayout } from './Layout';
import { Header } from './Header';
import { Footer } from './Footer';
import { HomePage } from './HomePage';
import { ShopPage } from './ShopPage';
import { ProductDetailsPage } from './ProductDetailsPage';
import { CartDrawer } from './CartDrawer';
import { CheckoutPage } from './CheckoutPage';

export const engulficTheme: ThemeDefinition = {
  config: engulficConfig,
  components: {
    Layout: EngulficLayout,
    Header,
    Footer,
    HomePage,
    ShopPage,
    ProductDetailsPage,
    CartDrawer,
    CheckoutPage,
  },
};
