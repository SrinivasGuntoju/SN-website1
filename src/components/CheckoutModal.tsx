import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  Check,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaymentMethod, ShippingAddress, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    createOrder,
  } = useCart();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    apartment: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Form validations
    if (!address.fullName.trim() || !address.phone.trim() || !address.street.trim() || !address.pincode.trim()) {
      setErrorMsg('Please complete all mandatory delivery fields (*)');
      return;
    }
    if (address.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for dispatch updates');
      return;
    }

    setIsProcessing(true);

    // Simulate luxury gateway payment settlement
    setTimeout(() => {
      const created = createOrder({
        items: [...cart],
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        shipping: shippingFee,
        tax: Math.round(totalAmount * 0.05), // 5% GST included
        total: totalAmount,
        shippingAddress: address,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
      });

      setIsProcessing(false);
      onOrderSuccess(created);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DCCF] bg-[#FBF4EA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7E2433] text-white flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E1E1E]">
                Express Secure Checkout
              </h2>
              <p className="text-xs text-[#6B5E51]">
                Encrypted with 256-bit SSL · Shiprocket Delivery Network
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Split: Delivery Form on Left / Order Summary on Right */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Address + Payment */}
          <div className="md:col-span-7 space-y-6">
            {/* Delivery Address */}
            <div>
              <h3 className="font-serif text-base font-semibold text-[#1E1E1E] flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-[#7E2433]" />
                1. Delivery Destination (India)
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4036] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient name"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs focus:ring-1 focus:ring-[#7E2433]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4036] mb-1">
                      Phone Number (WhatsApp Updates) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs bg-[#FAF4ED] border border-r-0 border-[#E8DCCF] rounded-l-xl text-[#6B5E51] font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-[#E8DCCF] rounded-r-xl text-xs font-mono focus:ring-1 focus:ring-[#7E2433]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4036] mb-1">
                      Email Address (Order Invoice) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="aditi@example.com"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs focus:ring-1 focus:ring-[#7E2433]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#4A4036] mb-1">
                    Flat / House / Suite, Floor *
                  </label>
                  <input
                    type="text"
                    placeholder="Villa #12, Palm Meadows"
                    value={address.apartment}
                    onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs focus:ring-1 focus:ring-[#7E2433]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#4A4036] mb-1">
                    Street Address & Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jubilee Hills Road No. 36"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs focus:ring-1 focus:ring-[#7E2433]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4036] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4036] mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4036] mb-1">PIN *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E8DCCF] rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2 border-t border-[#E8DCCF]">
              <h3 className="font-serif text-base font-semibold text-[#1E1E1E] flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#7E2433]" />
                2. Payment Selection
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'upi',
                    name: 'UPI / QR',
                    desc: 'GPay, PhonePe, Paytm',
                    icon: QrCode,
                  },
                  {
                    id: 'razorpay',
                    name: 'Razorpay / Cards',
                    desc: 'Credit, Debit, NetBanking',
                    icon: CreditCard,
                  },
                  {
                    id: 'cod',
                    name: 'Cash on Delivery',
                    desc: 'Pay ₹ upon arrival',
                    icon: Banknote,
                  },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#7E2433] bg-[#FDF0EC] text-[#7E2433] shadow-xs ring-1 ring-[#7E2433]'
                          : 'border-[#E8DCCF] bg-white text-[#4A4036] hover:bg-[#FAF4ED]'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1.5" />
                      <div className="font-semibold text-xs text-[#1E1E1E]">{m.name}</div>
                      <div className="text-[10px] text-[#6B5E51] mt-0.5 leading-tight">{m.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* UPI Instant Input */}
              {paymentMethod === 'upi' && (
                <div className="mt-3 p-3 bg-[#FAF4ED] rounded-xl border border-[#E8DCCF] text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-[#1E1E1E]">Instant UPI VPA Handle</span>
                    <span className="text-[10px] text-[#5B6B2F] font-semibold">Zero Surcharge</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-[#E8DCCF] rounded-lg text-xs font-mono"
                  />
                  <p className="text-[10px] text-[#6B5E51] mt-1">
                    Or simply scan UPI QR upon final order confirmation screen.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="mt-3 p-3 bg-[#FAF4ED] rounded-xl border border-[#E8DCCF] text-xs text-[#4A4036]">
                  <strong>Cash on Delivery selected:</strong> Please keep exact cash of ₹{totalAmount} ready at the time of delivery. A verification SMS will be sent before shipment dispatch.
                </div>
              )}
            </div>

            {errorMsg && <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg">{errorMsg}</p>}
          </div>

          {/* Right Column: Order Summary & Review */}
          <div className="md:col-span-5 bg-[#FAF4ED] p-5 rounded-2xl border border-[#E8DCCF] flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base font-semibold text-[#1E1E1E] mb-3 pb-2 border-b border-[#E8DCCF]">
                Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
              </h3>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.product.posterImage}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded-md shrink-0 border border-[#E8DCCF]"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-[#1E1E1E] truncate">{item.product.name}</p>
                        <p className="text-[10px] text-[#6B5E51]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-[#1E1E1E] shrink-0">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="mt-5 pt-3 border-t border-[#E8DCCF] space-y-1.5 text-xs text-[#4A4036]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-[#1E1E1E]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#5B6B2F]">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? <strong className="text-[#5B6B2F]">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1E1E1E] pt-2 border-t border-[#E8DCCF]">
                  <span>Total Payable</span>
                  <span className="font-mono text-base text-[#7E2433]">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="mt-6 pt-3 border-t border-[#E8DCCF]">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-full font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Order · ₹{totalAmount}</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-[#9C8E7E] mt-2">
                By placing this order, you support traditional Indian herbal artisans.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
