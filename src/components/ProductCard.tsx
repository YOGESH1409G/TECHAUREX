import { Star, Tag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/mockData';
import heroGadgets from '@/assets/hero-gadgets.jpg';
import placeholderPhone from '@/assets/placeholder-phone.jpg';
import placeholderHeadphones from '@/assets/placeholder-headphones.jpg';
import placeholderLaptop from '@/assets/placeholder-laptop.jpg';
import { useNavigate } from 'react-router-dom';
import { getAffiliateLinkById } from '@/data/productDetails';

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

/**
 * Product Card Component
 * Displays product information with rating, price, and call-to-action
 * Features: Hover effects, responsive design, rating display
 */
const ProductCard = ({ product, showBadge = true }: ProductCardProps) => {
  const navigate = useNavigate();
  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 rating-star fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 rating-star fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
      );
    }

    return stars;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  // Helper function to get appropriate image for product
  const getProductImage = (product: Product) => {
    if (product.category === 'Smartphones') return placeholderPhone;
    if (product.category === 'Headphones' || product.category === 'Audio') return placeholderHeadphones;
    if (product.category === 'Laptops') return placeholderLaptop;
    return heroGadgets; // fallback image
  };

  const affiliateLink = getAffiliateLinkById(product.id) || '#';

  return (
    <div className="card-modern p-6 group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
      {/* Product Image */}
      <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
        <img 
          src={getProductImage(product)} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Header with badges */}
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          {showBadge && product.isNew && (
            <Badge className="bg-success text-success-foreground ml-2">NEW</Badge>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({Math.floor(Math.random() * 500) + 50} reviews)
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.summary}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {product.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {product.features.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{product.features.length - 2} more
            </Badge>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="flex items-center space-x-1 text-xs text-success">
                <Tag className="h-3 w-3" />
                <span>
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>

          <Button size="sm" className="btn-primary group" asChild onClick={(e) => e.stopPropagation()}>
            <a href={affiliateLink} target="_blank" rel="noreferrer">
              <span className="mr-2">View Deal</span>
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span>{product.company}</span>
          <span>{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;