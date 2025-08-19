import { useRef, useState } from 'react';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

/**
 * Responsive Navigation Component
 * Features: Mobile menu toggle, search functionality, clean design
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState<boolean>(() => document.documentElement.classList.contains('dark'));

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' }
  ];
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const CLOSE_DELAY_MS = 280; // tweak this value to adjust hover close delay

  const openCategories = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setIsCategoriesOpen(true);
  };

  const scheduleCloseCategories = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      setIsCategoriesOpen(false);
      hideTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length === 0) return;
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">Techaurex</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={openCategories}
              onMouseLeave={scheduleCloseCategories}
            >
              <button
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsCategoriesOpen((v) => !v)}
              >
                Categories
              </button>
              {isCategoriesOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 card-modern p-2"
                  onMouseEnter={openCategories}
                  onMouseLeave={scheduleCloseCategories}
                >
                  <Link to="/category/mobile" className="block px-3 py-2 rounded hover:bg-muted">Mobile</Link>
                  <Link to="/category/laptop" className="block px-3 py-2 rounded hover:bg-muted">Laptop</Link>
                  <Link to="/category/earphone" className="block px-3 py-2 rounded hover:bg-muted">Earphone</Link>
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button type="submit" size="sm" className="btn-primary">
              Search
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </form>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-2">Categories</div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/category/mobile" className="px-3 py-2 rounded bg-muted" onClick={() => setIsMenuOpen(false)}>Mobile</Link>
                  <Link to="/category/laptop" className="px-3 py-2 rounded bg-muted" onClick={() => setIsMenuOpen(false)}>Laptop</Link>
                  <Link to="/category/earphone" className="px-3 py-2 rounded bg-muted" onClick={() => setIsMenuOpen(false)}>Earphone</Link>
                </div>
              </div>
            </nav>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search gadgets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" size="sm" className="btn-primary">
                Search
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? 'Light' : 'Dark'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;