import { useState } from 'react';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import Footer from '@/components/Footer';
import type { FilterOptions } from '@/components/Filters';
import { 
  getLatestProducts, 
  getFlagshipProducts, 
  getAffordableProducts,
  filterProducts,
  type Product
} from '@/data/mockData';

/**
 * Main Landing Page Component
 * Features: Hero section, product sections, filtering, responsive design
 */
const Index = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    companies: [],
    minPrice: 0,
    maxPrice: 5000,
  });

  // Get product sections
  const latestProducts = getLatestProducts();
  const flagshipProducts = getFlagshipProducts();
  const affordableProducts = getAffordableProducts();

  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
    
    // Apply filters to all products
    const allProducts = [...latestProducts, ...flagshipProducts, ...affordableProducts];
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex((p) => p.id === product.id)
    );
    
    const filtered = filterProducts(
      uniqueProducts,
      filters.categories.length > 0 ? filters.categories[0] : undefined,
      filters.companies.length > 0 ? filters.companies[0] : undefined,
      filters.minPrice,
      filters.maxPrice
    );
    
    setFilteredProducts(filtered);
  };

  const hasActiveFilters = 
    activeFilters.categories.length > 0 || 
    activeFilters.companies.length > 0 || 
    activeFilters.minPrice > 0 || 
    activeFilters.maxPrice < 5000;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Ultimate Guide to{' '}
              <span className="text-primary">Gadgets</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the latest tech reviews, compare prices, and find the perfect gadgets 
              for your lifestyle with our expert recommendations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="btn-primary text-lg px-8" asChild>
                <a href="/latest">
                <Zap className="h-5 w-5 mr-2" />
                Explore Latest Reviews
                <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Shield className="h-5 w-5 mr-2" />
                Buying Guides
              </Button>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Products Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-3xl font-bold text-primary mb-2">
                <span>4.9</span>
                <Star className="h-6 w-6 rating-star fill-current" />
              </div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:order-2">
            <Filters onFilterChange={handleFilterChange} />
          </aside>

          {/* Content Area */}
          <main className="flex-1 lg:order-1">
            {/* Show filtered results if filters are active */}
            {hasActiveFilters && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-foreground">
                    Filtered Results
                  </h2>
                  <span className="text-muted-foreground">
                    {filteredProducts.length} products found
                  </span>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No products match your current filters.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => handleFilterChange({
                        categories: [],
                        companies: [],
                        minPrice: 0,
                        maxPrice: 5000,
                      })}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </section>
            )}

            {/* Latest Reviews Section */}
            {!hasActiveFilters && (
              <>
                <section id="latest" className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-foreground">Latest Reviews</h2>
                    <Button variant="outline">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {latestProducts.map((product) => (
                      <ProductCard key={product.id} product={product} showBadge />
                    ))}
                  </div>
                </section>

                {/* Flagship Products Section */}
                <section id="flagship" className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-foreground">Flagship Product Reviews</h2>
                    <Button variant="outline">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {flagshipProducts.slice(0, 6).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>

                {/* Affordable Gadgets Section */}
                <section id="affordable" className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-foreground">Affordable Gadgets Reviews</h2>
                    <Button variant="outline">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {affordableProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;