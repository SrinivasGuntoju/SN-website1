import React from 'react';
import { Sparkles, ArrowRight, Star, ShieldCheck, Heart, Droplets, Check, Compass } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { GiftBoxBuilder } from './GiftBoxBuilder';
import { RitualGallery } from './RitualGallery';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: string, param?: string) => void;
  onOpenQuiz: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProduct,
  onNavigate,
  onOpenQuiz,
}) => {
  const featuredSoaps = PRODUCTS.slice(0, 3);

  const concerns = [
    {
      title: 'Radiant Glow & Tan Removal',
      soap: PRODUCTS[3], // Ubtan Honey
      accent: '#C8872E',
      tagline: 'Kasturi Turmeric & Wild Honey',
    },
    {
      title: 'Deep Cleanse & Oil Control',
      soap: PRODUCTS[1], // Charcoal & Multani
      accent: '#5B6B2F',
      tagline: 'Bamboo Charcoal & Mineral Clay',
    },
    {
      title: 'Deep Moisture & Lipids',
      soap: PRODUCTS[0], // Goat Milk & Wine
      accent: '#7E2433',
      tagline: 'Farm Goat Milk & Grape Polyphenols',
    },
    {
      title: 'Dark Spot & Blemish Correction',
      soap: PRODUCTS[4], // Papaya & Licorice
      accent: '#E8742A',
      tagline: 'Fresh Papain & Licorice Root',
    },
  ];

  const testimonials = [
    {
      quote: 'The Goat Milk & Red Wine soap transformed my dry winter skin within 2 weeks. The lather is as rich as silk and doesn’t leave that tight feeling commercial soaps cause.',
      author: 'Ananya S.',
      location: 'Bengaluru, Karnataka',
      soapUsed: 'Goat Milk & Red Wine Soap',
      rating: 5,
    },
    {
      quote: 'I have severe oily skin and bike through heavy pollution. The Charcoal & Multani Mitti soap clears every trace of grime without dehydrating my cheeks. Absolute holy grail!',
      author: 'Karthik V.',
      location: 'Hyderabad, Telangana',
      soapUsed: 'Charcoal & Multani Mitti Soap',
      rating: 5,
    },
    {
      quote: 'Ordered the 3-Soap Box for my sister’s wedding hamper. The packaging, handwritten card, and the aroma of authentic herbs were pure luxury. Everyone asked where I found it.',
      author: 'Deepika Sharma',
      location: 'Jaipur, Rajasthan',
      soapUsed: 'Custom 3-Soap Gift Box',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-0 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center bg-[#FBF4EA] overflow-hidden py-12 lg:py-20 border-b border-[#E8DCCF]">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F4C6C3]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4ED] border border-[#E8DCCF] text-[11px] text-[#7E2433] font-cinzel tracking-[0.16em] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-medium">
                  Traditional Cold-Process Ayurvedic Atelier
                </span>
              </div>

              <div>
                <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#7E2433] block mb-2 leading-none">
                  Glow Naturally
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E1E1E] leading-[1.12] text-balance tracking-tight">
                  Pure Botanicals. Slow-Cured Artisanal Soaps.
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#6B5E51] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Handcrafted in India with farm-fresh goat milk, fermented red wine polyphenols, wild ubtan herbs, and ripe papaya enzymes. Slow-cured for 28 days to preserve 100% natural glycerin.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-7 py-3.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center gap-2"
                >
                  <span>Explore Artisanal Soaps</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('gift-box')}
                  className="px-6 py-3.5 bg-white border border-[#E8DCCF] hover:bg-[#FAF4ED] text-[#1E1E1E] rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Build 3-Soap Box (₹949)
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-4 py-3.5 text-[#7E2433] hover:text-[#5C1723] text-xs font-medium underline underline-offset-4 flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Take 30s Skin Quiz</span>
                </button>
              </div>

              {/* Social Proof Trust Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#6B5E51] border-t border-[#E8DCCF]/60">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#C8872E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono font-medium text-[#1E1E1E]">4.9 / 5</span>
                  <span className="text-[#9C8E7E]">(650+ reviews)</span>
                </div>
                <span>•</span>
                <span>100% Handmade</span>
                <span>•</span>
                <span>No Parabens or Sulfates</span>
              </div>
            </div>

            {/* Right Visual: Asymmetric Luxury Soap Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-4/5">
                {/* Main Featured Poster Card */}
                <div
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                  className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/60 bg-white group cursor-pointer relative"
                >
                  <img
                    src={PRODUCTS[0].posterImage}
                    alt={PRODUCTS[0].name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="font-script text-2xl text-[#F4C6C3]">Artisanal Spotlight</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight">
                      {PRODUCTS[0].name}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">{PRODUCTS[0].tagline}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-mono text-base font-semibold">₹{PRODUCTS[0].price}</span>
                      <span className="text-xs font-semibold underline">Tap to View Ritual →</span>
                    </div>
                  </div>
                </div>

                {/* Floating mini badge sticker */}
                <div className="absolute -top-3 -right-3 bg-[#7E2433] text-white p-3 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2 rotate-3 pointer-events-none">
                  <Sparkles className="w-4 h-4 text-[#F4C6C3]" />
                  <span className="font-serif text-xs uppercase tracking-wider font-semibold">
                    100g Cold Processed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Badge Strip */}
      <div className="bg-[#7E2433] text-white py-3.5 overflow-hidden whitespace-nowrap border-y border-[#581622]">
        <div className="animate-marquee flex items-center text-xs tracking-widest uppercase font-medium">
          <span className="mx-4">✦ 100% Handmade with Love</span>
          <span className="mx-4">• No Parabens</span>
          <span className="mx-4">• No Sulfates (Zero SLS/SLES)</span>
          <span className="mx-4">• No Synthetic Dyes</span>
          <span className="mx-4">• Cruelty Free</span>
          <span className="mx-4">• Retains Natural Glycerin</span>
          <span className="mx-4">• Ethically Sourced Indian Botanicals</span>
          <span className="mx-4">• Suitable for All Skin Types</span>
          <span className="mx-4">✦ 100% Handmade with Love</span>
          <span className="mx-4">• No Parabens</span>
          <span className="mx-4">• No Sulfates (Zero SLS/SLES)</span>
          <span className="mx-4">• No Synthetic Dyes</span>
          <span className="mx-4">• Cruelty Free</span>
          <span className="mx-4">• Retains Natural Glycerin</span>
        </div>
      </div>

      {/* Featured Bestsellers Collection */}
      <section className="py-16 md:py-24 bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <span className="font-script text-2xl text-[#7E2433]">Sacred Formulations</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mt-1">
                Artisanal Bestsellers
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-semibold uppercase tracking-wider text-[#7E2433] hover:text-[#5C1723] flex items-center gap-1.5"
            >
              <span>View All 5 Soaps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredSoaps.map((prod) => (
              <ProductCard key={prod.id} product={prod} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Concern Section */}
      <section className="py-16 md:py-24 bg-[#FAF4ED] border-y border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-script text-2xl text-[#7E2433]">Targeted Wellness</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mt-1">
              Shop by Skin Concern
            </h2>
            <p className="text-sm text-[#6B5E51] mt-2">
              Select your skin goal to discover the precisely formulated herbal blend.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {concerns.map((c, i) => (
              <div
                key={i}
                onClick={() => onSelectProduct(c.soap)}
                className="bg-white rounded-2xl p-4 border border-[#E8DCCF] shadow-2xs hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-[#FAF4ED]">
                    <img
                      src={c.soap.posterImage}
                      alt={c.soap.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1E1E1E] group-hover:text-[#7E2433] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#6B5E51] mt-1">{c.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5ECE1] flex items-center justify-between text-xs">
                  <span className="font-medium text-[#7E2433]">{c.soap.name}</span>
                  <span className="text-[#9C8E7E] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Living Radiance: Rituals for Face & Body (Featuring High-Fidelity Editorial Imagery) */}
      <RitualGallery onSelectProduct={onSelectProduct} />

      {/* Build Your Own 3-Soap Box Builder */}
      <GiftBoxBuilder />

      {/* Testimonials Carousel Strip */}
      <section className="py-16 md:py-24 bg-[#FFFDF9] border-t border-[#E8DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-script text-2xl text-[#7E2433]">Customer Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mt-1">
              Cherished by Skin Seekers
            </h2>
            <p className="text-sm text-[#6B5E51] mt-2">
              Real reflections from daily bath rituals across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FAF4ED] rounded-3xl border border-[#E8DCCF] flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex text-[#C8872E] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DCCF]/60 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-[#1E1E1E]">{t.author}</h4>
                    <span className="text-[11px] text-[#6B5E51]">{t.location}</span>
                  </div>
                  <span className="text-[10px] text-[#7E2433] font-medium bg-white px-2 py-1 rounded-md border border-[#E8DCCF]">
                    {t.soapUsed}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
