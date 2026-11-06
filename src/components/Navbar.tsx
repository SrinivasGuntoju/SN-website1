import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenWishlist,
}) => {
  const { cart, wishlist, setIsCartOpen, comparedProductIds, setIsCompareOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'shop', label: 'All Soaps' },
    { id: 'gift-box', label: '3-Soap Box' },
    { id: 'story', label: 'Our Story' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'wholesale', label: 'Wholesale' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Slim Promotional Bar (≤ 40px) */}
      {showPromoBanner && (
        <div className="bg-[#7E2433] text-[#FFFDF9] text-xs py-2 px-4 flex items-center justify-between border-b border-[#5C1723]/30">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-wide text-center">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C6C3] shrink-0 hidden sm:inline" />
            <span>
              Complimentary Express Shipping on all orders above ₹599 • Use code{' '}
              <span className="font-semibold text-[#F4C6C3] underline decoration-[#F4C6C3]/50">GLOW10</span> for 10% off
            </span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            aria-label="Dismiss banner"
            className="text-white/70 hover:text-white p-0.5 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: 3 Zones */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-luxury shadow-xs border-b border-[#E8DCCF]/80 py-2.5'
            : 'bg-[#FBF4EA]/95 border-b border-[#E8DCCF]/50 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 md:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7E2433] rounded-md transition-opacity hover:opacity-90"
            aria-label="SN Alankarana Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Zone 2: Clean single-line text links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wider uppercase text-[#3C352D]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors py-1 whitespace-nowrap shrink-0 relative group ${
                  currentView === link.id
                    ? 'text-[#7E2433] font-semibold'
                    : 'text-[#4A4036] hover:text-[#7E2433]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#7E2433] transform transition-transform duration-200 origin-left ${
                    currentView === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Wishlist, Cart Drawer) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#4A4036] hover:text-[#7E2433] hover:bg-[#F3E8DA] rounded-full transition-colors"
              aria-label="Search Soaps"
              title="Search Soaps"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#4A4036] hover:text-[#7E2433] hover:bg-[#F3E8DA] rounded-full transition-colors relative"
              aria-label="Wishlist"
              title="Favorites"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7E2433] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Compare Side-by-Side Trigger */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="p-2 text-[#4A4036] hover:text-[#7E2433] hover:bg-[#F3E8DA] rounded-full transition-colors relative"
              aria-label="Compare Soaps"
              title="Compare Soaps (Up to 3)"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              {comparedProductIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1E1E1E] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {comparedProductIds.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#7E2433] text-[#FFFDF9] hover:bg-[#5C1723] rounded-full transition-all shadow-xs text-xs sm:text-sm font-medium tracking-wide active:scale-95"
              aria-label={`Shopping Bag with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-sans">Bag</span>
              <span className="w-5 h-5 bg-[#FFFDF9] text-[#7E2433] text-xs font-semibold rounded-full flex items-center justify-center leading-none">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A4036] hover:text-[#7E2433] hover:bg-[#F3E8DA] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF4EA] border-b border-[#E8DCCF] px-6 py-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase text-[#3C352D]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-[#E8DCCF]/40 flex items-center justify-between ${
                  currentView === link.id ? 'text-[#7E2433] font-semibold' : 'text-[#4A4036]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#7E2433]/60">→</span>
              </button>
            ))}

            <button
              onClick={() => {
                setIsCompareOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#E8DCCF]/40 flex items-center justify-between text-[#7E2433] font-semibold"
            >
              <span>Compare Soaps ({comparedProductIds.length}/3)</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-between text-xs text-[#6B5E51]">
              <span>Handcrafted in India • 100% Herbal</span>
              <button
                onClick={() => {
                  onNavigate('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-[#7E2433] font-semibold underline"
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
