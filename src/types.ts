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
