import React, { useState } from 'react';
import {
  Package,
  TrendingUp,
  ShoppingBag,
  Users,
  Tag,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowLeft,
  Search,
  DollarSign,
  Truck,
} from 'lucide-react';
import { PRODUCTS, SAMPLE_COUPONS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Order, Product, Coupon } from '../types';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'coupons'>('overview');
  const [productsList, setProductsList] = useState<Product[]>([...PRODUCTS]);
  const [couponsList, setCouponsList] = useState<Coupon[]>([...SAMPLE_COUPONS]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(600);

  // Simulated orders if user hasn't made one yet
  const displayOrders: Order[] = orders.length > 0
    ? orders
    : [
        {
          id: 'ord-init-1',
          orderNumber: 'SNA-2026-8812',
          date: 'Yesterday',
          items: [
            { product: PRODUCTS[0], quantity: 2 },
            { product: PRODUCTS[3], quantity: 1 },
          ],
          subtotal: 1110,
          discount: 111,
          shipping: 0,
          tax: 50,
          total: 999,
          shippingAddress: {
            fullName: 'Ananya Sharma',
            phone: '9848022338',
            email: 'ananya.s@gmail.com',
            street: 'Plot 45, Jubilee Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500033',
          },
          paymentMethod: 'upi',
          paymentStatus: 'Paid',
          fulfillmentStatus: 'Handcrafted & Packed',
          trackingNumber: 'SR-IND-88129031',
          estimatedDelivery: '3 Days',
        },
        {
          id: 'ord-init-2',
          orderNumber: 'SNA-2026-7241',
          date: '2 days ago',
          items: [{ product: PRODUCTS[1], quantity: 1 }],
          subtotal: 340,
          discount: 0,
          shipping: 60,
          tax: 20,
          total: 400,
          shippingAddress: {
            fullName: 'Rahul Deshmukh',
            phone: '9123456780',
            email: 'rahul.d@outlook.com',
            street: 'FC Road',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411004',
          },
          paymentMethod: 'cod',
          paymentStatus: 'Pending COD',
          fulfillmentStatus: 'Shipped via Shiprocket',
          trackingNumber: 'SR-IND-72410928',
          estimatedDelivery: '2 Days',
        },
      ];

  const totalRevenue = displayOrders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = displayOrders.reduce(
    (sum, o) => sum + o.items.reduce((acc, it) => acc + it.quantity, 0),
    0
  );

  const toggleStock = (prodId: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleUpdatePrice = (prodId: string, newPrice: number) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, price: newPrice } : p))
    );
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newC: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: Number(newCouponDiscount),
      minOrderValue: Number(newCouponMin),
      description: `${newCouponDiscount}% off on orders above ₹${newCouponMin}`,
    };
    setCouponsList((prev) => [newC, ...prev]);
    setNewCouponCode('');
  };

  return (
    <div className="min-h-screen bg-[#FBF4EA] text-[#1E1E1E]">
      {/* Admin Top Header */}
      <header className="bg-[#1E1E1E] text-white py-4 px-6 sm:px-10 flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>
          <span className="text-white/30">|</span>
          <h1 className="font-serif text-lg font-semibold tracking-wider">
            SN Alankarana Merchant Portal
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-[#5B6B2F] text-white px-2.5 py-1 rounded-full font-medium">
            Live Production Store
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8DCCF] gap-6 text-xs uppercase tracking-wider font-semibold mb-8">
          {[
            { id: 'overview', label: 'Store Overview', icon: TrendingUp },
            { id: 'orders', label: `Orders (${displayOrders.length})`, icon: ShoppingBag },
            { id: 'inventory', label: 'Product Inventory', icon: Package },
            { id: 'coupons', label: 'Discount Codes', icon: Tag },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`pb-3.5 flex items-center gap-2 relative transition-colors ${
                  isActive ? 'text-[#7E2433] font-bold' : 'text-[#6B5E51] hover:text-[#1E1E1E]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#7E2433] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview KPIs */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-[#E8DCCF] shadow-2xs">
                <div className="text-xs text-[#6B5E51] uppercase tracking-wider font-medium">
                  Gross Sales
                </div>
                <div className="font-mono text-2xl font-bold text-[#1E1E1E] mt-1">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-[#5B6B2F] mt-1 font-medium">
                  +24% vs last week (100% genuine)
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E8DCCF] shadow-2xs">
                <div className="text-xs text-[#6B5E51] uppercase tracking-wider font-medium">
                  Orders Received
                </div>
                <div className="font-mono text-2xl font-bold text-[#1E1E1E] mt-1">
                  {displayOrders.length}
                </div>
                <div className="text-[11px] text-[#7E2433] mt-1 font-medium">
                  {displayOrders.filter((o) => o.fulfillmentStatus !== 'Delivered').length} Pending Dispatch
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E8DCCF] shadow-2xs">
                <div className="text-xs text-[#6B5E51] uppercase tracking-wider font-medium">
                  Average Order Value
                </div>
                <div className="font-mono text-2xl font-bold text-[#1E1E1E] mt-1">
                  ₹{Math.round(totalRevenue / (displayOrders.length || 1))}
                </div>
                <div className="text-[11px] text-[#5B6B2F] mt-1 font-medium">
                  Boosted by 3-Soap Box curations
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E8DCCF] shadow-2xs">
                <div className="text-xs text-[#6B5E51] uppercase tracking-wider font-medium">
                  Units Dispatched
                </div>
                <div className="font-mono text-2xl font-bold text-[#1E1E1E] mt-1">
                  {totalItemsSold} bars
                </div>
                <div className="text-[11px] text-[#6B5E51] mt-1">
                  100g Slow-cured Ayurvedic Bars
                </div>
              </div>
            </div>

            {/* Quick Recent Activity */}
            <div className="bg-white rounded-2xl border border-[#E8DCCF] p-6 shadow-2xs">
              <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-4">
                Recent Dispatches & Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#E8DCCF] text-[#6B5E51] uppercase font-semibold">
                    <tr>
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5ECE1]">
                    {displayOrders.slice(0, 4).map((ord) => (
                      <tr key={ord.id} className="py-3">
                        <td className="py-3 font-mono font-medium text-[#7E2433]">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3">{ord.shippingAddress.fullName}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#FAF4ED] text-[#7E2433] font-medium text-[10px]">
                            {ord.fulfillmentStatus}
                          </span>
                        </td>
                        <td className="py-3 font-mono">{ord.paymentMethod.toUpperCase()}</td>
                        <td className="py-3 text-right font-mono font-bold">₹{ord.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Full List */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-[#E8DCCF] p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
              All Customer Orders
            </h3>
            <div className="space-y-4">
              {displayOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 bg-[#FAF4ED] rounded-xl border border-[#E8DCCF] text-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DCCF] pb-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#7E2433]">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[#9C8E7E] ml-2">({ord.date})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white rounded-md font-mono text-[11px] text-[#4A4036] border border-[#E8DCCF]">
                        Tracking: {ord.trackingNumber}
                      </span>
                      <span className="px-2.5 py-1 bg-[#5B6B2F] text-white rounded-md font-medium text-[10px]">
                        {ord.fulfillmentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <strong>Customer:</strong> {ord.shippingAddress.fullName}
                      <br />
                      <strong>Phone:</strong> +91 {ord.shippingAddress.phone}
                      <br />
                      <strong>Email:</strong> {ord.shippingAddress.email}
                    </div>
                    <div>
                      <strong>Shipping Address:</strong> {ord.shippingAddress.apartment}{' '}
                      {ord.shippingAddress.street}, {ord.shippingAddress.city},{' '}
                      {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                    </div>
                    <div className="text-right font-mono">
                      <div>Items: {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}</div>
                      <div className="text-sm font-bold text-[#1E1E1E] mt-1">Total: ₹{ord.total}</div>
                      <div className="text-[10px] text-[#5B6B2F]">({ord.paymentStatus})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Inventory Management */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-2xl border border-[#E8DCCF] p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
              Artisanal Soap Inventory & Pricing
            </h3>
            <div className="divide-y divide-[#F5ECE1]">
              {productsList.map((prod) => (
                <div
                  key={prod.id}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.posterImage}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-xl border border-[#E8DCCF]"
                    />
                    <div>
                      <h4 className="font-serif font-semibold text-sm text-[#1E1E1E]">{prod.name}</h4>
                      <p className="text-xs text-[#6B5E51]">{prod.tagline}</p>
                      <span className="text-[11px] font-mono text-[#9C8E7E]">Stock: {prod.stockCount} units</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span>Price: ₹</span>
                      <input
                        type="number"
                        value={prod.price}
                        onChange={(e) => handleUpdatePrice(prod.id, Number(e.target.value))}
                        className="w-20 px-2 py-1 bg-[#FAF4ED] border border-[#E8DCCF] rounded-lg font-mono text-xs"
                      />
                    </div>

                    <button
                      onClick={() => toggleStock(prod.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        prod.inStock
                          ? 'bg-[#EAF3DE] text-[#3F5A1F] hover:bg-red-50 hover:text-red-700'
                          : 'bg-red-100 text-red-700 hover:bg-[#EAF3DE] hover:text-[#3F5A1F]'
                      }`}
                    >
                      {prod.inStock ? 'In Stock (Active)' : 'Mark In Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Coupons Management */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-white rounded-2xl border border-[#E8DCCF] p-6 shadow-2xs">
              <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-4">
                Active Promotional Coupons
              </h3>
              <div className="space-y-3">
                {couponsList.map((c) => (
                  <div
                    key={c.code}
                    className="p-3.5 bg-[#FAF4ED] rounded-xl border border-[#E8DCCF] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-bold text-sm text-[#7E2433]">{c.code}</span>
                      <p className="text-xs text-[#6B5E51] mt-0.5">{c.description}</p>
                    </div>
                    <span className="text-xs bg-white px-2.5 py-1 rounded-md border border-[#E8DCCF] font-mono">
                      Min: ₹{c.minOrderValue}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 bg-white rounded-2xl border border-[#E8DCCF] p-6 shadow-2xs">
              <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-4">
                Create New Coupon
              </h3>
              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIWALI20"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF4ED] border border-[#E8DCCF] rounded-xl font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Discount %</label>
                  <input
                    type="number"
                    min={5}
                    max={50}
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF4ED] border border-[#E8DCCF] rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#4A4036] mb-1">Minimum Order Value (₹)</label>
                  <input
                    type="number"
                    min={300}
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF4ED] border border-[#E8DCCF] rounded-xl font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-xl font-semibold transition-colors mt-2"
                >
                  Create Coupon
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
