import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Sparkles, Search } from 'lucide-react';
import { Product, SkinConcern, SkinType } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

interface ShopViewProps {
  onSelectProduct: (product: Product) => void;
  initialConcern?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({ onSelectProduct, initialConcern = 'All' }) => {
  const { comparedProductIds, setIsCompareOpen } = useCart();
  const [selectedConcern, setSelectedConcern] = useState<string>(initialConcern);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const concerns: { id: string; label: string }[] = [
    { id: 'All', label: 'All Rituals' },
    { id: 'Brightening', label: 'Radiance & Glow' },
    { id: 'Deep Cleanse', label: 'Deep Pore Cleanse' },
    { id: 'Moisturizing', label: 'Deep Hydration' },
    { id: 'Anti-pigmentation', label: 'Dark Spot Correction' },
  ];

  const skinTypes = ['All', 'Dry Skin', 'Oily & Combination', 'All Skin Types'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchConcern = selectedConcern === 'All' || p.concern === selectedConcern;
      const matchSkin = selectedSkinType === 'All' || p.skinType === selectedSkinType;
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyIngredients.some((k) => k.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchConcern && matchSkin && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedConcern, selectedSkinType, sortBy, searchQuery]);

  return (
    <div className="py-10 md:py-16 bg-[#FBF4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-script text-2xl sm:text-3xl text-[#7E2433]">The Sacred Collection</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mt-1">
            Artisanal Cold-Processed Soaps
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E51] mt-2 font-light">
            Formulated in slow, small batches using food-grade plant oils, fresh goat milk, and pure Ayurvedic herbs.
          </p>
        </div>

        {/* Filter Controls Bar (Interactive Segmented Control adhering to §1.A) */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DCCF] p-4 mb-8 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Concern Segmented Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-[#F5ECE1] rounded-xl">
              {concerns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConcern(c.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                    selectedConcern === c.id
                      ? 'bg-[#7E2433] text-white shadow-xs font-semibold'
                      : 'text-[#4A4036] hover:text-[#1E1E1E]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Right Tools: Sort By & Search Input */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              {/* Search */}
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-[#9C8E7E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter soaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF4ED] border border-[#E8DCCF] rounded-lg text-xs placeholder:text-[#9C8E7E] focus:outline-hidden focus:ring-1 focus:ring-[#7E2433]"
                />
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1.5 bg-[#FAF4ED] border border-[#E8DCCF] rounded-lg text-xs text-[#1E1E1E] focus:outline-hidden"
              >
                <option value="featured">Featured Artisanal</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Skin Type Pills Sub-Row */}
          <div className="flex items-center gap-2 text-xs text-[#6B5E51] pt-2 border-t border-[#F5ECE1]">
            <span className="font-medium text-[11px] uppercase tracking-wider text-[#9C8E7E]">
              Skin Type:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skinTypes.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedSkinType(st)}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
                    selectedSkinType === st
                      ? 'bg-[#EADBCC] text-[#1E1E1E] font-semibold'
                      : 'text-[#6B5E51] hover:text-[#1E1E1E]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count & Compare Quick Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B5E51] mb-6">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="text-[#1E1E1E]">{filteredProducts.length}</strong> handcrafted formula(s)
            </span>
            <span className="hidden sm:inline text-[#9C8E7E]">•</span>
            <span className="hidden sm:inline text-[#6B5E51]">
              Tap <SlidersHorizontal className="w-3 h-3 inline text-[#7E2433] mx-0.5" /> to compare up to 3 soaps
            </span>
          </div>

          <div className="flex items-center gap-2">
            {comparedProductIds.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-3 py-1 bg-[#1E1E1E] text-white hover:bg-[#7E2433] rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Compare Selected ({comparedProductIds.length}/3)</span>
              </button>
            )}
            <span className="text-[11px] text-[#5B6B2F] font-medium">Free express delivery on ₹599+</span>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop / 2-column tablet per guidelines */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DCCF] p-8">
            <Sparkles className="w-8 h-8 text-[#9C8E7E] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">No matching soaps found</h3>
            <p className="text-xs text-[#6B5E51] mt-1 max-w-sm mx-auto">
              Try adjusting your filter selection or clear the search query to explore our core collection.
            </p>
            <button
              onClick={() => {
                setSelectedConcern('All');
                setSelectedSkinType('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 bg-[#7E2433] text-white text-xs rounded-full font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onSelect={onSelectProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
