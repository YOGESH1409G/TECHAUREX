export type CategoryName = 'Mobile' | 'Laptop' | 'Earphone';

export interface CategoryProduct {
  id: number;
  name: string;
  category: CategoryName;
  company: string;
  price: number;
  publishedDate: string; // ISO date string
  description: string;
}

export const categoryProducts: CategoryProduct[] = [
  // Mobile
  {
    id: 101,
    name: 'iPhone 15 Pro',
    category: 'Mobile',
    company: 'Apple',
    price: 1199,
    publishedDate: '2024-06-15',
    description: 'Titanium build, A17 Pro, improved cameras, and USB‑C for pros.'
  },
  {
    id: 102,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Mobile',
    company: 'Samsung',
    price: 1299,
    publishedDate: '2024-05-20',
    description: 'Stunning display, powerful zoom, and long-lasting battery life.'
  },
  {
    id: 103,
    name: 'Google Pixel 8',
    category: 'Mobile',
    company: 'Google',
    price: 799,
    publishedDate: '2024-04-12',
    description: 'Clean Android, exceptional camera, and AI-powered features.'
  },
  {
    id: 104,
    name: 'OnePlus 12',
    category: 'Mobile',
    company: 'OnePlus',
    price: 899,
    publishedDate: '2024-03-02',
    description: 'Flagship performance with fast charging and sleek design.'
  },
  {
    id: 105,
    name: 'Nothing Phone (2a)',
    category: 'Mobile',
    company: 'Nothing',
    price: 449,
    publishedDate: '2024-02-10',
    description: 'Unique glyph interface, smooth performance, excellent value.'
  },
  {
    id: 106,
    name: 'Xiaomi 14 Pro',
    category: 'Mobile',
    company: 'Xiaomi',
    price: 999,
    publishedDate: '2024-01-22',
    description: 'Bright display, fast charging, and excellent value flagship specs.'
  },
  {
    id: 107,
    name: 'Motorola Edge 40',
    category: 'Mobile',
    company: 'Motorola',
    price: 699,
    publishedDate: '2023-12-12',
    description: 'Clean Android, curved display, and solid battery life.'
  },
  {
    id: 108,
    name: 'Oppo Find X6',
    category: 'Mobile',
    company: 'OPPO',
    price: 899,
    publishedDate: '2023-11-28',
    description: 'Premium design with versatile cameras and fast charging.'
  },
  {
    id: 109,
    name: 'Vivo X100',
    category: 'Mobile',
    company: 'Vivo',
    price: 849,
    publishedDate: '2023-11-10',
    description: 'Zeiss-tuned cameras with powerful performance and AMOLED display.'
  },
  {
    id: 110,
    name: 'Realme GT 5',
    category: 'Mobile',
    company: 'Realme',
    price: 599,
    publishedDate: '2023-10-25',
    description: 'High performance at an aggressive price with rapid charging.'
  },
  {
    id: 111,
    name: 'Asus ROG Phone 7',
    category: 'Mobile',
    company: 'ASUS',
    price: 1099,
    publishedDate: '2023-09-12',
    description: 'Gaming-focused phone with top-tier performance and cooling.'
  },
  {
    id: 112,
    name: 'Nokia XR21',
    category: 'Mobile',
    company: 'Nokia',
    price: 499,
    publishedDate: '2023-08-18',
    description: 'Rugged smartphone with long battery life and clean software.'
  },

  // Laptop
  {
    id: 201,
    name: 'MacBook Air M3',
    category: 'Laptop',
    company: 'Apple',
    price: 1299,
    publishedDate: '2024-05-01',
    description: 'Ultra-portable with superb efficiency and bright Liquid Retina display.'
  },
  {
    id: 202,
    name: 'Dell XPS 15',
    category: 'Laptop',
    company: 'Dell',
    price: 1899,
    publishedDate: '2024-04-08',
    description: 'Premium build, vibrant OLED option, and strong creator performance.'
  },
  {
    id: 203,
    name: 'HP Spectre x360',
    category: 'Laptop',
    company: 'HP',
    price: 1599,
    publishedDate: '2024-03-14',
    description: 'Elegant 2-in-1 with great keyboard, battery life, and port selection.'
  },
  {
    id: 204,
    name: 'ASUS ROG Zephyrus G14',
    category: 'Laptop',
    company: 'Asus',
    price: 1999,
    publishedDate: '2024-02-18',
    description: 'Compact gaming beast with high-refresh display and solid thermals.'
  },
  {
    id: 205,
    name: 'Lenovo ThinkPad X1 Carbon',
    category: 'Laptop',
    company: 'Lenovo',
    price: 1699,
    publishedDate: '2024-01-28',
    description: 'Iconic business laptop with best-in-class keyboard and durability.'
  },

  // Earphone
  {
    id: 301,
    name: 'Sony WF-1000XM5',
    category: 'Earphone',
    company: 'Sony',
    price: 299,
    publishedDate: '2024-06-02',
    description: 'Top-tier ANC, balanced sound, and comfortable lightweight fit.'
  },
  {
    id: 302,
    name: 'AirPods Pro (2nd Gen)',
    category: 'Earphone',
    company: 'Apple',
    price: 249,
    publishedDate: '2024-04-22',
    description: 'Seamless iOS integration, strong ANC, and spatial audio.'
  },
  {
    id: 303,
    name: 'Bose QuietComfort Ultra Earbuds',
    category: 'Earphone',
    company: 'Bose',
    price: 299,
    publishedDate: '2024-03-30',
    description: 'Rich sound with excellent noise cancelling and comfort.'
  },
  {
    id: 304,
    name: 'Nothing Ear (a)',
    category: 'Earphone',
    company: 'Nothing',
    price: 99,
    publishedDate: '2024-02-12',
    description: 'Playful design, clear sound, and great value for the price.'
  },
  {
    id: 305,
    name: 'Jabra Elite 8 Active',
    category: 'Earphone',
    company: 'Jabra',
    price: 199,
    publishedDate: '2024-01-05',
    description: 'Rugged, secure fit earbuds ideal for workouts and outdoor use.'
  }
];

export const getCategoryDisplayName = (slug: string): CategoryName | null => {
  const lower = slug.toLowerCase();
  if (lower === 'mobile') return 'Mobile';
  if (lower === 'laptop') return 'Laptop';
  if (lower === 'earphone') return 'Earphone';
  return null;
};

export const getProductsForCategory = (category: CategoryName): CategoryProduct[] =>
  categoryProducts
    .filter(p => p.category === category)
    .slice();

export const getCompaniesForCategory = (category: CategoryName): string[] => {
  const set = new Set<string>();
  for (const p of categoryProducts) {
    if (p.category === category) set.add(p.company);
  }
  return Array.from(set).sort();
};

export const filterCategoryProducts = (
  products: CategoryProduct[],
  company?: string,
  minPrice?: number,
  maxPrice?: number
): CategoryProduct[] => {
  return products.filter(p => {
    if (company && p.company !== company) return false;
    if (typeof minPrice === 'number' && p.price < minPrice) return false;
    if (typeof maxPrice === 'number' && p.price > maxPrice) return false;
    return true;
  });
};

export const sortByPublishedDesc = (products: CategoryProduct[]): CategoryProduct[] =>
  products.slice().sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

export const shuffleProducts = (products: CategoryProduct[]): CategoryProduct[] => {
  const arr = products.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};


