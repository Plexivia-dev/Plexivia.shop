import { create } from 'zustand';
import { Product, CartItem, UserProfile, PageView, SiteConfig } from '../types';
import { PRODUCTS, CATEGORIES, CategoryInfo } from '../data/products';
import {
  apiGetProducts,
  apiGetSiteConfig,
  apiGetCategories,
  apiCreateOrder,
  apiSubmitContact,
  resolveMediaUrl,
  CreateOrderPayload,
} from '../services/api';

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'cod' | 'bkash' | 'card' | string;
  notes?: string;
  couponCode?: string;
}

interface StoreState {
  // Navigation & Page State
  activePage: PageView;
  selectedProductId: string | null;
  selectedCategory: string;
  searchQuery: string;
  navigateTo: (page: PageView, productId?: string, category?: string) => void;

  // Products & Categories (Dynamic with fallback)
  products: Product[];
  categories: CategoryInfo[];
  isLoadingProducts: boolean;
  fetchProducts: () => Promise<void>;
  siteConfig: SiteConfig | null;
  fetchSiteConfig: () => Promise<void>;
  fetchCategories: () => Promise<void>;

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

  // Checkout & Orders
  isPlacingOrder: boolean;
  submitOrder: (formData: CheckoutFormData) => Promise<{
    success: boolean;
    orderId?: string;
    message?: string;
  }>;

  // Contact Form Submission
  isSubmittingContact: boolean;
  submitContactMessage: (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) => Promise<{
    success: boolean;
    message?: string;
  }>;

  // Wishlist State
  wishlist: string[];
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

  // Products & Categories
  products: PRODUCTS,
  categories: CATEGORIES,
  isLoadingProducts: false,
  fetchProducts: async () => {
    set({ isLoadingProducts: true });
    try {
      const res = await apiGetProducts({ limit: 100 });
      const rawList = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(rawList) && rawList.length > 0) {
        const mapped: Product[] = rawList.map((p: any) => {
          const rawCategory =
            (Array.isArray(p.categories) && p.categories[0]?.name) ||
            p.category?.name ||
            p.category ||
            'General';
          const finalPrice = Number(p.offerPrice || p.salePrice || p.price || 0);
          const rawImg = p.imageUrl || p.thumbnailUrl || (Array.isArray(p.images) ? p.images[0] : null);
          return {
            id: String(p._id || p.id),
            name: p.name || 'Product',
            category: rawCategory as any,
            price: finalPrice,
            priceFormatted: `৳ ${finalPrice.toLocaleString()}`,
            image: rawImg
              ? resolveMediaUrl(rawImg)
              : 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&h=800&q=80',
            description: p.description || p.longDescription || p.shortDescription || '',
            features: Array.isArray(p.features)
              ? p.features
              : p.specifications
              ? Object.entries(p.specifications).map(([k, v]) => `${k}: ${v}`)
              : [],
            inStock: p.stockStatus === 'instock' || (p.totalStock !== undefined ? p.totalStock > 0 : true),
            featured: Boolean(p.isFeatured || p.featured),
          };
        });
        set({ products: mapped, isLoadingProducts: false });
      } else {
        set({ isLoadingProducts: false });
      }
    } catch {
      set({ isLoadingProducts: false });
    }
  },
  siteConfig: null,
  fetchSiteConfig: async () => {
    try {
      const config = await apiGetSiteConfig();
      if (config) {
        set({ siteConfig: config });
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          if (config.themeColors) {
            const root = document.documentElement;
            if (config.themeColors.primaryColor) {
              root.style.setProperty('--color-plexivia-cyan', config.themeColors.primaryColor);
            }
            if (config.themeColors.secondaryColor) {
              root.style.setProperty('--color-plexivia-green', config.themeColors.secondaryColor);
            }
            if (config.themeColors.darkBgColor) {
              root.style.setProperty('--color-plexivia-dark', config.themeColors.darkBgColor);
            }
            if (config.themeColors.surfaceColor) {
              root.style.setProperty('--color-plexivia-surface', config.themeColors.surfaceColor);
            }
            if (config.themeColors.cardColor) {
              root.style.setProperty('--color-plexivia-card', config.themeColors.cardColor);
            }
            if (config.themeColors.borderColor) {
              root.style.setProperty('--color-plexivia-border', config.themeColors.borderColor);
            }
            if (config.themeColors.textColor) {
              root.style.setProperty('--color-plexivia-white', config.themeColors.textColor);
            }
            if (config.themeColors.mutedColor) {
              root.style.setProperty('--color-plexivia-muted', config.themeColors.mutedColor);
            }
          }
          if (config.general?.siteName) {
            document.title = `${config.general.siteName} – ${config.general.tagline || 'Crafting Digital Dreams'}`;
          }
          if (config.branding?.faviconUrl) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
              link = document.createElement('link');
              link.rel = 'icon';
              document.head.appendChild(link);
            }
            link.href = config.branding.faviconUrl;
          }
        }
      }
    } catch {}
  },
  fetchCategories: async () => {
    try {
      const res = await apiGetCategories();
      const rawList = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(rawList) && rawList.length > 0) {
        const mapped: CategoryInfo[] = rawList.map((c: any) => ({
          id: (c.name || c.id) as any,
          name: c.name || 'Category',
          itemCount: Number(c.productCount || c.itemCount || 0),
          image: resolveMediaUrl(
            c.imageUrl || c.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&h=800&q=80'
          ),
        }));
        set({ categories: mapped });
      }
    } catch {}
  },

  // Cart
  cart: [
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

  // Checkout & Orders
  isPlacingOrder: false,
  submitOrder: async (formData: CheckoutFormData) => {
    const { cart, getCartSubtotal } = get();
    const subtotal = getCartSubtotal();
    const shippingCost = subtotal >= 2000 || subtotal === 0 ? 0 : 120;
    const total = subtotal + shippingCost;

    const payload: CreateOrderPayload = {
      billingInfo: {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        district: formData.city,
        postalCode: formData.postalCode,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.product.price * item.quantity,
        image: item.product.image,
      })),
      paymentMethod: formData.paymentMethod,
      subtotal,
      shippingCost,
      total,
      notes: formData.notes,
      couponCode: formData.couponCode,
    };

    set({ isPlacingOrder: true });
    try {
      const res = await apiCreateOrder(payload);
      get().clearCart();
      set({ isPlacingOrder: false });
      const orderId =
        res.data?.orderNumber ||
        res.data?._id ||
        res.orderNumber ||
        `PLX-${Math.floor(10000 + Math.random() * 90000)}`;
      return {
        success: true,
        orderId,
        message: res.message || 'Order placed successfully!',
      };
    } catch (err: any) {
      set({ isPlacingOrder: false });
      throw err;
    }
  },

  // Contact Form Submission
  isSubmittingContact: false,
  submitContactMessage: async (data) => {
    set({ isSubmittingContact: true });
    try {
      const res = await apiSubmitContact(data);
      set({ isSubmittingContact: false });
      return {
        success: true,
        message: res.message || 'Thank you! Your message has been sent successfully.',
      };
    } catch (err: any) {
      set({ isSubmittingContact: false });
      throw err;
    }
  },

  // Wishlist
  wishlist: ['tote-bag', 'cute-bunny-keychain'],
  toggleWishlist: (productId) => {
    const isPresent = get().wishlist.includes(productId);
    const product = get().products.find((p) => p.id === productId);
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
