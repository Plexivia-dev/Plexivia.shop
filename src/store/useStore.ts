import { create } from 'zustand';
import { Product, CartItem, UserProfile, PageView } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreState {
  // Navigation & Page State
  activePage: PageView;
  selectedProductId: string | null;
  selectedCategory: string;
  searchQuery: string;
  navigateTo: (page: PageView, productId?: string, category?: string) => void;

  // Cart State
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartItemCount: () => number;

  // Wishlist State
  wishlist: string[]; // array of product ids
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User Profile State
  user: UserProfile | null;
  isLoggedIn: boolean;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  login: (name: string, email: string) => void;
  logout: () => void;

  // Modals & Drawers
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCalendarModalOpen: boolean;
  setIsCalendarModalOpen: (open: boolean) => void;

  // Micro feedback
  notification: string | null;
  showNotification: (msg: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Navigation
  activePage: 'home',
  selectedProductId: null,
  selectedCategory: 'All',
  searchQuery: '',
  navigateTo: (page, productId, category) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    set({
      activePage: page,
      selectedProductId: productId || null,
      selectedCategory: category !== undefined ? category : get().selectedCategory,
      isMobileMenuOpen: false,
    });
  },

  // Cart
  cart: [
    // Pre-populate with a demo item for immediate delight as shown in mockup
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[5], quantity: 1 },
  ],
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      let updatedCart: CartItem[];
      if (existing) {
        updatedCart = state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...state.cart, { product, quantity }];
      }
      return { cart: updatedCart, isCartOpen: true };
    });
    get().showNotification(`Added ${product.name} to cart`);
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ cart: [] }),
  getCartSubtotal: () => {
    return get().cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
  getCartItemCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Wishlist
  wishlist: ['tote-bag', 'cute-bunny-keychain'],
  toggleWishlist: (productId) => {
    const isPresent = get().wishlist.includes(productId);
    const product = PRODUCTS.find((p) => p.id === productId);
    if (isPresent) {
      set((state) => ({
        wishlist: state.wishlist.filter((id) => id !== productId),
      }));
      if (product) get().showNotification(`Removed ${product.name} from wishlist`);
    } else {
      set((state) => ({
        wishlist: [...state.wishlist, productId],
      }));
      if (product) get().showNotification(`Saved ${product.name} to wishlist`);
    }
  },
  isInWishlist: (productId) => {
    return get().wishlist.includes(productId);
  },

  // User Profile
  user: {
    name: 'Demo Client',
    email: 'client@plexivia.com',
  },
  isLoggedIn: true,
  isProfileOpen: false,
  setIsProfileOpen: (open) => set({ isProfileOpen: open }),
  login: (name, email) =>
    set({
      user: { name, email },
      isLoggedIn: true,
      isProfileOpen: false,
    }),
  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
      isProfileOpen: false,
    }),

  // Modals
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
  isCalendarModalOpen: false,
  setIsCalendarModalOpen: (open) => set({ isCalendarModalOpen: open }),

  // Micro feedback
  notification: null,
  showNotification: (msg) => {
    set({ notification: msg });
    setTimeout(() => {
      set({ notification: null });
    }, 2500);
  },
}));
