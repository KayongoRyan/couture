
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Women' | 'Men' | 'Accessories';
  description: string;
  image: string;
  isNew?: boolean;
  stock?: number;
  status?: 'active' | 'draft' | 'archived';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  category: 'Fashion' | 'Culture' | 'Poetry';
  author?: string;
  tags?: string[];
}

export interface Poem {
  id: string;
  title: string;
  lines: string[];
  theme: string;
  published: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  image: string;
  season: string;
  featured: boolean;
}

export interface VideoContent {
  id: string;
  title: string;
  type: 'trailer' | 'film';
  duration: string;
  thumbnail: string;
  url: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

export type Theme = 'light' | 'dark';

export interface CheckoutDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  paymentMethod: 'card' | 'momo' | 'airtel';
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  ordersCount: number;
  lastOrderDate: string;
  location: string;
  status: 'Active' | 'Inactive' | 'VIP';
}

export interface Promotion {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  active: boolean;
  expiryDate: string;
}

export interface AdminStats {
  totalRevenue: number;
  activeOrders: number;
  newCustomers: number;
  totalProducts: number;
  siteVisits: number;
}
