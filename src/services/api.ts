export const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  'https://api.plexivia.online';

export const resolveMediaUrl = (path?: string): string => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const cleanBase = API_BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

export const getDynamicLogoUrl = (): string => {
  const version = typeof window !== 'undefined' ? localStorage.getItem('brand_logo_version') || '' : '';
  const baseLogo = resolveMediaUrl('/uploads/assets/logo.webp');
  return version ? `${baseLogo}?v=${version}` : baseLogo;
};

export interface ApiResponse<T> {
  status?: string;
  success?: boolean;
  message?: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface OrderItemPayload {
  productId?: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  image?: string;
}

export interface CreateOrderPayload {
  billingInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    district: string;
    postalCode?: string;
  };
  items: OrderItemPayload[];
  paymentMethod: 'cod' | 'bkash' | 'card' | string;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes?: string;
  couponCode?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Fetches public product catalog from backend API
export const apiGetProducts = async (params?: {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.category && params.category !== 'All') {
    searchParams.append('category', params.category);
  }
  if (params?.search) {
    searchParams.append('search', params.search);
  }
  if (params?.limit) {
    searchParams.append('limit', String(params.limit));
  }
  if (params?.page) {
    searchParams.append('page', String(params.page));
  }

  const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const res = await fetch(`${API_BASE_URL}/api/v1/products${queryStr}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  return res.json();
};

// Fetches single product details by ID or slug
export const apiGetProductById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/products/${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }
  return res.json();
};

// Fetches category list from backend API
export const apiGetCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/api/v1/categories`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.statusText}`);
  }
  return res.json();
};

// Submits a new customer checkout order to backend API
export const apiCreateOrder = async (payload: CreateOrderPayload) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/orders/new-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Failed to place order');
  }
  return data;
};

// Submits customer contact form message
export const apiSubmitContact = async (payload: ContactPayload) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Failed to send message');
  }
  return data;
};

// Subscribes email address to newsletter
export const apiSubscribeNewsletter = async (email: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/subscribers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Failed to subscribe');
  }
  return data;
};
