import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Truck,
  Package,
  Calendar,
  MapPin,
  Download,
  X,
  ExternalLink,
  Sparkles,
  Printer,
} from 'lucide-react';
import { Order } from '../types';
import { BrandLogo } from './BrandLogo';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  useEffect(() => {
    if (order) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7E2433', '#C8872E', '#F4C6C3', '#5B6B2F'],
        });
      } catch {
        // fallback
      }
    }
  }, [order]);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-[#FAF4ED] border-b border-[#E8DCCF] text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-[#EAF3DE] text-[#3F5A1F] rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="font-script text-2xl text-[#7E2433]">Gratitude & Blessing</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mt-1">
            Order Confirmed!
          </h2>
          <p className="text-xs text-[#6B5E51] mt-1">
            Order ID: <strong className="font-mono text-[#1E1E1E]">{order.orderNumber}</strong> · Confirmation email dispatched to{' '}
            <strong>{order.shippingAddress.email}</strong>
          </p>
        </div>

        {/* Tracking & Timeline */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-4 bg-[#FBF4EA] rounded-2xl border border-[#E8DCCF]">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-medium text-[#4A4036] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#7E2433]" />
                Live Dispatch Tracking (Shiprocket Air)
              </span>
              <span className="font-mono font-semibold text-[#7E2433]">
                {order.trackingNumber}
              </span>
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#7E2433] text-white flex items-center justify-center mb-1 text-[11px] font-bold">
                  ✓
                </div>
                <span className="font-medium text-[#1E1E1E]">Order Placed</span>
                <span className="text-[#9C8E7E]">Today</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#C8872E] text-white flex items-center justify-center mb-1 text-[11px] font-bold animate-pulse">
                  2
                </div>
                <span className="font-medium text-[#1E1E1E]">Artisan Packing</span>
                <span className="text-[#9C8E7E]">In progress</span>
              </div>
              <div className="flex flex-col items-center opacity-60">
                <div className="w-6 h-6 rounded-full bg-[#EADBCC] text-[#6B5E51] flex items-center justify-center mb-1 text-[11px] font-bold">
                  3
                </div>
                <span className="text-[#6B5E51]">Express Air</span>
                <span className="text-[#9C8E7E]">Tomorrow</span>
              </div>
              <div className="flex flex-col items-center opacity-60">
                <div className="w-6 h-6 rounded-full bg-[#EADBCC] text-[#6B5E51] flex items-center justify-center mb-1 text-[11px] font-bold">
                  4
                </div>
                <span className="text-[#6B5E51]">Delivery</span>
                <span className="text-[#9C8E7E]">2–4 Days</span>
              </div>
            </div>
          </div>

          {/* Printable Invoice Details Card */}
          <div className="p-5 bg-white rounded-2xl border border-[#E8DCCF] text-xs space-y-4 print:p-0 print:border-none">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCF]">
              <BrandLogo size="sm" showTagline={false} />
              <div className="text-right">
                <span className="font-mono font-medium text-[#1E1E1E]">Date: {order.date}</span>
                <p className="text-[10px] text-[#6B5E51]">Payment: {order.paymentMethod.toUpperCase()}</p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-2 text-[#4A4036]">
              <MapPin className="w-4 h-4 text-[#7E2433] shrink-0 mt-0.5" />
              <div>
                <strong>Shipping To:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.apartment}{' '}
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                <span className="font-mono">{order.shippingAddress.pincode}</span>. Phone: +91{' '}
                {order.shippingAddress.phone}
              </div>
            </div>

            {/* Items list */}
            <div className="divide-y divide-[#F5ECE1]">
              {order.items.map((it, i) => (
                <div key={i} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#1E1E1E]">{it.product.name}</span>
                    <span className="text-[#9C8E7E]">x{it.quantity}</span>
                  </div>
                  <span className="font-mono font-medium text-[#1E1E1E]">
                    ₹{it.product.price * it.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-[#E8DCCF] flex justify-between font-semibold text-sm text-[#1E1E1E]">
              <span>Final Settled Amount</span>
              <span className="font-mono text-base text-[#7E2433]">₹{order.total}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#E8DCCF] hover:bg-[#FAF4ED] text-[#4A4036] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="w-full sm:flex-1 py-3 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore More Artisanal Soaps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
