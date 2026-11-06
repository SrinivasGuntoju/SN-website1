import React, { useState } from 'react';
import { Search, X, Sparkles, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.concern.toLowerCase().includes(q) ||
          p.skinType.toLowerCase().includes(q) ||
          p.keyIngredients.some((k) => k.name.toLowerCase().includes(q))
        );
      })
    : PRODUCTS;

  const popularSearches = ['Goat Milk', 'Charcoal', 'Red Wine', 'Ubtan', 'Papaya', 'Pigmentation', 'Acne'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-10 animate-fadeIn">
      <div className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col mt-10">
        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8DCCF] bg-[#FBF4EA] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#7E2433] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by ingredient, soap name, or skin concern..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#1E1E1E] placeholder:text-[#9C8E7E] focus:outline-hidden font-serif"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#9C8E7E] hover:text-[#1E1E1E] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-5 py-3 bg-[#FAF4ED] border-b border-[#E8DCCF] flex items-center gap-2 overflow-x-auto text-xs text-[#6B5E51]">
          <span className="shrink-0 font-medium">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-white border border-[#E8DCCF] rounded-lg text-xs hover:border-[#7E2433] hover:text-[#7E2433] shrink-0 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="p-5 max-h-96 overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#6B5E51]">
              <p className="font-serif text-base">No herbal formulas matched "{query}"</p>
              <p className="text-xs mt-1">Try searching for "Wine", "Honey", "Charcoal", or "Papaya"</p>
            </div>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(prod);
                }}
                className="p-3 bg-white border border-[#E8DCCF] rounded-2xl flex items-center gap-3.5 hover:border-[#7E2433] transition-colors cursor-pointer group"
              >
                <img
                  src={prod.posterImage}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-semibold text-[#7E2433]">
                      {prod.concern}
                    </span>
                    <span className="text-[#9C8E7E] text-[10px]">•</span>
                    <span className="text-[10px] text-[#6B5E51]">{prod.skinType}</span>
                  </div>
                  <h4 className="font-serif font-semibold text-sm text-[#1E1E1E] group-hover:text-[#7E2433] transition-colors truncate">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-[#6B5E51] truncate">{prod.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-sm font-semibold text-[#1E1E1E]">
                    ₹{prod.price}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#C8872E]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-mono">{prod.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
