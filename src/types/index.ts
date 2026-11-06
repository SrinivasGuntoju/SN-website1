export type SkinConcern = 
  | 'All' 
  | 'Brightening' 
  | 'Deep Cleanse' 
  | 'Moisturizing' 
  | 'Anti-pigmentation' 
  | 'Oil Control' 
  | 'Anti-aging';

export type SkinType = 
  | 'All Skin Types' 
  | 'Dry Skin' 
  | 'Oily & Combination' 
  | 'Sensitive Skin' 
  | 'Mature Skin' 
  | 'Blemish-Prone';

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice: number;
  weight: string;
  rating: number;
  reviewCount: number;
  posterImage: string;
  accentColor: string;
  badge?: string;
  concern: SkinConcern;
  skinType: SkinType;
  heroHeadline: string;
  description: string;
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  keyIngredients: {
    name: string;
    role: string;
    description: string;
  }[];
  fullIngredients: string[];
  howToUse: string[];
  ayurvedicNote: string;
  inStock: boolean;
  stockCount: number;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  isGiftBox?: boolean;
  boxItems?: Product[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'upi' | 'razorpay' | 'cod' | 'netbanking';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending COD' | 'Failed';
  fulfillmentStatus: 'Order Placed' | 'Handcrafted & Packed' | 'Shipped via Shiprocket' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
