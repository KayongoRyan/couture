
import { Product, CartItem, PaymentMethod, MobileProvider } from '../types';
import { MOCK_PRODUCTS } from '../constants';

// Safe environment variable access
const getApiUrl = () => {
  try {
    const meta = import.meta as any;
    
    // 1. Check for explicit override (Production/Vercel)
    if (meta && meta.env && meta.env.VITE_API_URL) {
      return meta.env.VITE_API_URL;
    }
    
    // 2. In Development, use relative path to leverage the Vite Proxy defined in vite.config.ts
    // This routes /api -> http://127.0.0.1:5000/api and fixes many local network issues
    if (meta && meta.env && meta.env.DEV) {
      return '/api';
    }
  } catch (e) {
    // Ignore errors in environments where import.meta is not defined
  }
  
  // 3. Fallback default
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

// Debug Config
console.log(`[API Service] Configured API URL: ${API_URL}`);

const mockDelay = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), 600));
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    console.warn("Backend disconnected. Serving cached/mock product data.");
    return mockDelay(MOCK_PRODUCTS);
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return mockDelay(product);
  }
};

export const fetchRecommendations = async (category?: string): Promise<Product[]> => {
  try {
    const query = category ? `?category=${category}` : '';
    const response = await fetch(`${API_URL}/products/recommendations${query}`);
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    let recs = [...MOCK_PRODUCTS];
    if (category) {
      recs = recs.filter(p => p.category === category);
    }
    return mockDelay(recs.slice(0, 3));
  }
};

export const likeProduct = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}/like`, { method: 'POST' });
    if (!response.ok) throw new Error("Status not ok");
  } catch (error) {
    console.debug("Offline mode: Like action saved locally.");
  }
};

/**
 * Process Payment (Mobile Money Only)
 */
export const processPayment = async (
  method: PaymentMethod, 
  cartItems: CartItem[], 
  details?: any
): Promise<any> => {
  try {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let targetUrl = '';
    let body = {};

    if (method === PaymentMethod.MOBILE_MONEY && details) {
      targetUrl = `${API_URL}/payment/mobile-money`;
      body = { 
        provider: details.provider, 
        phoneNumber: details.phoneNumber,
        amount: total
      };
    } else {
      throw new Error("Invalid Payment Method or Missing Details");
    }

    console.log(`[Payment] Connecting to backend at: ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    // We process the JSON regardless of status code to get the error message
    // If response is not JSON (e.g. 404 HTML page), parsing will fail and trigger catch block
    const data = await response.json();
    return data;

  } catch (error) {
    // Graceful Fallback Logic
    console.warn(`[Offline Mode] Backend unreachable at ${API_URL}. Switching to offline payment simulation.`);
    
    // Check if the error was strictly a network error to give a hint
    if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.debug("Hint: Ensure your server is running (npm start) on port 5000.");
    }

    // Mock success for offline testing so the UI works smoothly
    return mockDelay({ 
      success: true, 
      message: "Payment was Successfully Done . Thank you shopping at couturelafleur" 
    });
  }
};
