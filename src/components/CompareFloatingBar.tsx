import React from 'react';
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const CompareFloatingBar: React.FC = () => {
  const {
    comparedProductIds,
    removeFromCompare,
    clearCompare,
    setIsCompareOpen,
  } = useCart();

  if (comparedProductIds.length === 0) return null;

  const comparedProducts = comparedProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92vw] sm:w-auto bg-[#1E1E1E]/95 backdrop-blur-md text-white rounded-full px-4 py-2.5 shadow-2xl border border-white/15 flex items-center justify-between gap-3 animate-fadeIn">
      {/* Selected Soap Avatars */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2 overflow-hidden">
          {comparedProducts.map((p) => (
            <div
              key={p!.id}
              className="relative w-8 h-8 rounded-full border-2 border-[#1E1E1E] overflow-hidden bg-white shrink-0"
              title={p!.name}
            >
              <img
                src={p!.posterImage}
                alt={p!.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-xs">
          <span className="font-serif font-semibold text-white">
            Compare ({comparedProducts.length}/3)
          </span>
          <span className="text-[10px] text-white/60 hidden sm:inline ml-1.5">
            Side-by-side
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setIsCompareOpen(true)}
          className="px-3.5 py-1.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Compare Now</span>
        </button>

        <button
          onClick={clearCompare}
          className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          title="Clear comparison list"
          aria-label="Clear comparison"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
