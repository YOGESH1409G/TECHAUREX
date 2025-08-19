export interface DetailedProduct {
  id: number;
  name: string;
  images: string[]; // logical keys; mapped to actual assets by the UI
  category: string;
  features: string[];
  price: number;
  rating: number; // average rating 0-5
  totalReviews: number;
  description: string;
  affiliateLink: string;
}

// Minimal detailed entries for primary products. For others, the UI will synthesize details.
export const detailedProducts: DetailedProduct[] = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro Max',
    images: ['phone', 'phone', 'hero'],
    category: 'Smartphones',
    features: ['A17 Pro chip', '48MP camera', 'Titanium build', 'USB-C'],
    price: 1199,
    rating: 4.8,
    totalReviews: 150,
    description: 'The ultimate iPhone with titanium design and revolutionary camera system.',
    affiliateLink: 'https://example.com/affiliate/iphone15promax'
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    images: ['headphones', 'headphones', 'hero'],
    category: 'Headphones',
    features: ['30-hour battery', 'Quick Charge', 'Touch controls', 'Hi-Res Audio'],
    price: 399,
    rating: 4.7,
    totalReviews: 276,
    description: 'Industry-leading noise cancellation with premium sound quality.',
    affiliateLink: 'https://example.com/affiliate/sony-xm5'
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    images: ['laptop', 'laptop', 'hero'],
    category: 'Laptops',
    features: ['M3 chip', '18-hour battery', 'Liquid Retina display', 'MagSafe'],
    price: 1299,
    rating: 4.9,
    totalReviews: 312,
    description: 'Lightweight powerhouse with Apple\'s latest M3 chip technology.',
    affiliateLink: 'https://example.com/affiliate/macbook-air-m3'
  },
  {
    id: 8,
    name: 'Dell XPS 13 Plus',
    images: ['laptop', 'laptop', 'hero'],
    category: 'Laptops',
    features: ['OLED display', 'Premium materials', 'Compact design'],
    price: 1399,
    rating: 4.2,
    totalReviews: 198,
    description: 'Premium ultrabook with stunning InfinityEdge display.',
    affiliateLink: 'https://example.com/affiliate/dell-xps-13'
  }
];

export const getDetailedProductById = (id: number): DetailedProduct | null => {
  const direct = detailedProducts.find(p => p.id === id);
  if (direct) return direct;
  return null;
};

export const getAffiliateLinkById = (id: number): string => {
  const p = getDetailedProductById(id);
  return p?.affiliateLink ?? '#';
};


