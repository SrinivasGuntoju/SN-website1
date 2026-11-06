import React, { useState } from 'react';
import { Gift, Phone, Send, CheckCircle, Sparkles, Building, HeartHandshake } from 'lucide-react';

export const WholesalePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    eventType: 'Wedding Favors',
    quantity: '50 - 100 Boxes',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-[#FBF4EA] animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-12">
        <span className="font-script text-2xl sm:text-3xl text-[#7E2433]">Celebrations & Gifting</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1E1E1E]">
          Artisanal Gifting & Wholesale Enquiries
        </h1>
        <p className="text-sm text-[#6B5E51] max-w-xl mx-auto font-light leading-relaxed">
          Delight wedding guests, festive recipients, or corporate clients with handcrafted herbal soap boxes customized with your personal monogram and bespoke sleeve branding.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Information */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DCCF] shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
              Why Choose SN Alankarana for Gifting?
            </h3>

            <div className="space-y-3.5 text-xs text-[#4A4036]">
              <div className="flex gap-3">
                <Gift className="w-5 h-5 text-[#7E2433] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1E1E]">Bespoke Sleeve & Wax Seal Branding:</strong>
                  <p className="text-[#6B5E51] mt-0.5">Custom couple initials for weddings or company logos for festive Diwali hampers.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <HeartHandshake className="w-5 h-5 text-[#5B6B2F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1E1E]">Universally Cherished:</strong>
                  <p className="text-[#6B5E51] mt-0.5">Suitable for all ages and skin types; free of harmful chemicals and artificial perfumes.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Building className="w-5 h-5 text-[#C8872E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1E1E]">Tiered Volume Pricing:</strong>
                  <p className="text-[#6B5E51] mt-0.5">Special wholesale slabs for orders starting from 25 curated 3-soap boxes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Concierge Card */}
          <div className="p-6 bg-[#FAF4ED] rounded-3xl border border-[#E8DCCF] text-center space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#1E1E1E]">
              Need Urgent Gifting Consultation?
            </h4>
            <p className="text-xs text-[#6B5E51]">
              Chat directly with our founder & master soapmaker on WhatsApp for instant sample boxes.
            </p>
            <a
              href="https://wa.me/919848022338?text=Hello%20SN%20Alankarana,%20I%20want%20to%20discuss%20bulk%20gifting%20boxes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#5B6B2F] hover:bg-[#475424] text-white rounded-full text-xs font-semibold transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Us: +91 98480 22338</span>
            </a>
          </div>
        </div>

        {/* Right Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DCCF] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 bg-[#EAF3DE] text-[#3F5A1F] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1E1E1E]">
                Thank You, {formData.name}!
              </h3>
              <p className="text-xs text-[#6B5E51] max-w-sm mx-auto">
                Our gifting concierge has received your request. We will contact you via WhatsApp / Email with customized pricing and mockup sleeves within 4 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-2">
                Submit Wholesale / Gifting Request
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Varma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FBF4EA] border border-[#E8DCCF] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Company / Event Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sharma-Kapoor Wedding / Infosys"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FBF4EA] border border-[#E8DCCF] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="radhika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FBF4EA] border border-[#E8DCCF] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FBF4EA] border border-[#E8DCCF] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Occasion / Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FBF4EA] border border-[#E8DCCF] rounded-xl"
                  >
                    <option>Wedding Favors (Mehendi / Sangeet)</option>
                    <option>Corporate Diwali & Festive Gifting</option>
                    <option>Boutique / Organic Store Retail</option>
                    <option>Luxury Hotel / Spa Amenity Bars</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Estimated Quantity</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FBF4EA] border border-[#E8DCCF] rounded-xl"
                  >
                    <option>25 - 50 Boxes</option>
                    <option>50 - 150 Boxes</option>
                    <option>150 - 500 Boxes</option>
                    <option>500+ Luxury Suites</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#4A4036] mb-1">Specific Soap Preferences / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about desired custom sleeve colors, delivery date, or preferred soap bars..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FBF4EA] border border-[#E8DCCF] rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-full font-semibold uppercase tracking-wider text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Wholesale Quotation</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
