/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { StoryPage } from './components/StoryPage';
import { IngredientsGlossary } from './components/IngredientsGlossary';
import { WholesalePage } from './components/WholesalePage';
import { GiftBoxBuilder } from './components/GiftBoxBuilder';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SkinConcernQuiz } from './components/SkinConcernQuiz';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PolicyModal } from './components/PolicyModal';
import { CompareModal } from './components/CompareModal';
import { CompareFloatingBar } from './components/CompareFloatingBar';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, Order } from './types';
import { Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { toastMessage, isCompareOpen, setIsCompareOpen } = useCart();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  // Modals & Overlay state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [activePolicy, setActivePolicy] = useState<'shipping' | 'privacy' | 'terms' | null>(null);

  // Scroll to top on navigation
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) setSelectedProduct(found);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF4EA] text-[#1E1E1E]">
      {/* Monogram Brand Preloader */}
      {!hasLoaded && <Preloader onComplete={() => setHasLoaded(true)} />}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1E1E] text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-white/10 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#F4C6C3] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      {currentView !== 'admin' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />
      )}

      {/* Main Page Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigate={handleNavigate}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {currentView === 'shop' && (
          <ShopView
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentView === 'gift-box' && (
          <div className="py-8">
            <GiftBoxBuilder />
          </div>
        )}

        {currentView === 'story' && (
          <StoryPage onShopNow={() => handleNavigate('shop')} />
        )}

        {currentView === 'ingredients' && (
          <IngredientsGlossary />
        )}

        {currentView === 'wholesale' && (
          <WholesalePage />
        )}

        {currentView === 'admin' && (
          <AdminDashboard onBackToStore={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer */}
      {currentView !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenPolicy={(policy) => setActivePolicy(policy)}
        />
      )}

      {/* Modals and Drawers */}
      <CartDrawer
        onCheckout={() => setIsCheckoutOpen(true)}
        onExploreShop={() => handleNavigate('shop')}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={handleSelectProductById}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <SkinConcernQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setIsCheckoutOpen(false);
          setCompletedOrder(order);
        }}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onContinueShopping={() => handleNavigate('shop')}
      />

      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Product Comparison Floating Dock & Side-by-Side Modal */}
      <CompareFloatingBar />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
