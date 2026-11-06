import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Send,
  Check,
  ArrowUp,
  ArrowLeft,
  Copy,
  Tag,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenPolicy: (type: 'shipping' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  const { applyCoupon, setIsCartOpen, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('All Herbal Rituals');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const promoCode = 'GLOW10';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      showToast('Welcome to SN Alankarana! Your 10% welcome gift is ready.');
    }
  };

  const handleBackToForm = () => {
    setIsSubscribed(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopiedCode(true);
    showToast(`Coupon code ${promoCode} copied to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2400);
  };

  const handleApplyDirectly = () => {
    applyCoupon(promoCode);
    setIsCartOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const interests = [
    'All Herbal Rituals',
    'Radiance & Tan Removal',
    'Deep Moisture & Lipids',
    'Pore Clarifying & Detox',
  ];

  return (
    <footer className="bg-[#1E1E1E] text-[#FFFDF9] border-t border-[#332A24] relative overflow-hidden">
      {/* Decorative Botanical Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#7E2433]/15 blur-3xl pointer-events-none" />

      {/* Trust Badges Strip */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-[#E8DCCF]">
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-white font-semibold mb-1">100% Handmade</span>
            <p className="text-[11px] text-white/60">Cold-processed in slow 4-week cured artisan batches</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-white font-semibold mb-1">Zero Toxins</span>
            <p className="text-[11px] text-white/60">No Parabens, No Sulfates (SLS/SLES), No Artificial Dyes</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-white font-semibold mb-1">Cruelty-Free & Pure</span>
            <p className="text-[11px] text-white/60">Vegetarian food-grade plant oils & wild forest botanicals</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-white font-semibold mb-1">Pan-India Express</span>
            <p className="text-[11px] text-white/60">Free doorstep delivery on orders above ₹599</p>
          </div>
        </div>
      </div>

      {/* Dedicated Brand-Aligned Newsletter Signup Section */}
      <section className="border-b border-white/10 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#241E1C] to-[#1E1E1E] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {!isSubscribed ? (
            /* Default Newsletter Signup Form */
            <div className="space-y-6">
              <div>
                <span className="font-script text-3xl sm:text-4xl text-[#F4C6C3] block mb-1">
                  The Inner Circle
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight">
                  Join the SN Alankarana Chronicles
                </h3>
                <div className="w-10 h-[1px] bg-[#7E2433] mx-auto my-3" />
                <p className="text-xs sm:text-sm text-[#E8DCCF]/80 max-w-xl mx-auto font-light leading-relaxed">
                  Subscribe to receive an exclusive <strong className="text-white font-medium">10% welcome gift</strong> on your first artisanal order, early access to limited slow-cured soap releases, and seasonal Ayurvedic rituals.
                </p>
              </div>

              {/* Preference Selection Chips */}
              <div className="space-y-2">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.18em] text-[#E8DCCF]/60 block">
                  Select your primary ritual interest:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {interests.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedInterest(item)}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${
                        selectedInterest === item
                          ? 'bg-[#7E2433] text-white shadow-xs font-medium'
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input & Action */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#F4C6C3] focus:ring-1 focus:ring-[#F4C6C3] transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#7E2433] hover:bg-[#581622] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-98 shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <span>Claim 10% Off</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#E8DCCF]/50 font-light">
                  ✦ Pure plant wisdom · Zero spam · Unsubscribe with a single click anytime.
                </p>
              </form>
            </div>
          ) : (
            /* Subscribed Success View with .back option */
            <div className="p-8 sm:p-10 bg-[#28201E] border border-[#7E2433]/60 rounded-3xl space-y-5 animate-fadeIn max-w-lg mx-auto shadow-2xl relative">
              <div className="w-12 h-12 bg-[#5B6B2F]/20 text-[#A4C46A] rounded-full flex items-center justify-center mx-auto border border-[#5B6B2F]/40">
                <Check className="w-6 h-6" />
              </div>

              <div>
                <span className="font-script text-2xl text-[#F4C6C3] block">Welcome to the Atelier</span>
                <h4 className="font-serif text-2xl font-normal text-white mt-1">
                  Your Welcome Gift is Unlocked
                </h4>
                <p className="text-xs text-[#E8DCCF]/80 mt-1.5 font-light">
                  We've reserved <strong className="text-white font-medium">10% off</strong> for your sacred bathing order with email <span className="underline decoration-[#7E2433]">{email}</span> ({selectedInterest}).
                </p>
              </div>

              {/* Promo Code Display Card */}
              <div className="p-3.5 bg-black/40 rounded-2xl border border-white/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-left">
                  <Tag className="w-4 h-4 text-[#F4C6C3] shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/60 uppercase tracking-widest block font-cinzel">
                      Promotional Voucher
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wider">
                      {promoCode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs rounded-xl flex items-center gap-1 transition-colors"
                    title="Copy promo code"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#A4C46A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleApplyDirectly}
                    className="px-3 py-1.5 bg-[#7E2433] hover:bg-[#581622] text-white text-xs rounded-xl font-medium transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* The .back option */}
              <div className="pt-2 flex items-center justify-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={handleBackToForm}
                  className="inline-flex items-center gap-1.5 text-[#F4C6C3] hover:text-white underline underline-offset-4 transition-colors font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to signup form / Change email</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <BrandLogo size="lg" variant="light" />
          <p className="text-xs text-[#E8DCCF]/80 leading-relaxed max-w-sm mt-3 font-light">
            SN Alankarana is an Indian artisanal herbal atelier. We craft slow-cured, nutrient-dense bathing bars using fresh goat milk, fermented red wine polyphenols, wild ubtan herbs, activated bamboo charcoal, and ripe papaya enzymes.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#7E2433] flex items-center justify-center text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#7E2433] flex items-center justify-center text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919848022338?text=Hello%20SN%20Alankarana,%20I%20would%20like%20to%20enquire%20about%20your%20herbal%20soaps"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#5B6B2F] hover:bg-[#475424] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] uppercase text-[#F4C6C3]">
            Curated Soaps
          </h4>
          <ul className="space-y-2 text-xs text-[#E8DCCF]/80">
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="hover:text-white transition-colors"
              >
                Goat Milk & Wine
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="hover:text-white transition-colors"
              >
                Charcoal & Multani Mitti
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="hover:text-white transition-colors"
              >
                Antioxidant Red Wine
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="hover:text-white transition-colors"
              >
                Ubtan Honey Glow
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="hover:text-white transition-colors"
              >
                Papaya & Licorice
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('gift-box')}
                className="text-[#F4C6C3] font-medium hover:underline"
              >
                ★ Build 3-Soap Box
              </button>
            </li>
          </ul>
        </div>

        {/* Brand & Rituals Column */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] uppercase text-[#F4C6C3]">
            Ayurvedic Philosophy
          </h4>
          <ul className="space-y-2 text-xs text-[#E8DCCF]/80">
            <li>
              <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                Our Herbal Story
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ingredients')} className="hover:text-white transition-colors">
                Botanicals Glossary
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('wholesale')} className="hover:text-white transition-colors">
                Wedding & Festive Gifting
              </button>
            </li>
            <li>
              <button onClick={() => onOpenPolicy('shipping')} className="hover:text-white transition-colors">
                Shipping & Returns Policy
              </button>
            </li>
            <li>
              <button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition-colors">
                Privacy & Data Security
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin')} className="text-white/40 hover:text-white/70">
                Merchant Admin Login
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal / Copyright Strip with Back to Top Option */}
      <div className="border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8 text-xs text-[#E8DCCF]/60 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} SN Alankarana – Herbal Hair & Skin Care. All Rights Reserved.</span>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-[11px]">
            <span>Glow Naturally</span>
            <span>•</span>
            <span>Made with Ayurvedic Love in India</span>
          </div>

          {/* Dedicated Back to Top Option */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#7E2433] text-white text-xs transition-colors shrink-0 cursor-pointer"
            title="Scroll back to top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
