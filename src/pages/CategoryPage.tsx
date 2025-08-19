import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Filters, { type FilterOptions } from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  getCategoryDisplayName,
  getCompaniesForCategory,
  getProductsForCategory,
  filterCategoryProducts,
  sortByPublishedDesc,
  shuffleProducts,
  type CategoryName,
  type CategoryProduct,
} from '@/data/categoryData';

const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryName = getCategoryDisplayName(categorySlug);

  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    companies: [],
    minPrice: 0,
    maxPrice: 5000,
  });

  // Adaptive page size: 4 on small screens, 6 on larger screens
  const getPageSize = () => (window.matchMedia('(min-width: 1024px)').matches ? 6 : 4);
  const [pageSize, setPageSize] = useState<number>(getPageSize());
  const [visibleLatestCount, setVisibleLatestCount] = useState(pageSize);
  const [visibleOthersCount, setVisibleOthersCount] = useState(pageSize);

  const allProducts = useMemo<CategoryProduct[]>(() => {
    if (!categoryName) return [];
    return getProductsForCategory(categoryName);
  }, [categoryName]);

  const availableCompanies = useMemo<string[]>(() => {
    if (!categoryName) return [];
    return getCompaniesForCategory(categoryName);
  }, [categoryName]);

  const [latestReviews, otherReviews] = useMemo(() => {
    const latest = sortByPublishedDesc(allProducts);
    const others = shuffleProducts(allProducts);
    return [latest, others] as const;
  }, [allProducts]);

  const filteredLatest = useMemo(() => {
    if (!activeFilters && !categoryName) return latestReviews;
    const company = activeFilters.companies[0];
    return filterCategoryProducts(latestReviews, company, activeFilters.minPrice, activeFilters.maxPrice);
  }, [activeFilters, categoryName, latestReviews]);

  const filteredOthers = useMemo(() => {
    if (!activeFilters && !categoryName) return otherReviews;
    const company = activeFilters.companies[0];
    return filterCategoryProducts(otherReviews, company, activeFilters.minPrice, activeFilters.maxPrice);
  }, [activeFilters, categoryName, otherReviews]);

  // Reset visible counts when filters or category change
  useEffect(() => {
    const handleResize = () => {
      const next = getPageSize();
      setPageSize(next);
      setVisibleLatestCount(next);
      setVisibleOthersCount(next);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset visible counts when filters or category change
  useEffect(() => {
    setVisibleLatestCount(pageSize);
    setVisibleOthersCount(pageSize);
  }, [pageSize, categoryName, activeFilters]);

  if (!categoryName) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="card-modern p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Category not found</h1>
            <p className="text-muted-foreground mb-6">Please choose a valid category.</p>
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const title = `${categoryName} Reviews`;

  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-1">Filter and browse all {categoryName.toLowerCase()} reviews</p>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:order-2 w-full lg:w-80">
            <Filters onFilterChange={handleFilterChange} showCategory={false} availableCompanies={availableCompanies} />
          </aside>

          {/* Content */}
          <main className="flex-1 lg:order-1">
            {/* Latest Reviews */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Latest Reviews</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVisibleLatestCount((c) => c + pageSize)}
                  disabled={visibleLatestCount >= filteredLatest.length}
                >
                  Show more
                </Button>
              </div>
              {filteredLatest.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredLatest.slice(0, visibleLatestCount).map((p) => (
                    <ProductCard key={p.id} product={{
                      id: p.id,
                      name: p.name,
                      image: '',
                      rating: 4.5,
                      price: p.price,
                      category: categoryName,
                      company: p.company,
                      dateAdded: p.publishedDate,
                      summary: p.description,
                      features: [],
                    }} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No items match the current filters.</div>
              )}
            </section>

            {/* Other Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Other Reviews</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVisibleOthersCount((c) => c + pageSize)}
                  disabled={visibleOthersCount >= filteredOthers.length}
                >
                  Show more
                </Button>
              </div>
              {filteredOthers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredOthers.slice(0, visibleOthersCount).map((p) => (
                    <ProductCard key={p.id} product={{
                      id: p.id,
                      name: p.name,
                      image: '',
                      rating: 4.3,
                      price: p.price,
                      category: categoryName,
                      company: p.company,
                      dateAdded: p.publishedDate,
                      summary: p.description,
                      features: [],
                    }} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No items match the current filters.</div>
              )}
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;


