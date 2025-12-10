
import { Article, Product } from "./types";

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Magazine', href: '/magazine' },
];

// Placeholder content
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Kigali Trench',
    price: 850,
    category: 'women',
    description: 'A structured oversized trench coat inspired by the rolling hills of Rwanda. Made from organic linen and silk blend.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1627225924765-552d49cf474d?auto=format&fit=crop&w=800&q=80',
    isNew: true,
  },
  {
    id: '2',
    name: 'Silk Ébène Dress',
    price: 1200,
    category: 'women',
    description: 'Hand-dyed midnight black silk that flows like water. Features subtle gold embroidery at the hem.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    isNew: true,
  },
  {
    id: '3',
    name: 'Heritage Gold Cuff',
    price: 350,
    category: 'accessories',
    description: 'Solid brass cuff hammered by artisans in Nyamirambo. A symbol of enduring strength.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Savannah Blazer',
    price: 920,
    category: 'women',
    description: 'Tailored for the modern muse. Earth tones meet sharp Parisian tailoring.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Noir Velvet Gown',
    price: 2400,
    category: 'women',
    description: 'Deep velvet evening wear for the gala. Minimalist silhouette with maximum impact.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'Imigongo Scarf',
    price: 180,
    category: 'accessories',
    description: 'Silk scarf featuring geometric patterns inspired by traditional Imigongo art.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    name: 'Nyanza Linen Suit',
    price: 1100,
    category: 'men',
    description: 'A relaxed yet refined linen suit in oatmeal beige. Perfect for the tropical highlands.',
    image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    isNew: true,
  },
  {
    id: '8',
    name: 'Midnight Collar Shirt',
    price: 280,
    category: 'men',
    description: 'Crisp cotton poplin shirt with a mandarin collar. Minimalist luxury for the modern man.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '9',
    name: 'Kivu Leather Weekender',
    price: 950,
    category: 'accessories',
    description: 'Full-grain leather travel bag handcrafted in Kigali. Ages beautifully with every journey.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80',
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Poetics of Cloth',
    excerpt: 'Exploring the emotional weight of fabric choices in our latest collection.',
    category: 'Philosophy',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    date: 'Oct 12, 2023'
  },
  {
    id: '2',
    title: 'Kigali Rising',
    excerpt: 'How the city of a thousand hills is becoming a global fashion capital.',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1523380744952-b7e00e6db13ec?auto=format&fit=crop&w=800&q=80',
    date: 'Nov 05, 2023'
  },
  {
    id: '3',
    title: 'Minimalism as Identity',
    excerpt: 'Why stripping away the excess reveals the true self.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1509319117193-518da7277289?auto=format&fit=crop&w=800&q=80',
    date: 'Dec 01, 2023'
  }
];
