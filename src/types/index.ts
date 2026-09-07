export type ProductCategory = 
  | 'tat-ca'
  | 'ca-phe-pha-may'
  | 'ca-phe-truyen-thong'
  | 'cold-brew'
  | 'tra-matcha'
  | 'banh-ngot'
  | 'mon-an-nhe';

export interface ProductSize {
  name: 'S' | 'M' | 'L';
  label: string;
  extraPrice: number;
  volume: string;
}

export interface ProductTopping {
  id: string;
  name: string;
  price: number;
}

export type ProductBadge = 'Mới' | 'Bán chạy' | 'Giảm giá';

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  sku: string;
  volume: string;
  sizes: ProductSize[];
  toppings: ProductTopping[];
  prepTime: string;
  ingredients: string[];
  status: 'Còn hàng' | 'Hết hàng' | 'Mới rang';
  badges?: ProductBadge[];
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: ProductSize;
  selectedToppings: ProductTopping[];
  quantity: number;
  unitPrice: number;
  itemTotalPrice: number;
  note?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tag: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  favoriteDrink: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export interface ReservationData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  area: 'Trong nhà' | 'Ban công / Ngoài trời' | 'Phòng VIP Riêng tư';
  note?: string;
}