import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#E8DCCF] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DCCF] flex items-center justify-between bg-[#FBF4EA]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#7E2433] fill-current" />
              <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Your Favorites</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#6B5E51] p-6">
                <div className="w-14 h-14 rounded-full bg-[#FAF4ED] flex items-center justify-center text-[#7E2433] mb-3">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-semibold text-[#1E1E1E]">No favorited soaps yet</h3>
                <p className="text-xs text-[#6B5E51] mt-1 max-w-xs">
                  Tap the heart icon on any soap bar to save it for your next bath ritual.
                </p>
              </div>
            ) : (
              wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 bg-white border border-[#E8DCCF] rounded-2xl flex gap-3 shadow-2xs items-center"
                >
                  <img
                    src={prod.posterImage}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectProduct(prod.id);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod.id);
                      }}
                      className="font-serif font-semibold text-xs sm:text-sm text-[#1E1E1E] truncate cursor-pointer hover:text-[#7E2433]"
                    >
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-[#6B5E51] truncate">{prod.tagline}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#1E1E1E]">
                        ₹{prod.price}
                      </span>
                      <span className="text-[10px] text-[#9C8E7E]">/ 100g</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(prod, 1);
                        toggleWishlist(prod.id);
                      }}
                      className="p-2 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-xl text-xs flex items-center justify-center"
                      title="Move to basket"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 text-[#9C8E7E] hover:text-red-600 rounded-xl flex items-center justify-center"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
