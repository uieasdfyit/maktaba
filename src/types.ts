export interface Product {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  price: number; // in Iraqi Dinars (IQD / د.ع)
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  detailedDescription: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  image: string;
  inStock: boolean;
  stockCount: number;
  tag?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type OrderStatus = 'received' | 'processing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  governorate: string;
  address: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'zaincash' | 'qicard';
  status: OrderStatus;
  estimatedDelivery: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}
