import React from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface RitualGalleryProps {
  onSelectProduct: (product: Product) => void;
}

export const RitualGallery: React.FC<RitualGalleryProps> = ({ onSelectProduct }) => {
  const rituals = [
    {
      title: 'Facial Radiance & Dewy Moisture',
      category: 'Face Care Ritual',
      soapSlug: 'goat-milk-red-wine-soap',
      image: '/src/assets/images/face_radiance_transformation_1793950395421.jpg',
      headline: 'Lush farm-fresh goat milk & red wine antioxidants awaken your skin’s innate luminescence.',
      description: 'Lactic acid and natural grape polyphenols replenish the delicate lipid barrier, dissolving dullness and imparting a soft, cashmere morning glow.',
      highlight: 'Goat Milk & Red Wine Soap · ₹380',
    },
    {
      title: 'Hands & Forearms Sun Tan Care',
      category: 'Body & Sun Recovery',
      soapSlug: 'ubtan-honey-soap',
      image: '/src/assets/images/hands_tan_removal_ritual_1793950396615.jpg',
      headline: 'Vedic Kasturi turmeric and wild forest honey gently lift sun tan lines on hands and wrists.',
      description: 'Non-staining wild turmeric and rich honey humectants soften parched knuckles and restore uniform, golden clarity across sun-exposed arms.',
      highlight: 'Ubtan Honey Soap · ₹350',
    },
    {
      title: 'Breathable Pore Clarity & Shine Balance',
      category: 'Clarifying Ritual',
      soapSlug: 'charcoal-multani-mitti-soap',
      image: '/src/assets/images/clarifying_skin_pore_cleanse_1793950396364.jpg',
      headline: 'Activated bamboo charcoal and cooling Multani clay detoxify pores without parching.',
      description: 'Micro-adsorption draws out urban pollution impurities while mineral clay regulates midday sebum, leaving skin velvety and matte.',
      highlight: 'Charcoal & Multani Mitti Soap · ₹340',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FFFDF9] border-y border-[#E8DCCF] relative overflow-hidden" id="rituals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-script text-3xl sm:text-4xl text-[#7E2433] block mb-2">
            The Living Radiance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1E1E] tracking-tight leading-[1.15]">
            Rituals for Face & Body
          </h2>
          <div className="w-12 h-[1px] bg-[#7E2433]/40 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-[#6B5E51] font-light leading-relaxed max-w-xl mx-auto">
            Experience how slow-cured botanicals, farm-fresh milk, and Vedic clays nurture your skin in daily bathing rituals.
          </p>
        </div>

        {/* 3 Editorial Photography Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rituals.map((r, i) => {
            const matchedProduct = PRODUCTS.find((p) => p.slug === r.soapSlug) || PRODUCTS[0];
            return (
              <div
                key={i}
                onClick={() => onSelectProduct(matchedProduct)}
                className="group bg-[#FAF4ED] rounded-3xl border border-[#E8DCCF] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                <div>
                  {/* Photography Display Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FBF4EA]">
                    <img
                      src={r.image}
                      alt={r.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-xs text-[#1E1E1E] text-[10px] font-cinzel uppercase tracking-[0.16em] rounded-full shadow-xs">
                        {r.category}
                      </span>
                    </div>
                  </div>

                  {/* Editorial Text Content */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E1E1E] leading-snug group-hover:text-[#7E2433] transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#4A4036] font-serif italic leading-relaxed text-[#7E2433]">
                      "{r.headline}"
                    </p>
                    <p className="text-xs text-[#6B5E51] font-light leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer with Linked Soap */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#E8DCCF]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#9C8E7E] block font-cinzel">
                        Handcrafted Soap
                      </span>
                      <span className="font-serif font-semibold text-xs text-[#1E1E1E]">
                        {matchedProduct.name}
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-white border border-[#E8DCCF] text-[#7E2433] flex items-center justify-center group-hover:bg-[#7E2433] group-hover:text-white transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
