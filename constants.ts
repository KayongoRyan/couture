import { Product, Article } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Kigali Trench',
    price: 450,
    category: 'Women',
    description: 'A structural masterpiece blending Parisian tailoring with Rwandan resilience. Pure silk lining.',
    image: 'https://picsum.photos/800/1200?random=1',
    isNew: true
  },
  {
    id: '2',
    name: 'Noir Velvet Suit',
    price: 890,
    category: 'Men',
    description: 'Deep cocoa velvet that absorbs light and commands attention. For the modern poet.',
    image: 'https://picsum.photos/800/1200?random=2',
    isNew: true
  },
  {
    id: '3',
    name: 'Imigongo Gold Cuff',
    price: 220,
    category: 'Accessories',
    description: 'Hand-hammered brass featuring traditional geometric patterns reimagined.',
    image: 'https://picsum.photos/800/1200?random=3'
  },
  {
    id: '4',
    name: 'Silk Wrap Dress',
    price: 560,
    category: 'Women',
    description: 'Flowing elegance in champagne beige. Moves as you breathe.',
    image: 'https://picsum.photos/800/1200?random=4'
  },
  {
    id: '5',
    name: 'Nomad Leather Bag',
    price: 1200,
    category: 'Accessories',
    description: 'Full grain leather sourced ethically. A companion for life\'s journeys.',
    image: 'https://picsum.photos/800/1200?random=5'
  },
  {
    id: '6',
    name: 'Savannah Linen Shirt',
    price: 320,
    category: 'Men',
    description: 'Breathable, structured linen for the equatorial sun.',
    image: 'https://picsum.photos/800/1200?random=6'
  }
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Echoes of the Hills',
    excerpt: 'How the topography of Rwanda influences the silhouette of our Fall collection.',
    image: 'https://picsum.photos/800/600?random=7',
    date: 'Oct 12, 2023',
    category: 'Fashion'
  },
  {
    id: '2',
    title: 'Silence is Luxury',
    excerpt: 'In a noisy world, we design clothes that speak without shouting.',
    image: 'https://picsum.photos/800/600?random=8',
    date: 'Sep 28, 2023',
    category: 'Poetry'
  },
  {
    id: '3',
    title: 'The Art of Weaving',
    excerpt: 'Meeting the artisans of Nyamirambo who craft our signature textiles.',
    image: 'https://picsum.photos/800/600?random=9',
    date: 'Sep 15, 2023',
    category: 'Culture'
  }
];

export const BRAND_STORY = `
  CoutureLaFleur is not merely fashion; it is a dialogue between two worlds. 
  Born from the vibrant heart of Kigali and polished by the timeless elegance of Paris, 
  we bridge the gap between heritage and haute couture. 
  
  We believe luxury is a feeling—a quiet confidence, a sense of belonging, 
  and the knowledge that what you wear tells a story of craftsmanship, dignity, and art.
`;
