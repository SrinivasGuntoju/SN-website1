import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onExploreShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onExploreShop }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#E8DCCF] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DCCF] flex items-center justify-between bg-[#FBF4EA]">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Your Sacred Basket</h2>
              <p className="text-xs text-[#6B5E51] mt-0.5">
                {cart.length === 0 ? 'Your bag is empty' : `${cart.reduce((a, b) => a + b.quantity, 0)} handcrafted item(s)`}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Tracker */}
          <div className="p-4 bg-[#F5ECE1] border-b border-[#E8DCCF]">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A4036] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#7E2433]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-[#5B6B2F] font-semibold">You unlocked FREE Express Shipping!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#7E2433] font-semibold">₹{amountNeededForFreeShipping}</strong> more for{' '}
                    <strong>FREE Delivery</strong>
                  </span>
                )}
              </span>
              <span className="font-mono text-xs">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E3D4C4] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#7E2433] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6B5E51]">
                <div className="w-16 h-16 rounded-full bg-[#F3E8DA] flex items-center justify-center text-[#7E2433] mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">Your basket is awaiting ritual care</h3>
                <p className="text-xs text-[#6B5E51] mt-1.5 max-w-xs">
                  Discover our pure Ayurvedic cold-processed soaps made with goat milk, red wine, and wild ubtan.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreShop();
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#7E2433] text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-[#5C1723] transition-colors shadow-xs"
                >
                  Explore Artisanal Soaps
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="p-3.5 bg-white border border-[#E8DCCF] rounded-2xl flex gap-3.5 shadow-2xs relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#FBF4EA] rounded-xl overflow-hidden shrink-0 border border-[#E8DCCF]/60">
                    <img
                      src={item.product.posterImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#1E1E1E] leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9C8E7E] hover:text-[#7E2433] p-1 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#6B5E51] mt-0.5">
                        {item.product.weight} · Cold Processed
                      </p>

                      {/* If gift box item, show mini breakdown */}
                      {item.isGiftBox && item.boxItems && (
                        <div className="mt-1 text-[10px] text-[#7E2433] bg-[#FDF0EC] px-2 py-0.5 rounded-sm inline-block">
                          Includes: {item.boxItems.map((b) => b.name.split(' ')[0]).join(' + ')}
                        </div>
                      )}
                    </div>

                    {/* Quantity stepper & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5ECE1]">
                      <div className="flex items-center border border-[#E8DCCF] rounded-lg bg-[#FAF4ED] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#EADBCC] text-[#4A4036] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-[#1E1E1E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#EADBCC] text-[#4A4036] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-sm font-semibold text-[#1E1E1E]">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.product.originalPrice > item.product.price && (
                          <span className="text-[11px] text-[#9C8E7E] line-through ml-1.5 font-mono">
                            ₹{item.product.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8DCCF] bg-[#FBF4EA] space-y-3.5">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#9C8E7E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. GLOW10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs uppercase tracking-wider focus:outline-hidden focus:ring-1 focus:ring-[#7E2433]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4A4036] hover:bg-[#1E1E1E] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600 pl-1">{couponError}</p>}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs bg-[#EAF3DE] text-[#3F5A1F] px-2.5 py-1 rounded-lg">
                    <span>
                      Code <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount})
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs underline hover:text-red-700 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#4A4036] pt-1 border-t border-[#E8DCCF]/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-[#1E1E1E]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#5B6B2F]">
                    <span>Promotional Discount</span>
                    <span className="font-mono font-medium">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-mono font-medium">
                    {shippingFee === 0 ? <strong className="text-[#5B6B2F]">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1E1E1E] pt-2 border-t border-[#E8DCCF]">
                  <span>Total Amount (incl. all taxes)</span>
                  <span className="font-mono text-base text-[#7E2433]">₹{totalAmount}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-3.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B5E51] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5B6B2F]" />
                  100% Genuine Herbal
                </span>
                <span>•</span>
                <span>Safe UPI & Cards</span>
                <span>•</span>
                <span>COD Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
