import { Product, ProductCategory } from '../types';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  itemCount: number;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Bags',
    name: 'Bags',
    itemCount: 5,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'Wallet',
    name: 'Wallet',
    itemCount: 4,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'Keychains',
    name: 'Keychains',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'Tshirts',
    name: 'Tshirts',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&h=800&q=80',
  },
];

export const PRODUCTS: Product[] = [
  // CATEGORY 1: Bags (5 products)
  {
    id: 'tote-bag',
    name: 'Tote Bag',
    category: 'Bags',
    price: 1250,
    priceFormatted: '৳ 1,250',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Stylish and durable tote bag with a modern design. Perfect for everyday use.',
    features: ['100% heavy canvas cotton', 'Reinforced shoulder straps', 'Internal zippered pocket', 'Eco-friendly fabrication'],
    inStock: true,
    featured: true,
  },
  {
    id: 'nature-designed-tote-bag',
    name: 'Nature Designed Tote Bag',
    category: 'Bags',
    price: 1250,
    priceFormatted: '৳ 1,250',
    image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Botanical foliage print canvas bag designed for mindful daily errands and shopping.',
    features: ['Organic botanical screen print', 'Durable woven handles', 'Spacious open compartment'],
    inStock: true,
    featured: false,
  },
  {
    id: 'ladies-purse',
    name: 'Ladies Purse',
    category: 'Bags',
    price: 1650,
    priceFormatted: '৳ 1,650',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Contemporary structured ladies handbag with premium metal accents and shoulder strap.',
    features: ['Fine textured vegan leather', 'Dual interior partitions', 'Gold-finish hardware'],
    inStock: true,
    featured: false,
  },
  {
    id: 'laptop-bag',
    name: 'Laptop Bag',
    category: 'Bags',
    price: 2250,
    priceFormatted: '৳ 2,250',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Water-repellent commuter laptop carrier with shock-absorbing foam padding.',
    features: ['Fits up to 15.6 inch laptops', 'Dedicated accessory slots', 'Padded ergonomic strap'],
    inStock: true,
    featured: false,
  },
  {
    id: 'cute-schoolbag',
    name: 'Cute Schoolbag',
    category: 'Bags',
    price: 1850,
    priceFormatted: '৳ 1,850',
    image: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Comfortable pastel backpack featuring ergonomic straps and organized storage.',
    features: ['Multi-tier zip compartments', 'Breathable mesh back panel', 'Lightweight water-resistant fabric'],
    inStock: true,
    featured: false,
  },

  // CATEGORY 2: Wallet (4 products)
  {
    id: 'kawaii-mini-purse',
    name: 'Kawaii Mini Purse',
    category: 'Wallet',
    price: 950,
    priceFormatted: '৳ 950',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Charming compact pouch purse crafted for quick coins, cards, and keys.',
    features: ['Compact palm-sized form', 'Smooth metallic zipper', 'Durable inner lining'],
    inStock: true,
    featured: true,
    selected: true,
  },
  {
    id: 'coin-purse',
    name: 'Coin Purse',
    category: 'Wallet',
    price: 750,
    priceFormatted: '৳ 750',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Minimalist pocket leather coin purse with clean edges and secure closure.',
    features: ['Genuine textured finish', 'Quick-access snap clasp', 'Slim pocket profile'],
    inStock: true,
    featured: false,
  },
  {
    id: 'men-wallet',
    name: 'Men Wallet',
    category: 'Wallet',
    price: 1250,
    priceFormatted: '৳ 1,250',
    image: 'https://images.unsplash.com/photo-1517254793880-056705c3c338?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Classic dark leather bifold wallet with multi-card slots and bill divider.',
    features: ['RFID protection shield', '8 card slots + dual currency fold', 'Slim hand-stitched border'],
    inStock: true,
    featured: false,
  },
  {
    id: 'leather-long-wallet',
    name: 'Leather Long Wallet',
    category: 'Wallet',
    price: 1750,
    priceFormatted: '৳ 1,750',
    image: 'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Refined long organizer wallet tailored for checkbooks, cards, and cash.',
    features: ['12 card slots', 'Zippered coin sleeve', 'Premium matte leather exterior'],
    inStock: true,
    featured: false,
  },

  // CATEGORY 3: Keychains (3 products)
  {
    id: 'cute-bunny-keychain',
    name: 'Cute Bunny Keychain',
    category: 'Keychains',
    price: 680,
    priceFormatted: '৳ 680',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Soft tactile plush bunny charm attached to an alloy swivel clip.',
    features: ['Ultra-soft plush finish', 'Sturdy metal swivel ring', 'Lightweight bag accessory'],
    inStock: true,
    featured: true,
  },
  {
    id: 'kuromi-premium-plush',
    name: 'Kuromi Premium Plush',
    category: 'Keychains',
    price: 1200,
    priceFormatted: '৳ 1,200',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Detailed collector plush pendant with signature aesthetic styling.',
    features: ['High-density velvet plush', 'Precision embroidery', 'Collector clasp'],
    inStock: true,
    featured: false,
    selected: true,
  },
  {
    id: 'black-cat-keychain-pendant',
    name: 'Black Cat Keychain Pendant',
    category: 'Keychains',
    price: 620,
    priceFormatted: '৳ 620',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Sleek black feline charm pendant with polished dark enamel finish.',
    features: ['Solid zinc alloy base', 'Gloss enamel coating', 'Anti-rust key loop'],
    inStock: true,
    featured: false,
  },

  // CATEGORY 4: Tshirts (3 products)
  {
    id: 'hello-kitty-designed',
    name: 'Hello Kitty Designed',
    category: 'Tshirts',
    price: 1450,
    priceFormatted: '৳ 1,450',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Soft combed cotton pastel t-shirt with classic playful character artwork.',
    features: ['100% bio-washed combed cotton', 'High-definition screen print', 'Pre-shrunk regular fit'],
    inStock: true,
    featured: true,
  },
  {
    id: 'couple-tshirt-pair',
    name: 'Couple Tshirt Pair',
    category: 'Tshirts',
    price: 2450,
    priceFormatted: '৳ 2,450',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Coordinated set of 2 premium unisex t-shirts crafted for matching comfort.',
    features: ['Set of two matching tees', 'Breathable lightweight weave', 'Ribbed crew collar'],
    inStock: true,
    featured: false,
    selected: true,
  },
  {
    id: 'jojo-soso-drop-shoulder',
    name: 'Jojo Soso Drop Shoulder',
    category: 'Tshirts',
    price: 1650,
    priceFormatted: '৳ 1,650',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&h=800&q=80',
    description: 'Heavyweight oversized drop-shoulder tee with relaxed contemporary drape.',
    features: ['240 GSM heavy cotton', 'Relaxed boxy silhouette', 'Drop shoulder seams'],
    inStock: true,
    featured: false,
  },
];

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'Style Meets Everyday Essentials',
    subtitle: 'Discover unique bags, wallets, keychains and t-shirts crafted for your lifestyle.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80',
    badge: 'NEW COLLECTION',
  },
  {
    id: 2,
    title: 'Crafted with Precision & Passion',
    subtitle: 'Minimalist aesthetics and functional design engineered for modern individuals.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1920&q=80',
    badge: 'PREMIUM QUALITY',
  },
  {
    id: 3,
    title: 'Digital Dreams In Physical Form',
    subtitle: 'Demonstrating seamless web craftsmanship and high-performance digital commerce.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1920&q=80',
    badge: 'PLEXIVIA DEMO',
  },
];
