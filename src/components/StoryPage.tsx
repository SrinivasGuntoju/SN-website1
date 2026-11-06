import React from 'react';
import { Sparkles, Heart, ShieldCheck, Droplets, Leaf } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const StoryPage: React.FC<{ onShopNow: () => void }> = ({ onShopNow }) => {
  return (
    <div className="py-12 md:py-20 bg-[#FBF4EA] animate-fadeIn">
      {/* Hero Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-16">
        <span className="font-script text-3xl sm:text-4xl text-[#7E2433] block mb-1">The Sacred Origins</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1E1E] leading-tight tracking-tight">
          Rooted in Ayurvedic Wisdom, Handcrafted with Love
        </h1>
        <p className="text-sm sm:text-base text-[#6B5E51] leading-relaxed max-w-2xl mx-auto font-light">
          "Alankarana" is the classical Sanskrit word for sacred adornment. We believe true beauty is not about concealing with synthetic chemicals, but honoring and nourishing your skin’s innate luminescence.
        </p>
      </div>

      {/* Narrative Section with 2-Column Story */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 border border-[#E8DCCF] shadow-xs">
          <div className="md:col-span-6 space-y-4">
            <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#7E2433] font-semibold">
              Chapter 01 · The Atelier Awakening
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1E1E]">
              Why We Rejected Mass-Produced Detergent Bars
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
              Most commercial "soaps" filling retail shelves are not true soaps at all—they are synthetic detergent syndet bars loaded with sulfates (SLS), petrochemical stabilizers, and artificial dyes. During their industrial processing, valuable naturally generated glycerin is extracted and sold separately, leaving skin dry, tight, and stripped.
            </p>
            <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
              At SN Alankarana, we returned to the ancient Vedic tradition of cold-saponification. We blend pure edible oils with freshly harvested goat milk, red wine, turmeric, charcoal, and papaya pulp at room temperature, locking 100% of the skin-loving glycerin inside every single bar.
            </p>
          </div>
          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden border border-[#E8DCCF] shadow-md relative">
              <img
                src="/assets/aistudio/SN1_07c03d5d.jpeg"
                alt="Artisanal Goat Milk & Wine Soap"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="font-serif text-white text-sm">Slow-cured 100g Artisan Soaps</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Purity */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-script text-2xl text-[#7E2433]">Our Guiding Principles</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mt-1">
            The SN Alankarana Purity Oath
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCF] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FDF0EC] text-[#7E2433] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">100% Handmade</h3>
            <p className="text-xs text-[#6B5E51] leading-relaxed">
              Every single batch is poured, hand-cut, and cured for 28 days in slow Indian teakwood racks.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCF] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#EAF3DE] text-[#5B6B2F] flex items-center justify-center mx-auto">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">Earth-Born Ingredients</h3>
            <p className="text-xs text-[#6B5E51] leading-relaxed">
              Ethically sourced cold-pressed coconut, sweet almond, olive oils, and genuine botanical extracts.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCF] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF3E8] text-[#C8872E] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">Zero Toxins</h3>
            <p className="text-xs text-[#6B5E51] leading-relaxed">
              Strictly zero parabens, sulfates, silicones, phthalates, artificial preservatives, or animal cruelty.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCF] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F5ECE1] text-[#7E2433] flex items-center justify-center mx-auto">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">Natural Glycerin Retained</h3>
            <p className="text-xs text-[#6B5E51] leading-relaxed">
              Unrivaled hydration that protects the moisture barrier and eliminates post-bath dryness.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 bg-[#7E2433] text-white rounded-3xl text-center space-y-4 relative overflow-hidden shadow-lg">
          <div className="max-w-xl mx-auto relative z-10 space-y-3">
            <span className="font-script text-3xl text-[#F4C6C3]">Begin Your Ritual</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold">
              Experience the Glow of Genuine Botanicals
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              Explore our 5 handcrafted artisanal bathing bars and discover the transformation in your daily bath.
            </p>
            <button
              onClick={onShopNow}
              className="mt-4 px-8 py-3.5 bg-[#FFFDF9] text-[#7E2433] hover:bg-[#F4C6C3] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore The Collection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
