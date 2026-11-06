import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  Droplets,
  Heart,
  Plus,
  Minus,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
}) => {
  const { addToCart, toggleWishlist, isInWishlist, comparedProductIds, toggleCompare, setIsCompareOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse' | 'reviews'>('benefits');
  const [isZoomed, setIsZoomed] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ checked: boolean; valid: boolean; message: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Review submission state
  const [reviewForm, setReviewForm] = useState({ author: '', city: '', rating: 5, comment: '' });
  const [submittedReview, setSubmittedReview] = useState(false);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);
  const accentColor = product.accentColor || '#7E2433';

  // Pairs well with other soaps
  const pairsWellWith = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setPincodeStatus({ checked: true, valid: false, message: 'Please enter a valid 6-digit Indian PIN code' });
      return;
    }
    // Simulate pincode check across India
    setPincodeStatus({
      checked: true,
      valid: true,
      message: `Delivery available at ${pincode}! Delivered in 2–4 business days via Express Air.`,
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author.trim() || !reviewForm.comment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: reviewForm.author,
      city: reviewForm.city || 'India',
      rating: reviewForm.rating,
      date: 'Just now',
      title: 'Real Botanical Experience',
      comment: reviewForm.comment,
      verified: true,
    };
    product.reviews.unshift(newRev);
    setSubmittedReview(true);
    setReviewForm({ author: '', city: '', rating: 5, comment: '' });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const faqs = [
    {
      q: 'Is this soap completely free from artificial foaming agents?',
      a: 'Yes, 100%. SN Alankarana soaps are saponified strictly using pure virgin edible plant oils (coconut, olive, almond, castor) and whole botanicals. We never use SLS, SLES, parabens, or synthetic detergent bases.',
    },
    {
      q: 'How long does a 100g handcrafted bar last?',
      a: 'With daily use, each slow-cured bar lasts approximately 3 to 4 weeks. Because it is free of artificial hardeners, we recommend placing it on a well-draining wooden soap dish between baths.',
    },
    {
      q: 'Can this bar be used on both face and body?',
      a: 'Absolutely. Formulated with gentle pH-balanced botanical oils, it works wonderfully as a luxurious face cleanser and as a full-body rejuvenating bath ritual.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        style={{
          // @ts-expect-error custom property for dynamic color
          '--pdp-accent': accentColor,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-[#4A4036] hover:text-[#7E2433] hover:bg-white flex items-center justify-center shadow-md transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image Gallery & Zoom */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#FBF4EA] border border-[#E8DCCF] cursor-zoom-in group shadow-xs"
            >
              <img
                src={product.posterImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                  isZoomed ? 'scale-150' : 'group-hover:scale-105'
                }`}
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full pointer-events-none flex items-center gap-1">
                <span>{isZoomed ? 'Click to minimize' : 'Click to zoom'}</span>
              </div>
              {product.badge && (
                <div
                  className="absolute top-3 left-3 text-white text-xs font-serif uppercase tracking-wider px-3 py-1 rounded-md shadow-xs"
                  style={{ backgroundColor: accentColor }}
                >
                  {product.badge}
                </div>
              )}
            </div>

            {/* Quick Purity Seals */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#6B5E51] bg-[#FBF4EA] p-3 rounded-xl border border-[#E8DCCF]">
              <div className="flex flex-col items-center">
                <Sparkles className="w-4 h-4 text-[#C8872E] mb-1" />
                <span>100% Handcrafted</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#5B6B2F] mb-1" />
                <span>No Parabens</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplets className="w-4 h-4 text-[#7E2433] mb-1" />
                <span>Cold-Processed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Concern & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span
                  className="uppercase font-cinzel tracking-[0.16em] font-semibold text-xs"
                  style={{ color: accentColor }}
                >
                  {product.concern} · {product.skinType}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-[#C8872E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono font-medium text-[#1E1E1E]">{product.rating}</span>
                  <span className="text-[#9C8E7E]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1E1E1E] leading-tight tracking-tight">
                {product.name}
              </h2>
              <p className="font-script text-2xl sm:text-3xl text-[#7E2433] mt-1 tracking-wide leading-none">{product.tagline}</p>

              {/* Price & Weight */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-mono text-base text-[#9C8E7E] line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-[#5B6B2F] font-semibold bg-[#EAF3DE] px-2 py-0.5 rounded-sm">
                  Save ₹{product.originalPrice - product.price} (Inclusive of GST)
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Stepper & Add to Bag */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center border border-[#E8DCCF] rounded-xl bg-[#FAF4ED] overflow-hidden self-start">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 hover:bg-[#EADBCC] text-[#4A4036] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-mono font-semibold text-[#1E1E1E]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-3 hover:bg-[#EADBCC] text-[#4A4036] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-98 transition-all"
                  style={{ backgroundColor: accentColor }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Add to Sacred Basket · ₹{product.price * quantity}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-3 rounded-xl border border-[#E8DCCF] flex items-center justify-center transition-colors ${
                    isFavorite ? 'bg-[#7E2433] text-white' : 'bg-white text-[#4A4036] hover:bg-[#F3E8DA]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Compare Trigger Link */}
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (!comparedProductIds.includes(product.id)) {
                      toggleCompare(product.id);
                    }
                    setIsCompareOpen(true);
                  }}
                  className="text-[#7E2433] hover:text-[#5C1723] font-medium flex items-center gap-1.5 transition-colors group"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#7E2433] group-hover:scale-110 transition-transform" />
                  <span>
                    {comparedProductIds.includes(product.id)
                      ? '✓ In Comparison List · Open Side-by-Side Matrix'
                      : 'Compare ingredients & benefits with other soaps'}
                  </span>
                </button>
                <span className="text-[11px] text-[#9C8E7E]">Up to 3 soaps</span>
              </div>

              {/* Pincode Serviceability Check */}
              <div className="mt-5 p-3.5 bg-[#FAF4ED] rounded-xl border border-[#E8DCCF]">
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-[#9C8E7E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode (e.g. 500001)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E8DCCF] rounded-lg text-xs font-mono tracking-wider focus:outline-hidden focus:ring-1 focus:ring-[#7E2433]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-[#4A4036] hover:bg-[#1E1E1E] text-white text-xs font-medium rounded-lg transition-colors shrink-0"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p
                    className={`mt-2 text-[11px] flex items-center gap-1 ${
                      pincodeStatus.valid ? 'text-[#3F5A1F]' : 'text-red-600'
                    }`}
                  >
                    {pincodeStatus.valid ? <Clock className="w-3.5 h-3.5 shrink-0" /> : null}
                    <span>{pincodeStatus.message}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Sections (Benefits, Ingredients, How to Use, Reviews) */}
        <div className="border-t border-[#E8DCCF] p-6 sm:p-8 bg-[#FBF4EA]/60">
          <div className="flex border-b border-[#E8DCCF] gap-6 text-xs uppercase tracking-wider font-semibold">
            {[
              { id: 'benefits', label: 'Ayurvedic Benefits' },
              { id: 'ingredients', label: 'Pure Botanicals' },
              { id: 'howToUse', label: 'Bathing Ritual' },
              { id: 'reviews', label: `Reviews (${product.reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-3 relative transition-colors ${
                  activeTab === tab.id ? 'text-[#7E2433] font-bold' : 'text-[#6B5E51] hover:text-[#1E1E1E]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Benefits */}
          {activeTab === 'benefits' && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.benefits.map((b, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-[#E8DCCF]/80 flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm text-[#1E1E1E]">{b.title}</h4>
                    <p className="text-xs text-[#6B5E51] mt-0.5 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.keyIngredients.map((ing, i) => (
                  <div key={i} className="p-3.5 bg-white rounded-xl border border-[#E8DCCF]">
                    <div className="font-serif font-semibold text-sm text-[#1E1E1E]">{ing.name}</div>
                    <div className="text-[11px] font-medium text-[#7E2433]">{ing.role}</div>
                    <p className="text-xs text-[#6B5E51] mt-1">{ing.description}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E8DCCF]">
                <h5 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#1E1E1E] mb-2">
                  Full INCI Botanical Declaration:
                </h5>
                <p className="text-xs text-[#6B5E51] leading-relaxed">
                  {product.fullIngredients.join(' • ')}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: How to Use */}
          {activeTab === 'howToUse' && (
            <div className="mt-5 space-y-3">
              <ol className="list-decimal list-inside space-y-2.5 text-xs text-[#4A4036] bg-white p-5 rounded-xl border border-[#E8DCCF]">
                {product.howToUse.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-medium text-[#1E1E1E]">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="p-3.5 bg-[#FAF4ED] rounded-xl border border-[#E8DCCF] text-xs text-[#6B5E51]">
                <strong>Ayurvedic Consultation Note:</strong> {product.ayurvedicNote}
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="mt-5 space-y-6">
              {/* Review list */}
              <div className="space-y-3.5">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white rounded-xl border border-[#E8DCCF] text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1E1E1E]">{rev.author}</span>
                        <span className="text-[10px] text-[#9C8E7E] font-medium">({rev.city})</span>
                        {rev.verified && (
                          <span className="text-[10px] bg-[#EAF3DE] text-[#3F5A1F] px-1.5 py-0.5 rounded-xs flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#9C8E7E]">{rev.date}</span>
                    </div>
                    <div className="flex text-[#C8872E] mb-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-medium text-[#1E1E1E]">{rev.title}</p>
                    <p className="text-[#6B5E51] mt-1 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Submit a Review Form */}
              <div className="p-5 bg-white rounded-2xl border border-[#E8DCCF]">
                <h4 className="font-serif text-base font-semibold text-[#1E1E1E] mb-1">
                  Share Your Botanical Ritual Experience
                </h4>
                <p className="text-xs text-[#6B5E51] mb-3">
                  Your feedback helps fellow seekers choose the ideal Ayurvedic soap bar.
                </p>

                {submittedReview ? (
                  <div className="p-3 bg-[#EAF3DE] text-[#3F5A1F] rounded-xl text-xs font-medium flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Thank you! Your verified review has been published.
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[#4A4036] mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={reviewForm.author}
                          onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                          placeholder="e.g. Aditi Sharma"
                          className="w-full px-3 py-2 bg-[#FBF4EA] border border-[#E8DCCF] rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#4A4036] mb-1">City</label>
                        <input
                          type="text"
                          value={reviewForm.city}
                          onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                          placeholder="e.g. Hyderabad"
                          className="w-full px-3 py-2 bg-[#FBF4EA] border border-[#E8DCCF] rounded-lg text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#4A4036] mb-1">Rating</label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                        className="px-3 py-2 bg-[#FBF4EA] border border-[#E8DCCF] rounded-lg text-xs"
                      >
                        <option value={5}>5 Stars - Pure Bliss</option>
                        <option value={4}>4 Stars - Wonderful Bar</option>
                        <option value={3}>3 Stars - Good</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#4A4036] mb-1">Your Thoughts</label>
                      <textarea
                        rows={2}
                        required
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        placeholder="Describe how your skin felt after using this soap..."
                        className="w-full px-3 py-2 bg-[#FBF4EA] border border-[#E8DCCF] rounded-lg text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#7E2433] text-white rounded-lg text-xs font-semibold hover:bg-[#5C1723] flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish Review</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          <div className="mt-8 pt-6 border-t border-[#E8DCCF]">
            <h4 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-3">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <div key={i} className="border border-[#E8DCCF] rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-3.5 text-left text-xs font-medium text-[#1E1E1E] flex items-center justify-between hover:bg-[#FAF4ED] transition-colors"
                  >
                    <span>{f.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-[#7E2433]" /> : <ChevronDown className="w-4 h-4 text-[#9C8E7E]" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-3.5 pb-3.5 text-xs text-[#6B5E51] leading-relaxed border-t border-[#E8DCCF]/50 pt-2">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pairs Well With */}
          <div className="mt-8 pt-6 border-t border-[#E8DCCF]">
            <h4 className="font-serif text-base font-semibold text-[#1E1E1E] mb-3">
              Complete Your Ritual (Pairs Well With)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pairsWellWith.map((paired) => (
                <div
                  key={paired.id}
                  onClick={() => onSelectProduct(paired)}
                  className="p-3 bg-white border border-[#E8DCCF] rounded-xl flex items-center gap-3 cursor-pointer hover:border-[#7E2433] transition-colors group"
                >
                  <img
                    src={paired.posterImage}
                    alt={paired.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-semibold text-xs text-[#1E1E1E] group-hover:text-[#7E2433] truncate">
                      {paired.name}
                    </p>
                    <p className="text-[11px] text-[#6B5E51]">{paired.tagline}</p>
                    <span className="font-mono text-xs font-semibold text-[#1E1E1E]">₹{paired.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Mobile Add to Cart Bar */}
        <div className="sm:hidden sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-[#E8DCCF] p-3 flex items-center justify-between gap-3">
          <div>
            <span className="font-mono text-base font-bold text-[#1E1E1E]">₹{product.price * quantity}</span>
            <span className="block text-[10px] text-[#6B5E51]">Inclusive of taxes</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white shadow-md flex items-center justify-center gap-1.5"
            style={{ backgroundColor: accentColor }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Add to Basket ({quantity})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
