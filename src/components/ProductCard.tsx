import React, { useState } from 'react';
import { Heart, Plus, Star, Sparkles, Check, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, toggleWishlist, isInWishlist, comparedProductIds, toggleCompare } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const isFavorite = isInWishlist(product.id);
  const isCompared = comparedProductIds.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#FFFDF9] rounded-2xl md:rounded-3xl border border-[#EADBCC] p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-4/5 w-full bg-[#F5ECE1] rounded-xl md:rounded-2xl overflow-hidden mb-3.5 border border-[#E8DCCF]/50">
        {/* Subtle decorative botanical badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#7E2433] text-white text-[10px] sm:text-xs font-serif uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Action Badges Top Right: Wishlist & Compare */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button
            onClick={handleToggleCompare}
            title={isCompared ? 'Remove from side-by-side comparison' : 'Compare with other soaps'}
            aria-label={isCompared ? 'Remove from compare' : 'Compare soap'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isCompared
                ? 'bg-[#1E1E1E] text-white shadow-sm ring-1 ring-white/50'
                : 'bg-white/80 backdrop-blur-xs text-[#4A4036] hover:bg-white hover:text-[#7E2433]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isFavorite
                ? 'bg-[#7E2433] text-white shadow-sm'
                : 'bg-white/80 backdrop-blur-xs text-[#4A4036] hover:bg-white hover:text-[#7E2433]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Photo with hover zoom effect */}
        <img
          src={product.posterImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
            isHovered ? 'scale-106' : 'scale-100'
          }`}
        />

        {/* Quick Add Overlay Button on Desktop */}
        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          } hidden sm:block`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add · ₹{product.price}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line: Category · Weight · Rating */}
          <div className="flex items-center justify-between text-xs text-[#6B5E51] mb-1">
            <span className="uppercase font-cinzel tracking-[0.16em] text-[10px] font-semibold text-[#7E2433]">
              {product.concern}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#C8872E] fill-current" />
              <span className="font-mono text-xs font-medium text-[#1E1E1E]">
                {product.rating}
              </span>
              <span className="text-[10px] text-[#9C8E7E]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#1E1E1E] leading-snug line-clamp-1 group-hover:text-[#7E2433] transition-colors">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="font-serif text-xs text-[#7E2433]/90 line-clamp-1 mt-0.5 italic">
            "{product.tagline}"
          </p>

          {/* Key Ingredient Highlight */}
          <div className="mt-2 text-[11px] text-[#4A4036] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C8872E] shrink-0" />
            <span className="truncate">{product.keyIngredients[0]?.name}</span>
          </div>
        </div>

        {/* Pricing & Mobile Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-[#F5ECE1] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-base font-semibold text-[#1E1E1E]">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-xs text-[#9C8E7E] line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-[#6B5E51]">/ 100g</span>
          </div>

          {/* Mobile Quick Add Circle Button */}
          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
            className="sm:hidden w-8 h-8 rounded-full bg-[#7E2433] text-white flex items-center justify-center hover:bg-[#5C1723] active:scale-95 transition-all"
          >
            {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
