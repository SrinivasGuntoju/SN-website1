import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order } from '../types';
import { SAMPLE_COUPONS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'fulfillmentStatus' | 'trackingNumber' | 'estimatedDelivery'> & { estimatedDelivery?: string }) => Order;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Custom 3-soap box builder
  customBox: Product[];
  addToCustomBox: (product: Product) => boolean;
  removeFromCustomBox: (index: number) => void;
  clearCustomBox: () => void;
  addCustomBoxToCart: (boxTheme?: string) => void;
  // Product Comparison (up to 3 products)
  comparedProductIds: string[];
  toggleCompare: (productId: string) => void;
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sn_alankarana_cart';
const WISHLIST_STORAGE_KEY = 'sn_alankarana_wishlist';
const ORDERS_STORAGE_KEY = 'sn_alankarana_orders';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customBox, setCustomBox] = useState<Product[]>([]);
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && !item.isGiftBox);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && !item.isGiftBox
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to your basket`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your favorites');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = SAMPLE_COUPONS.find((c) => c.code === cleanCode);
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try GLOW10 or ALANKARANA' };
    }
    if (subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `This coupon requires a minimum cart total of ₹${coupon.minOrderValue}`,
      };
    }
    setAppliedCoupon(coupon);
    showToast(`Coupon "${cleanCode}" applied successfully!`);
    return { success: true, message: `Applied ${coupon.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discountAmount = Math.min(appliedCoupon.discountValue, subtotal);
    }
  }

  const freeShippingThreshold = 599;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 60;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  // Custom 3-soap box actions
  const addToCustomBox = (product: Product) => {
    if (customBox.length >= 3) {
      showToast('Your 3-soap box is already full! Remove one to swap.');
      return false;
    }
    setCustomBox((prev) => [...prev, product]);
    showToast(`Added ${product.name} to box (${customBox.length + 1}/3)`);
    return true;
  };

  const removeFromCustomBox = (index: number) => {
    setCustomBox((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCustomBox = () => {
    setCustomBox([]);
  };

  const addCustomBoxToCart = (boxTheme = 'Royal Cream Gold') => {
    if (customBox.length !== 3) {
      showToast('Please pick 3 handcrafted soaps for your custom gift box');
      return;
    }
    // Bundle price: ₹949 (approx 15% discount off 3 x ~360 = 1080)
    const bundleProduct: Product = {
      id: `custom-box-${Date.now()}`,
      slug: 'custom-ayurvedic-gift-box',
      name: `Artisanal 3-Soap Box (${boxTheme})`,
      subtitle: customBox.map((p) => p.name).join(' + '),
      tagline: 'Custom Handcrafted Gift Box with Festive Sleeve',
      heroHeadline: 'Handmade luxury custom curated box',
      price: 949,
      originalPrice: 1100,
      weight: '300g (3 x 100g)',
      rating: 5.0,
      reviewCount: 38,
      posterImage: customBox[0].posterImage,
      accentColor: '#7E2433',
      badge: 'Gift Edition',
      concern: 'Brightening',
      skinType: 'All Skin Types',
      description: `Curated trio box containing: ${customBox.map((p) => p.name).join(', ')}. Wrapped in recycled seed-paper gift packaging with botanical seal.`,
      benefits: [
        { title: 'Trio Ayurvedic Benefits', description: 'Comprehensive ritual for face and body.', icon: 'sparkles' },
        { title: 'Luxury Hardcover Box', description: 'Handmade rigid gift box with silk pull ribbon.', icon: 'heart' },
        { title: 'Complimentary Calligraphy Note', description: 'Personalized handwritten message inside.', icon: 'feather' },
      ],
      keyIngredients: customBox.flatMap((p) => p.keyIngredients.slice(0, 1)),
      fullIngredients: ['Pure Saponified Natural Oils', 'Herbal Extracts'],
      howToUse: ['Use individual bars according to skin concern or rotate for complete holistic ritual.'],
      ayurvedicNote: 'A complete Ayurvedic wellness experience for yourself or a loved one.',
      inStock: true,
      stockCount: 20,
      reviews: [],
    };

    setCart((prev) => [
      ...prev,
      {
        product: bundleProduct,
        quantity: 1,
        isGiftBox: true,
        boxItems: [...customBox],
      },
    ]);
    clearCustomBox();
    setIsCartOpen(true);
    showToast('Custom 3-Soap Box added to your bag!');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'fulfillmentStatus' | 'trackingNumber' | 'estimatedDelivery'> & { estimatedDelivery?: string }): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `SR-IND-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber: `SNA-${new Date().getFullYear()}-${randomSuffix}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      fulfillmentStatus: 'Order Placed',
      trackingNumber: trackingCode,
      estimatedDelivery: orderData.estimatedDelivery || '2–4 Business Days (Express Air)',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Compare up to 3 products methods
  const addToCompare = (productId: string): boolean => {
    if (comparedProductIds.includes(productId)) {
      return true;
    }
    if (comparedProductIds.length >= 3) {
      showToast('Maximum 3 soaps can be compared side-by-side. Remove one to add this.');
      return false;
    }
    setComparedProductIds((prev) => [...prev, productId]);
    showToast(`Added to comparison (${comparedProductIds.length + 1}/3)`);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setComparedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const toggleCompare = (productId: string) => {
    if (comparedProductIds.includes(productId)) {
      removeFromCompare(productId);
      showToast('Removed from comparison');
    } else {
      addToCompare(productId);
    }
  };

  const clearCompare = () => {
    setComparedProductIds([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        freeShippingThreshold,
        freeShippingProgress,
        orders,
        createOrder,
        toastMessage,
        showToast,
        customBox,
        addToCustomBox,
        removeFromCustomBox,
        clearCustomBox,
        addCustomBoxToCart,
        comparedProductIds,
        toggleCompare,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
