import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import placeholderPhone from '@/assets/placeholder-phone.jpg';
import placeholderHeadphones from '@/assets/placeholder-headphones.jpg';
import placeholderLaptop from '@/assets/placeholder-laptop.jpg';
import heroGadgets from '@/assets/hero-gadgets.jpg';
import { mockProducts, type Product } from '@/data/mockData';
import { getDetailedProductById, getAffiliateLinkById } from '@/data/productDetails';

const imageMap: Record<string, string> = {
  phone: placeholderPhone,
  headphones: placeholderHeadphones,
  laptop: placeholderLaptop,
  hero: heroGadgets,
};

const toINR = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

const getFallbackFromProduct = (p: Product) => {
  const base = {
    id: p.id,
    name: p.name,
    images: [p.category === 'Laptops' ? 'laptop' : p.category === 'Headphones' || p.category === 'Audio' ? 'headphones' : 'phone', 'hero'],
    category: p.category,
    features: p.features.slice(0, 6),
    price: p.price,
    rating: p.rating,
    totalReviews: Math.floor(Math.random() * 300) + 80,
    description: p.summary,
    affiliateLink: '#',
  };
  return base;
};

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const stars = [] as JSX.Element[];
  for (let i = 0; i < full; i++) stars.push(<Star key={i} className="h-4 w-4 rating-star fill-current" />);
  if (half) stars.push(<Star key="half" className="h-4 w-4 rating-star fill-current opacity-50" />);
  while (stars.length < 5) stars.push(<Star key={`e-${stars.length}`} className="h-4 w-4 text-muted-foreground" />);
  return <div className="flex items-center space-x-1">{stars}</div>;
};

const ProductDetails = () => {
  const params = useParams();
  const productId = Number(params.id);

  const merged = useMemo(() => {
    const base = mockProducts.find(p => p.id === productId);
    if (!base) return null;
    const detailed = getDetailedProductById(productId);
    if (detailed) return detailed;
    return getFallbackFromProduct(base);
  }, [productId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  if (!merged) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="card-modern p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Product not found</h1>
            <Button asChild><Link to="/">Go Home</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = merged.images.map(key => imageMap[key] ?? heroGadgets);
  const affiliateLink = getAffiliateLinkById(merged.id) || '#';

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/" className="inline-flex items-center"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Home</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image Carousel */}
          <div className="card-modern p-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img src={images[currentIndex]} alt={merged.name} className="w-full h-full object-cover" />
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  <button onClick={prev} className="p-2 rounded-full bg-background/70 hover:bg-background transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={next} className="p-2 rounded-full bg-background/70 hover:bg-background transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {images.slice(0, 4).map((src, idx) => (
                  <button key={idx} onClick={() => setCurrentIndex(idx)} className={`aspect-video rounded overflow-hidden border ${idx === currentIndex ? 'border-primary' : 'border-border'}`}>
                    <img src={src} alt={`${merged.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">{merged.name}</h1>
                <span className="text-xl font-semibold text-primary">{toINR(merged.price)}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{merged.category}</div>
            </div>

            <div className="flex items-center space-x-3">
              <Stars rating={merged.rating} />
              <span className="text-sm text-muted-foreground">{merged.rating.toFixed(1)} ({merged.totalReviews} reviews)</span>
            </div>

            <p className="text-muted-foreground">{merged.description}</p>

            <div className="flex flex-wrap gap-2">
              {merged.features.map((f, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{f}</Badge>
              ))}
            </div>

            {/* Purchase */}
            <div className="flex flex-wrap gap-3">
              <Button asChild className="btn-primary">
                <a href={affiliateLink} target="_blank" rel="noreferrer">
                  Purchase <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={affiliateLink} target="_blank" rel="noreferrer">View Deal</a>
              </Button>
            </div>

            {/* Rate this product */}
            <div className="card-modern p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Rate this product</h3>
                  <p className="text-xs text-muted-foreground">Your rating helps others. (Saved locally, backend integration later)</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setUserRating(n)}>
                      <Star className={`h-5 w-5 ${userRating && userRating >= n ? 'rating-star fill-current' : 'text-muted-foreground'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;


