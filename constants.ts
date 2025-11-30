
import { Product, Article, Order, Customer, Poem, LookbookItem, Promotion } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Kigali Trench',
    price: 450,
    category: 'Women',
    description: 'A structural masterpiece blending Parisian tailoring with Rwandan resilience. Pure silk lining.',
    image: 'https://picsum.photos/800/1200?random=1',
    isNew: true,
    stock: 12,
    status: 'active'
  },
  {
    id: '2',
    name: 'Noir Velvet Suit',
    price: 890,
    category: 'Men',
    description: 'Deep cocoa velvet that absorbs light and commands attention. For the modern poet.',
    image: 'https://picsum.photos/800/1200?random=2',
    isNew: true,
    stock: 5,
    status: 'active'
  },
  {
    id: '3',
    name: 'Imigongo Gold Cuff',
    price: 220,
    category: 'Accessories',
    description: 'Hand-hammered brass featuring traditional geometric patterns reimagined.',
    image: 'https://picsum.photos/800/1200?random=3',
    stock: 45,
    status: 'active'
  },
  {
    id: '4',
    name: 'Silk Wrap Dress',
    price: 560,
    category: 'Women',
    description: 'Flowing elegance in champagne beige. Moves as you breathe.',
    image: 'https://picsum.photos/800/1200?random=4',
    stock: 8,
    status: 'active'
  },
  {
    id: '5',
    name: 'Nomad Leather Bag',
    price: 1200,
    category: 'Accessories',
    description: 'Full grain leather sourced ethically. A companion for life\'s journeys.',
    image: 'https://picsum.photos/800/1200?random=5',
    stock: 2,
    status: 'active'
  },
  {
    id: '6',
    name: 'Savannah Linen Shirt',
    price: 320,
    category: 'Men',
    description: 'Breathable, structured linen for the equatorial sun.',
    image: 'https://picsum.photos/800/1200?random=6',
    stock: 20,
    status: 'draft'
  }
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Echoes of the Hills',
    excerpt: 'How the topography of Rwanda influences the silhouette of our Fall collection.',
    image: 'https://picsum.photos/800/600?random=7',
    date: 'Oct 12, 2023',
    category: 'Fashion',
    author: 'Elise M.'
  },
  {
    id: '2',
    title: 'Silence is Luxury',
    excerpt: 'In a noisy world, we design clothes that speak without shouting.',
    image: 'https://picsum.photos/800/600?random=8',
    date: 'Sep 28, 2023',
    category: 'Poetry',
    author: 'Ryan K.'
  },
  {
    id: '3',
    title: 'The Art of Weaving',
    excerpt: 'Meeting the artisans of Nyamirambo who craft our signature textiles.',
    image: 'https://picsum.photos/800/600?random=9',
    date: 'Sep 15, 2023',
    category: 'Culture',
    author: 'Sarah J.'
  }
];

export const POEMS: Poem[] = [
  {
    id: '1',
    title: 'Fabric of Night',
    lines: ['The silk whispers', 'Against the skin of the city', 'We are night walkers.'],
    theme: 'Mystery',
    published: true
  },
  {
    id: '2',
    title: 'Golden Hour',
    lines: ['Sunlight drapes the hills', 'Like a mother wrapping her child', 'Warm, eternal, gold.'],
    theme: 'Nature',
    published: true
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: '1',
    title: 'Parisian Morning',
    image: 'https://picsum.photos/800/1200?random=40',
    season: 'Fall 2023',
    featured: true
  },
  {
    id: '2',
    title: 'Kigali Twilight',
    image: 'https://picsum.photos/800/1200?random=41',
    season: 'Fall 2023',
    featured: true
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7721',
    customerName: 'Jean-Luc M.',
    email: 'jl.m@example.com',
    date: 'Oct 24, 2023',
    total: 1250,
    status: 'Processing',
    items: 2,
    paymentMethod: 'Visa'
  },
  {
    id: 'ORD-7720',
    customerName: 'Sarah K.',
    email: 'sarah.k@example.com',
    date: 'Oct 23, 2023',
    total: 450,
    status: 'Shipped',
    items: 1,
    paymentMethod: 'MTN MoMo'
  },
  {
    id: 'ORD-7719',
    customerName: 'David R.',
    email: 'david.r@example.com',
    date: 'Oct 23, 2023',
    total: 220,
    status: 'Delivered',
    items: 1,
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ORD-7718',
    customerName: 'Amara B.',
    email: 'amara.b@example.com',
    date: 'Oct 22, 2023',
    total: 2400,
    status: 'Processing',
    items: 4,
    paymentMethod: 'Visa'
  },
  {
    id: 'ORD-7717',
    customerName: 'Paul G.',
    email: 'paul.g@example.com',
    date: 'Oct 21, 2023',
    total: 320,
    status: 'Cancelled',
    items: 1,
    paymentMethod: 'Airtel Money'
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Jean-Luc M.',
    email: 'jl.m@example.com',
    totalSpent: 4500,
    ordersCount: 5,
    lastOrderDate: 'Oct 24, 2023',
    location: 'Kigali, Rwanda',
    status: 'VIP'
  },
  {
    id: 'CUST-002',
    name: 'Sarah K.',
    email: 'sarah.k@example.com',
    totalSpent: 1200,
    ordersCount: 3,
    lastOrderDate: 'Oct 23, 2023',
    location: 'Paris, France',
    status: 'Active'
  },
  {
    id: 'CUST-003',
    name: 'David R.',
    email: 'david.r@example.com',
    totalSpent: 220,
    ordersCount: 1,
    lastOrderDate: 'Oct 23, 2023',
    location: 'London, UK',
    status: 'Active'
  }
];

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: '1',
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    active: true,
    expiryDate: '2024-12-31'
  },
  {
    id: '2',
    code: 'VIP25',
    discount: 25,
    type: 'percentage',
    active: true,
    expiryDate: '2024-06-30'
  },
  {
    id: '3',
    code: 'FREESHIP',
    discount: 0,
    type: 'fixed',
    active: false,
    expiryDate: '2023-10-01'
  }
];

export const BRAND_STORY = `
  CoutureLaFleur is not merely fashion; it is a dialogue between two worlds. 
  Born from the vibrant heart of Kigali and polished by the timeless elegance of Paris, 
  we bridge the gap between heritage and haute couture. 
  
  We believe luxury is a feeling—a quiet confidence, a sense of belonging, 
  and the knowledge that what you wear tells a story of craftsmanship, dignity, and art.
`;
