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
import GallerySection from '@/components/home/GallerySection';
import VideoSection from '@/components/home/VideoSection';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import InstagramFeed from '@/components/home/InstagramFeed';

import ProductDetailModal from '@/components/modals/ProductDetailModal';
import WishlistDrawer from '@/components/modals/WishlistDrawer';
import SearchModal from '@/components/modals/SearchModal';
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

  return (
    <main className="min-h-screen flex flex-col bg-cream-100 text-onyx selection:bg-coffee/20 selection:text-coffee-dark">
      {/* Sticky Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onScrollToMenu={handleScrollToMenu}
      />

      {/* Main Content Sections */}
      <HeroSection
        onExploreMenu={handleScrollToMenu}
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

      <GallerySection
        items={GALLERY_ITEMS}
        onOpenLightbox={handleOpenLightbox}
      />

      <VideoSection />

      <Testimonials reviews={REVIEWS} />

      <BlogSection blogs={BLOGS} />

      <InstagramFeed />

      {/* Footer */}
      <Footer />

      {/* Interactive Drawers and Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <WishlistDrawer
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
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
      />

      {/* Floating Back To Top Button */}
      <BackToTop />
    </main>
  );
}