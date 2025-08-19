import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockProducts, type Product, companies as knownCompanies } from '@/data/mockData';
import { categoryProducts } from '@/data/categoryData';

const toProductFromCategory = (p: any): Product => ({
  id: p.id,
  name: p.name,
  image: '',
  rating: 4.4,
  price: p.price,
  category: p.category,
  company: p.company,
  dateAdded: p.publishedDate,
  summary: p.description,
  features: [],
});

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const [term, setTerm] = useState(query.get('q') || '');

  useEffect(() => {
    const q = query.get('q') || '';
    setTerm(q);
  }, [query]);

  const allProducts: Product[] = useMemo(() => {
    const cats = categoryProducts.map(toProductFromCategory);
    // De-duplicate by id
    const map = new Map<number, Product>();
    [...mockProducts, ...cats].forEach(p => map.set(p.id, p));
    return Array.from(map.values());
  }, []);

  const { exactMatches, fallbackCompanyMatches, detectedCompany } = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return { exactMatches: [] as Product[], fallbackCompanyMatches: [] as Product[], detectedCompany: '' };

    const exact = allProducts.filter(p =>
      p.name.toLowerCase().includes(t) ||
      p.summary.toLowerCase().includes(t)
    );

    if (exact.length > 0) return { exactMatches: exact, fallbackCompanyMatches: [] as Product[], detectedCompany: '' };

    // Detect company from term; try known list first, then from products
    const allCompanies = Array.from(
      new Set([...knownCompanies, ...allProducts.map(p => p.company)])
    );
    const found = allCompanies.find(c => t.includes(c.toLowerCase())) || '';
    const fallback = found
      ? allProducts.filter(p => p.company.toLowerCase() === found.toLowerCase())
      : [];
    return { exactMatches: [] as Product[], fallbackCompanyMatches: fallback, detectedCompany: found };
  }, [allProducts, term]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const results = exactMatches.length > 0 ? exactMatches : fallbackCompanyMatches;
  const heading = exactMatches.length > 0
    ? `Search results for "${term}"`
    : (detectedCompany ? `No exact matches. Showing products from ${detectedCompany}` : `No products found for "${term}"`);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row gap-3">
          <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search for products or companies..." />
          <Button type="submit" className="btn-primary">Search</Button>
        </form>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-semibold">{heading}</h1>
          {results.length > 0 && (
            <span className="text-sm text-muted-foreground">{results.length} item{results.length > 1 ? 's' : ''}</span>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="card-modern p-8 text-center text-muted-foreground">Product not listed.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;


