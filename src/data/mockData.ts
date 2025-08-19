// Mock data for gadget reviews and products

export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  category: string;
  company: string;
  dateAdded: string;
  summary: string;
  features: string[];
  isNew?: boolean;
  isFlagship?: boolean;
  isAffordable?: boolean;
}

export const categories = [
  "Smartphones",
  "Laptops",
  "Headphones",
  "Tablets",
  "Cameras",
  "Smart Watches",
  "Gaming",
  "Audio",
  "Accessories"
];

export const companies = [
  "Apple",
  "Samsung",
  "Sony",
  "Bose",
  "Canon",
  "Nikon",
  "Dell",
  "HP",
  "Asus",
  "Microsoft"
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    image: "/placeholder-phone.jpg",
    rating: 4.8,
    price: 1199,
    originalPrice: 1299,
    category: "Smartphones",
    company: "Apple",
    dateAdded: "2024-01-15",
    summary: "The ultimate iPhone with titanium design and revolutionary camera system.",
    features: ["A17 Pro chip", "48MP camera", "Titanium build", "USB-C"],
    isNew: true,
    isFlagship: true
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    image: "/placeholder-headphones.jpg",
    rating: 4.7,
    price: 399,
    originalPrice: 449,
    category: "Headphones",
    company: "Sony",
    dateAdded: "2024-01-10",
    summary: "Industry-leading noise cancellation with premium sound quality.",
    features: ["30-hour battery", "Quick Charge", "Touch controls", "Hi-Res Audio"],
    isNew: true,
    isFlagship: true
  },
  {
    id: 3,
    name: "MacBook Air M3",
    image: "/placeholder-laptop.jpg",
    rating: 4.9,
    price: 1299,
    category: "Laptops",
    company: "Apple",
    dateAdded: "2024-01-08",
    summary: "Lightweight powerhouse with Apple's latest M3 chip technology.",
    features: ["M3 chip", "18-hour battery", "Liquid Retina display", "MagSafe"],
    isFlagship: true
  },
  {
    id: 4,
    name: "Samsung Galaxy Buds Pro",
    image: "/placeholder-earbuds.jpg",
    rating: 4.3,
    price: 149,
    originalPrice: 199,
    category: "Audio",
    company: "Samsung",
    dateAdded: "2024-01-05",
    summary: "Premium wireless earbuds with active noise cancellation.",
    features: ["ANC", "IPX7 waterproof", "28-hour battery", "360 Audio"],
    isAffordable: true
  },
  {
    id: 5,
    name: "Canon EOS R8",
    image: "/placeholder-camera.jpg",
    rating: 4.6,
    price: 1499,
    category: "Cameras",
    company: "Canon",
    dateAdded: "2024-01-03",
    summary: "Full-frame mirrorless camera for content creators and professionals.",
    features: ["24.2MP sensor", "4K video", "Dual Pixel CMOS AF", "In-body stabilization"],
    isFlagship: true
  },
  {
    id: 6,
    name: "iPad Air 5th Gen",
    image: "/placeholder-tablet.jpg",
    rating: 4.5,
    price: 599,
    category: "Tablets",
    company: "Apple",
    dateAdded: "2024-01-01",
    summary: "Versatile tablet with M1 chip for work and creativity.",
    features: ["M1 chip", "Liquid Retina display", "Apple Pencil support", "USB-C"],
    isAffordable: true
  },
  {
    id: 7,
    name: "Bose QuietComfort Earbuds",
    image: "/placeholder-earbuds2.jpg",
    rating: 4.4,
    price: 279,
    originalPrice: 329,
    category: "Audio",
    company: "Bose",
    dateAdded: "2023-12-28",
    summary: "World-class noise cancellation in true wireless earbuds.",
    features: ["Noise cancellation", "6-hour battery", "IPX4 rated", "Touch controls"],
    isAffordable: true
  },
  {
    id: 8,
    name: "Dell XPS 13 Plus",
    image: "/placeholder-laptop2.jpg",
    rating: 4.2,
    price: 1399,
    category: "Laptops",
    company: "Dell",
    dateAdded: "2023-12-25",
    summary: "Premium ultrabook with stunning InfinityEdge display.",
    features: ["12th Gen Intel", "OLED display", "Premium materials", "Compact design"],
    isFlagship: true
  }
];

// Helper functions to filter products
export const getLatestProducts = () => 
  mockProducts
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 6);

export const getFlagshipProducts = () => 
  mockProducts.filter(product => product.isFlagship);

export const getAffordableProducts = () => 
  mockProducts.filter(product => product.isAffordable);

export const filterProducts = (
  products: Product[], 
  category?: string, 
  company?: string, 
  minPrice?: number, 
  maxPrice?: number
) => {
  return products.filter(product => {
    if (category && product.category !== category) return false;
    if (company && product.company !== company) return false;
    if (minPrice && product.price < minPrice) return false;
    if (maxPrice && product.price > maxPrice) return false;
    return true;
  });
};