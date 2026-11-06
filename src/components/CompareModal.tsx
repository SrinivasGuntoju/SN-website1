import React from 'react';
import {
  X,
  Plus,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const {
    comparedProductIds,
    removeFromCompare,
    addToCompare,
    clearCompare,
    addToCart,
  } = useCart();

  if (!isOpen) return null;

  // Selected products
  const selectedProducts: Product[] = comparedProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // Available products not yet in comparison
  const availableToAdd = PRODUCTS.filter((p) => !comparedProductIds.includes(p.id));

  const hasProducts = selectedProducts.length > 0;

  const handleQuickAddDefault = () => {
    addToCompare(PRODUCTS[0].id);
    addToCompare(PRODUCTS[3].id);
    if (PRODUCTS[1]) addToCompare(PRODUCTS[1].id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl w-full max-w-6xl max-h-[94vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DCCF] bg-[#FBF4EA] flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-script text-2xl text-[#7E2433]">Sacred Formulations</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E1E1E]">
              Artisanal Soap Comparison ({selectedProducts.length}/3)
            </h2>
            <p className="text-xs text-[#6B5E51] mt-0.5">
              Compare hero botanicals, Ayurvedic dosha benefits, bathing rituals, and pricing side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-[#9C8E7E] hover:text-[#7E2433] underline hidden sm:inline"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC] transition-colors"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 flex-1">
          {!hasProducts ? (
            /* Empty state */
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 bg-[#FAF4ED] text-[#7E2433] rounded-full flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1E1E1E]">
                No soaps currently selected for comparison
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5E51] max-w-md mx-auto font-light">
                Select up to 3 handcrafted soaps to view their active botanical ingredients, prices, and therapeutic Ayurvedic benefits side-by-side.
              </p>
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleQuickAddDefault}
                  className="px-6 py-2.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  Compare 3 Signature Bestsellers
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 border border-[#E8DCCF] rounded-full text-xs font-medium text-[#4A4036] hover:bg-[#FAF4ED]"
                >
                  Browse Collection
                </button>
              </div>
            </div>
          ) : (
            /* Full Side-by-Side Comparison Matrix */
            <div className="space-y-6">
              {/* Available Add Selector if < 3 */}
              {selectedProducts.length < 3 && availableToAdd.length > 0 && (
                <div className="p-3.5 bg-[#FAF4ED] rounded-2xl border border-[#E8DCCF] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-[#6B5E51] font-light">
                    Add <strong className="text-[#1E1E1E] font-medium">{3 - selectedProducts.length} more soap(s)</strong> to compare:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableToAdd.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => addToCompare(p.id)}
                        className="px-3.5 py-1.5 bg-white hover:bg-[#7E2433] hover:text-white border border-[#E8DCCF] rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{p.name.split(' ')[0]} Soap</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* The Comparison Grid */}
              <div className="overflow-x-auto pb-4">
                <div
                  className="grid gap-5 min-w-[640px]"
                  style={{
                    gridTemplateColumns: `repeat(${Math.max(2, selectedProducts.length)}, minmax(0, 1fr))`,
                  }}
                >
                  {selectedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-3xl border border-[#E8DCCF] p-5 sm:p-6 flex flex-col justify-between shadow-2xs relative group"
                    >
                      {/* Remove from compare button */}
                      <button
                        onClick={() => removeFromCompare(prod.id)}
                        className="absolute top-4 right-4 p-1.5 text-[#9C8E7E] hover:text-[#7E2433] hover:bg-[#FAF4ED] rounded-full transition-colors"
                        title="Remove from comparison"
                        aria-label={`Remove ${prod.name} from comparison`}
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div>
                        {/* Image Thumbnail */}
                        <div
                          onClick={() => {
                            onClose();
                            onSelectProduct(prod);
                          }}
                          className="aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF4ED] mb-4 border border-[#E8DCCF] cursor-pointer group"
                        >
                          <img
                            src={prod.posterImage}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Product Title & Tagline */}
                        <div className="text-[10px] uppercase font-cinzel font-semibold text-[#7E2433] tracking-[0.16em]">
                          {prod.concern}
                        </div>
                        <h3
                          onClick={() => {
                            onClose();
                            onSelectProduct(prod);
                          }}
                          className="font-serif text-lg font-semibold text-[#1E1E1E] hover:text-[#7E2433] cursor-pointer mt-1 leading-snug line-clamp-1"
                        >
                          {prod.name}
                        </h3>
                        <p className="text-xs text-[#6B5E51] font-serif italic mt-0.5 line-clamp-1">
                          "{prod.tagline}"
                        </p>

                        {/* Price & Rating */}
                        <div className="mt-3 pt-3 border-t border-[#F5ECE1] flex items-baseline justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-xl font-bold text-[#1E1E1E]">
                              ₹{prod.price}
                            </span>
                            <span className="text-[10px] text-[#9C8E7E]">/ 100g</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#C8872E]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-mono font-medium">{prod.rating}</span>
                            <span className="text-[10px] text-[#9C8E7E]">({prod.reviewCount})</span>
                          </div>
                        </div>

                        {/* Direct Add to Cart Action */}
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="w-full mt-4 py-2.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Basket</span>
                        </button>

                        {/* Comparison Rows */}
                        <div className="mt-6 space-y-5 text-xs pt-5 border-t border-[#E8DCCF]">
                          {/* Skin Type */}
                          <div>
                            <span className="text-[10px] uppercase font-cinzel font-semibold text-[#9C8E7E] tracking-[0.16em] block mb-1">
                              Target Skin Profile
                            </span>
                            <span className="font-medium text-[#1E1E1E] bg-[#FAF4ED] px-2.5 py-1 rounded-md inline-block">
                              {prod.skinType}
                            </span>
                          </div>

                          {/* Hero Active Botanicals */}
                          <div>
                            <span className="text-[10px] uppercase font-cinzel font-semibold text-[#9C8E7E] tracking-[0.16em] block mb-1.5">
                              Hero Botanicals
                            </span>
                            <div className="space-y-1.5">
                              {prod.keyIngredients.slice(0, 3).map((ing, i) => (
                                <div key={i} className="text-[#4A4036] leading-tight">
                                  <strong className="text-[#1E1E1E] font-medium">{ing.name}</strong>
                                  <span className="text-[10px] text-[#6B5E51] block">{ing.role}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Key Therapeutic Benefits */}
                          <div>
                            <span className="text-[10px] uppercase font-cinzel font-semibold text-[#9C8E7E] tracking-[0.16em] block mb-1.5">
                              Core Ayurvedic Benefits
                            </span>
                            <ul className="space-y-2 text-[11px] text-[#4A4036]">
                              {prod.benefits.slice(0, 3).map((b, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-[#5B6B2F] shrink-0 mt-0.5" />
                                  <span>
                                    <strong>{b.title}:</strong> {b.description}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bathing Ritual */}
                          <div>
                            <span className="text-[10px] uppercase font-cinzel font-semibold text-[#9C8E7E] tracking-[0.16em] block mb-1">
                              Daily Bathing Ritual
                            </span>
                            <p className="text-[11px] text-[#6B5E51] leading-relaxed">
                              {prod.howToUse[1] || prod.howToUse[0]}
                            </p>
                          </div>

                          {/* Clean Formula Seal */}
                          <div>
                            <span className="text-[10px] uppercase font-cinzel font-semibold text-[#9C8E7E] tracking-[0.16em] block mb-1">
                              Purity Declaration
                            </span>
                            <div className="text-[10px] text-[#5B6B2F] font-medium flex items-center gap-1.5 bg-[#EAF3DE] p-2 rounded-lg">
                              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                              <span>100% Pure · Zero Sulfates or Parabens</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
