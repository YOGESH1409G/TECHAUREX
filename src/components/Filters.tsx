import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { categories, companies } from '@/data/mockData';

interface FiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  showCategory?: boolean;
  availableCompanies?: string[];
}

export interface FilterOptions {
  categories: string[];
  companies: string[];
  minPrice: number;
  maxPrice: number;
}

/**
 * Filters Sidebar Component
 * Features: Category, company, and price range filtering
 * Responsive: Collapsible on mobile
 */
const Filters = ({ onFilterChange, showCategory = true, availableCompanies }: FiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  // Update filters when any filter changes
  const updateFilters = (
    newCategories = selectedCategories,
    newCompanies = selectedCompanies,
    newMinPrice = minPrice,
    newMaxPrice = maxPrice
  ) => {
    onFilterChange({
      categories: newCategories,
      companies: newCompanies,
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    
    setSelectedCategories(newCategories);
    updateFilters(newCategories);
  };

  const handleCompanyChange = (company: string, checked: boolean) => {
    const newCompanies = checked
      ? [...selectedCompanies, company]
      : selectedCompanies.filter((c) => c !== company);
    
    setSelectedCompanies(newCompanies);
    updateFilters(undefined, newCompanies);
  };

  const handlePriceChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    updateFilters(undefined, undefined, newMinPrice, newMaxPrice);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedCompanies([]);
    setMinPrice(0);
    setMaxPrice(5000);
    updateFilters([], [], 0, 5000);
  };

  return (
    <div className="w-full lg:w-80">
      <div className="card-modern p-6 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className={`space-y-6 ${!isExpanded ? 'hidden lg:block' : ''}`}>
          {/* Categories Filter */}
          {showCategory && (
            <div>
              <Label className="text-base font-medium mb-3 block">Categories</Label>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, !!checked)
                      }
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Price Range</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                    Min Price
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={minPrice}
                    onChange={(e) =>
                      handlePriceChange(Number(e.target.value), maxPrice)
                    }
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                    Max Price
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) =>
                      handlePriceChange(minPrice, Number(e.target.value))
                    }
                    placeholder="5000"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
              </div>
            </div>
          </div>

          {/* Company Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Companies</Label>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {(availableCompanies ?? companies).map((company) => (
                <div key={company} className="flex items-center space-x-2">
                  <Checkbox
                    id={`company-${company}`}
                    checked={selectedCompanies.includes(company)}
                    onCheckedChange={(checked) =>
                      handleCompanyChange(company, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`company-${company}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {company}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;