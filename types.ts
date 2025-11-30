export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Women' | 'Men' | 'Accessories';
  description: string;
  image: string;
  isNew?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: 'Fashion' | 'Culture' | 'Poetry';
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