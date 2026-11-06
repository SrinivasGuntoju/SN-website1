import React, { useState } from 'react';
import { Search, Sparkles, Leaf, Droplets, Sun, Shield } from 'lucide-react';

export const IngredientsGlossary: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const botanicals = [
    {
      name: 'Fresh Farm Goat Milk',
      category: 'moisturizing',
      origin: 'Locally sourced from humanely raised herds',
      dosha: 'Balances Vata & Pitta',
      foundIn: 'Goat Milk & Red Wine Soap',
      description:
        'A revered Ayurvedic skin superfood containing natural alpha-hydroxy acids (lactic acid) that gently dissolve dead surface cells. Packed with vitamin A, zinc, and selenium, its pH closely matches human skin, replenishing fragile lipid moisture barriers without irritation.',
    },
    {
      name: 'Fermented Red Wine Extract (Resveratrol)',
      category: 'brightening',
      origin: 'French Red Grapes & Polyphenol Ferment',
      dosha: 'Rejuvenator (Rasayana)',
      foundIn: 'Goat Milk & Red Wine Soap, Red Wine Soap',
      description:
        'Abundant in grape polyphenols, anthocyanins, and resveratrol. Neutralizes oxidative free radicals produced by urban smog and UV exposure. Stimulates micro-circulation for a fresh, rosy complexion and helps maintain collagen elasticity.',
    },
    {
      name: 'Activated Bamboo Charcoal',
      category: 'detox',
      origin: 'Sustainable kiln-fired Indian bamboo',
      dosha: 'Balances Kapha',
      foundIn: 'Charcoal & Multani Mitti Soap',
      description:
        'Micro-porous activated carbon particles that carry a negative ionic charge, attracting positively charged dirt, blackheads, sebum, and microscopic particulate matter (PM2.5). Unclogs congested pores without parching.',
    },
    {
      name: 'Multani Mitti (Indian Fuller’s Earth)',
      category: 'detox',
      origin: 'Natural mineral-rich clay deposits',
      dosha: 'Pacifies Pitta & Kapha',
      foundIn: 'Charcoal & Multani Mitti Soap',
      description:
        'A centuries-old Indian beauty secret composed of magnesium chloride and silica. Gently cools irritated skin, regulates excess midday oil production, and tightens pores to leave a soft matte texture.',
    },
    {
      name: 'Kasturi Manjal (Curcuma Aromatica)',
      category: 'brightening',
      origin: 'Wild aromatic turmeric from the Western Ghats',
      dosha: 'Varnya (Complexion enhancer)',
      foundIn: 'Ubtan Honey Soap',
      description:
        'Unlike edible culinary turmeric which leaves heavy yellow staining, Kasturi Manjal is an aromatic wild variety celebrated for fading sun tan, evening patchy discoloration, and imparting a non-staining golden glow.',
    },
    {
      name: 'Raw Forest Honey (Mahu)',
      category: 'moisturizing',
      origin: 'Wild beehives from deciduous Indian forests',
      dosha: 'Tridoshic Humectant',
      foundIn: 'Ubtan Honey Soap',
      description:
        'Enzymatically active raw honey acts as a natural humectant, drawing moisture from the humid air into the epidermis. Delivers mild antimicrobial defense and leaves skin dewy, supple, and glowing.',
    },
    {
      name: 'Organic Papaya Pulp (Papain Enzyme)',
      category: 'brightening',
      origin: 'Freshly harvested Indian Carica Papaya',
      dosha: 'Pitta pacifier',
      foundIn: 'Papaya with Licorice Soap',
      description:
        'Cold-pressed papaya fruit contains natural proteolytic papain enzymes that break down keratinocyte clusters, smoothing uneven bumpy texture and revealing radiant new skin cells underneath.',
    },
    {
      name: 'Mulethi (Licorice Root Extract)',
      category: 'brightening',
      origin: 'Organic Glycyrrhiza Glabra root',
      dosha: 'Soothes aggravated Bhrajaka Pitta',
      foundIn: 'Papaya with Licorice Soap',
      description:
        'Contains glabridin and liquiritin, two of nature’s most effective compounds for regulating melanin synthesis. Clinically proven to soften stubborn hyperpigmentation, acne blemishes, and sun spots.',
    },
    {
      name: 'Cold-Pressed Sweet Almond & Olive Oils',
      category: 'moisturizing',
      origin: 'First cold-pressing of Mediterranean olives & Californian almonds',
      dosha: 'Vata pacifier',
      foundIn: 'All 5 Artisanal Soaps',
      description:
        'The uncompromised foundation of our cold-processed bars. High in oleic and linoleic essential fatty acids that create a luxurious, cushiony conditioning lather while locking in moisture.',
    },
  ];

  const filtered = filter === 'all' ? botanicals : botanicals.filter((b) => b.category === filter);

  return (
    <div className="py-12 md:py-20 bg-[#FBF4EA] animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-12">
        <span className="font-script text-2xl sm:text-3xl text-[#7E2433]">The Botanical Compendium</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1E1E1E]">
          Pure Ingredients. Transparent Sourcing.
        </h1>
        <p className="text-sm text-[#6B5E51] max-w-xl mx-auto font-light leading-relaxed">
          Every botanical chosen for SN Alankarana is food-grade, harvested ethically, and formulated in accordance with Ayurvedic principles.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Botanicals' },
            { id: 'brightening', label: 'Radiance & Brightening' },
            { id: 'moisturizing', label: 'Deep Moisture & Lipids' },
            { id: 'detox', label: 'Pore Cleansing & Clays' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === tab.id
                  ? 'bg-[#7E2433] text-white shadow-xs'
                  : 'bg-white border border-[#E8DCCF] text-[#4A4036] hover:bg-[#FAF4ED]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl border border-[#E8DCCF] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-mono text-[#7E2433] uppercase font-semibold">
                  {item.dosha}
                </span>
                <span className="text-[#9C8E7E] text-[10px]">{item.category}</span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] leading-snug">
                {item.name}
              </h3>

              <div className="text-[11px] text-[#5B6B2F] font-medium mt-1">
                Found in: {item.foundIn}
              </div>

              <p className="text-xs text-[#4A4036] mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F5ECE1] text-[10px] text-[#9C8E7E]">
              <strong>Sourcing:</strong> {item.origin}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
