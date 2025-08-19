import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/data/mockData';
import { categoryProducts } from '@/data/categoryData';

const mapCategoryToProduct = (p: any): Product => ({
  id: p.id,
  name: p.name,
  image: '',
  rating: 4.5,
  price: p.price,
  category: p.category,
  company: p.company,
  dateAdded: p.publishedDate,
  summary: p.description,
  features: [],
});

const Latest = () => {
  // Merge all sources and sort by date desc
  const merged: Product[] = (() => {
    const fromCategories = categoryProducts.map(mapCategoryToProduct);
    const map = new Map<number, Product>();
    [...mockProducts, ...fromCategories].forEach((p) => map.set(p.id, p));
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
  })();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Latest Reviews</h1>
          <span className="text-sm text-muted-foreground">{merged.length} items</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {merged.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Latest;


