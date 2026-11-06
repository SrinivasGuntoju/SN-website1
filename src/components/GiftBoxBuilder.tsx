import React, { useState } from 'react';
import { Sparkles, Plus, X, Check, Gift, Heart, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const GiftBoxBuilder: React.FC = () => {
  const { customBox, addToCustomBox, removeFromCustomBox, clearCustomBox, addCustomBoxToCart } = useCart();
  const [selectedTheme, setSelectedTheme] = useState('Royal Cream Gold');
  const [giftNote, setGiftNote] = useState('');

  const themes = [
    { id: 'Royal Cream Gold', name: 'Royal Cream Gold', color: '#C8872E', bg: 'bg-[#FAF3E8]' },
    { id: 'Festive Blossom Wine', name: 'Festive Blossom Wine', color: '#7E2433', bg: 'bg-[#F9ECEF]' },
    { id: 'Forest Botanical Olive', name: 'Forest Botanical Olive', color: '#5B6B2F', bg: 'bg-[#EFF2E8]' },
  ];

  const bundlePrice = 949;
  const regularPrice = customBox.reduce((sum, p) => sum + p.price, 0) || 1100;
  const savings = Math.max(0, (customBox.length === 3 ? regularPrice : 1100) - bundlePrice);

  return (
    <section className="py-16 md:py-24 bg-[#F5ECE1] relative overflow-hidden" id="gift-box-builder">
      {/* Decorative floral elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-script text-3xl sm:text-4xl text-[#7E2433] block mb-1">
            The Art of Vedic Gifting
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1E1E] tracking-tight">
            Build Your Own 3-Soap Box
          </h2>
          <p className="text-sm text-[#6B5E51] mt-2 font-light">
            Handpick any 3 slow-cured herbal soaps. Nestled in a rigid keepsake gift box with a personalized calligraphy note and complimentary express shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Soap Selection Picker (5 soaps) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
                Step 1: Choose Your 3 Soaps ({customBox.length}/3 selected)
              </h3>
              {customBox.length > 0 && (
                <button
                  onClick={clearCustomBox}
                  className="text-xs text-[#7E2433] hover:underline font-medium"
                >
                  Reset selection
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PRODUCTS.map((prod) => {
                const countInBox = customBox.filter((p) => p.id === prod.id).length;
                return (
                  <div
                    key={prod.id}
                    className="p-3 bg-white rounded-2xl border border-[#E8DCCF] flex items-center justify-between gap-3 shadow-2xs hover:border-[#7E2433] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.posterImage}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif font-semibold text-xs text-[#1E1E1E] truncate">
                          {prod.name}
                        </h4>
                        <p className="text-[11px] text-[#6B5E51] truncate">{prod.tagline}</p>
                        <span className="font-mono text-xs font-semibold text-[#1E1E1E]">
                          ₹{prod.price}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {countInBox > 0 && (
                        <span className="text-[11px] font-mono font-bold text-[#7E2433] bg-[#FDF0EC] px-2 py-0.5 rounded-full">
                          x{countInBox}
                        </span>
                      )}
                      <button
                        onClick={() => addToCustomBox(prod)}
                        disabled={customBox.length >= 3}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          customBox.length >= 3
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-[#7E2433] hover:bg-[#5C1723] text-white active:scale-90 shadow-2xs'
                        }`}
                        aria-label={`Add ${prod.name} to box`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Box Visualizer & Live Summary */}
          <div className="lg:col-span-5 bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCF]">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#7E2433]" />
                <span className="font-serif font-semibold text-base text-[#1E1E1E]">
                  Your Custom Gift Box
                </span>
              </div>
              <span className="text-xs bg-[#EAF3DE] text-[#3F5A1F] font-semibold px-2 py-0.5 rounded-sm">
                Save 15% Bundle
              </span>
            </div>

            {/* 3 Box Slots Visualizer */}
            <div className="grid grid-cols-3 gap-3 my-5">
              {[0, 1, 2].map((slotIdx) => {
                const item = customBox[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`aspect-3/4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center relative transition-all ${
                      item
                        ? 'border-[#7E2433] bg-white shadow-2xs'
                        : 'border-[#D4C3B2] bg-[#FAF4ED]'
                    }`}
                  >
                    {item ? (
                      <>
                        <button
                          onClick={() => removeFromCustomBox(slotIdx)}
                          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#7E2433] text-white flex items-center justify-center hover:bg-[#5C1723] shadow-xs"
                          aria-label="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={item.posterImage}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-18 object-cover rounded-lg mb-1"
                        />
                        <span className="font-serif text-[11px] font-semibold text-[#1E1E1E] line-clamp-1 leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-[#6B5E51] font-mono">100g</span>
                      </>
                    ) : (
                      <div className="text-[#9C8E7E] flex flex-col items-center">
                        <Plus className="w-5 h-5 mb-1 stroke-1" />
                        <span className="text-[10px] font-medium uppercase tracking-wider">
                          Slot {slotIdx + 1}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step 2: Choose Sleeve Theme */}
            <div className="space-y-2 pt-2 border-t border-[#E8DCCF]">
              <label className="block text-xs font-medium text-[#4A4036]">
                Step 2: Choose Keepsake Sleeve Packaging
              </label>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTheme(t.name)}
                    className={`p-2 rounded-xl border text-[11px] text-center transition-all ${
                      selectedTheme === t.name
                        ? 'border-[#7E2433] bg-[#FDF0EC] font-semibold text-[#7E2433] shadow-2xs'
                        : 'border-[#E8DCCF] bg-white text-[#4A4036] hover:bg-[#FAF4ED]'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Complimentary Gift Note */}
            <div className="space-y-1.5 mt-4">
              <label className="block text-xs font-medium text-[#4A4036]">
                Step 3: Complimentary Calligraphy Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Wishing you timeless wellness & natural glow! – Priya"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                maxLength={120}
                className="w-full px-3 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs placeholder:text-[#9C8E7E] focus:outline-hidden focus:ring-1 focus:ring-[#7E2433]"
              />
            </div>

            {/* Live Pricing Breakdown */}
            <div className="mt-5 pt-4 border-t border-[#E8DCCF] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B5E51]">
                <span>Individual Bars Value:</span>
                <span className="font-mono line-through">₹{regularPrice}</span>
              </div>
              <div className="flex justify-between text-[#5B6B2F] font-medium">
                <span>Gift Box Curation Savings:</span>
                <span className="font-mono">-₹{savings}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#1E1E1E] pt-2 border-t border-[#E8DCCF]">
                <span>Curated Box Price:</span>
                <span className="font-mono text-xl text-[#7E2433]">₹{bundlePrice}</span>
              </div>
            </div>

            {/* Add to Basket Action */}
            <button
              onClick={() => addCustomBoxToCart(selectedTheme)}
              disabled={customBox.length < 3}
              className={`w-full mt-4 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                customBox.length < 3
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#7E2433] hover:bg-[#5C1723] text-white shadow-md active:scale-98'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {customBox.length < 3
                  ? `Select ${3 - customBox.length} more soap(s)`
                  : 'Add 3-Soap Box to Bag · ₹949'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
