'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileMenu from '@/components/layout/MobileMenu';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BestSeller from '@/components/home/BestSeller';
import AboutSection from '@/components/home/AboutSection';
import MenuSection from '@/components/home/MenuSection';
import PromoBanner from '@/components/home/PromoBanner';
import GallerySection from '@/components/home/GallerySection';
import VideoSection from '@/components/home/VideoSection';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import ReservationSection from '@/components/home/ReservationSection';
import NewsletterSection from '@/components/home/NewsletterSection';

import ProductDetailModal from '@/components/modals/ProductDetailModal';
import CartDrawer from '@/components/modals/CartDrawer';
import CheckoutModal from '@/components/modals/CheckoutModal';
import WishlistDrawer from '@/components/modals/WishlistDrawer';
import SearchModal from '@/components/modals/SearchModal';
import AuthModal from '@/components/modals/AuthModal';
import LightboxModal from '@/components/modals/LightboxModal';
import BackToTop from '@/components/common/BackToTop';

import { PRODUCTS } from '@/data/products';
import { BLOGS } from '@/data/blogs';
import { REVIEWS } from '@/data/reviews';
import { GALLERY_ITEMS } from '@/data/gallery';
import { Product } from '@/types';

export default function Home() {
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('thuc-don');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToReservation = () => {
    const el = document.getElementById('dat-ban');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex flex-col bg-cream-100 text-onyx selection:bg-coffee/20 selection:text-coffee-dark">
      {/* Sticky Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onScrollToMenu={handleScrollToMenu}
      />

      {/* Main Content Sections */}
      <HeroSection
        onExploreMenu={handleScrollToMenu}
        onBookTable={handleScrollToReservation}
      />

      <WhyChooseUs />

      <BestSeller
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AboutSection />

      <MenuSection
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <PromoBanner />

      <GallerySection
        items={GALLERY_ITEMS}
        onOpenLightbox={handleOpenLightbox}
      />

      <VideoSection />

      <Testimonials reviews={REVIEWS} />

      <BlogSection blogs={BLOGS} />

      <InstagramFeed />

      <ReservationSection />

      <NewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Drawers and Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />

      <CheckoutModal />

      <WishlistDrawer
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <LightboxModal
        items={GALLERY_ITEMS}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenReservation={handleScrollToReservation}
      />

      {/* Floating Back To Top Button */}
      <BackToTop />
    </main>
  );
}