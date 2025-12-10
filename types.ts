
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'accessories' | 'unisex' | 'couture';
  description: string;
  image: string;
  secondaryImage?: string;
  isNew?: boolean;
  likes?: number;
  views?: number;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export enum PaymentMethod {
  MOBILE_MONEY = 'mobile_money',
}

export enum MobileProvider {
  MTN = 'MTN',
  AIRTEL = 'Airtel',
}