import React from 'react';
import { X, ShieldCheck, Truck, FileText } from 'lucide-react';

interface PolicyModalProps {
  policyType: 'shipping' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC]"
        >
          <X className="w-5 h-5" />
        </button>

        {policyType === 'shipping' && (
          <div className="space-y-4 text-xs text-[#4A4036] leading-relaxed">
            <div className="flex items-center gap-2 text-[#7E2433]">
              <Truck className="w-5 h-5" />
              <h3 className="font-serif text-2xl font-semibold text-[#1E1E1E]">
                Shipping & Returns Policy
              </h3>
            </div>
            <p>
              <strong>1. Pan-India Delivery Timelines:</strong> All orders are carefully hand-wrapped and dispatched within 24–48 hours from our artisan facility. We partner with Shiprocket Air, Blue Dart, and Delhivery. Metro cities receive deliveries within 2–3 business days; rest of India within 3–5 business days.
            </p>
            <p>
              <strong>2. Shipping Charges:</strong> We offer <strong>FREE Express Shipping</strong> on all domestic orders of ₹599 and above. For orders under ₹599, a nominal flat express shipping charge of ₹60 is applied at checkout.
            </p>
            <p>
              <strong>3. Return & Damage Replacement:</strong> Because our soaps are handcrafted personal wellness products, we cannot accept returns once the tamper-evident botanical seal is broken. However, if your order arrives damaged, missing an item, or defective in transit, please share a photo on WhatsApp (+91 98480 22338) or email within 48 hours for an instant complimentary replacement.
            </p>
          </div>
        )}

        {policyType === 'privacy' && (
          <div className="space-y-4 text-xs text-[#4A4036] leading-relaxed">
            <div className="flex items-center gap-2 text-[#7E2433]">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-serif text-2xl font-semibold text-[#1E1E1E]">
                Privacy & Data Security
              </h3>
            </div>
            <p>
              At SN Alankarana, we treat your privacy with the same sanctity as our botanical formulations. We collect only essential contact details (name, address, phone number, email) strictly required to fulfill your order and send dispatch tracking notifications.
            </p>
            <p>
              <strong>No Third-Party Sharing:</strong> We NEVER sell, lease, or monetize customer contact data. Payment processing is tokenized directly via RBI-compliant encrypted gateways (Razorpay, UPI). We do not store card or banking PIN credentials on our servers.
            </p>
          </div>
        )}

        {policyType === 'terms' && (
          <div className="space-y-4 text-xs text-[#4A4036] leading-relaxed">
            <div className="flex items-center gap-2 text-[#7E2433]">
              <FileText className="w-5 h-5" />
              <h3 className="font-serif text-2xl font-semibold text-[#1E1E1E]">
                Terms & Ayurvedic Guidance
              </h3>
            </div>
            <p>
              <strong>Natural Botanical Formulations:</strong> All SN Alankarana products are cold-processed cosmetic bathing bars crafted using natural plant oils, goat milk, red wine, herbs, clays, and fruit extracts. Our descriptions reflect traditional Ayurvedic wisdom and supportive botanical qualities ("helps improve", "supports radiance") and do not constitute pharmaceutical cures.
            </p>
            <p>
              <strong>Patch Test Guidance:</strong> While our bars are gentle and free of harsh sulfates, individual skin sensitivities to natural botanicals (such as honey or turmeric) can occasionally occur. We advise performing a patch test on your inner arm before full daily ritual use.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
