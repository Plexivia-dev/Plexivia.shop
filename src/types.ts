export type ProductCategory = 'Bags' | 'Wallet' | 'Keychains' | 'Tshirts';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceFormatted: string;
  image: string;
  description: string;
  features?: string[];
  inStock: boolean;
  featured?: boolean;
  selected?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'offers'
  | 'about'
  | 'contact'
  | 'product-details'
  | 'checkout'
  | 'wishlist';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface SiteConfig {
  general?: {
    siteName?: string;
    tagline?: string;
    notificationEmail?: string;
    contactEmail?: string;
    phone?: string;
    whatsappNumber?: string;
    currencySymbol?: string;
  };
  themeColors?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    darkBgColor?: string;
    surfaceColor?: string;
    cardColor?: string;
    borderColor?: string;
    textColor?: string;
    mutedColor?: string;
  };
  branding?: {
    logoUrl?: string;
    darkLogoUrl?: string;
    faviconUrl?: string;
    showTagline?: boolean;
  };
  banners?: {
    heroBanners?: Array<{
      id?: string;
      title?: string;
      subtitle?: string;
      badge?: string;
      imageUrl?: string;
      ctaText?: string;
      ctaLink?: string;
      secondaryCtaText?: string;
    }>;
    aboutBanner?: {
      title?: string;
      subtitle?: string;
      description?: string;
      imageUrl?: string;
    };
    promoBanner?: {
      enabled?: boolean;
      badge?: string;
      text?: string;
      link?: string;
    };
  };
}
