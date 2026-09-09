'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import { Star, Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface BestSellerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function BestSeller({ products, onSelectProduct }: BestSellerProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Products for Best Seller section (featuring badges: Bán chạy, Mới, Giảm giá)
  const bestSellers = products.filter(
    (p) => p.isBestSeller || (p.badges && p.badges.length > 0)
  );

  const checkScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Estimate active index based on item width
      const itemWidth = sliderRef.current.firstElementChild
        ? (sliderRef.current.firstElementChild as HTMLElement).clientWidth + 24
        : 340;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(index, bestSellers.length - 1));
    }
  }, [bestSellers.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [checkScroll]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (sliderRef.current && sliderRef.current.children[index]) {
      const targetElement = sliderRef.current.children[index] as HTMLElement;
      sliderRef.current.scrollTo({
        left: targetElement.offsetLeft - 16,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-cream-50 dark:bg-stone-950 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-coffee dark:text-amberGold">
              Bộ Sưu Tập Tuyển Chọn
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-cream-100 mt-2">
              Những hương vị được quan tâm
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm max-w-lg mt-3 leading-relaxed">
              Một vài lựa chọn tiêu biểu để bắt đầu tìm hiểu về nguyên liệu, cách rang và phương pháp pha chế.
            </p>
          </div>

          {/* Slider Prev/Next Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scrollTo('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft
                  ? 'border-stone-300 dark:border-stone-700 hover:bg-coffee hover:text-white text-stone-700 dark:text-stone-200 active:scale-95 shadow-sm'
                  : 'border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed'
              }`}
              aria-label="Xem sản phẩm trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTo('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all ${
                canScrollRight
                  ? 'border-stone-300 dark:border-stone-700 hover:bg-coffee hover:text-white text-stone-700 dark:text-stone-200 active:scale-95 shadow-sm'
                  : 'border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed'
              }`}
              aria-label="Xem sản phẩm kế tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {bestSellers.map((prod) => (
            <div
              key={prod.id}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] max-w-[360px] snap-start flex-shrink-0 group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover border border-stone-200/80 dark:border-stone-800 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <SafeImage
                  src={prod.image}
                  alt={prod.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => toggleWishlist(prod.id, prod.name)}
                    aria-label="Thêm vào yêu thích"
                    className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-all active:scale-90 ${
                      isInWishlist(prod.id)
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(prod.id) ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => onSelectProduct(prod)}
                    aria-label="Xem chi tiết"
                    className="p-2.5 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-coffee shadow-md backdrop-blur-md transition-all active:scale-90"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-coffee uppercase tracking-wider">
                      {prod.categoryName}
                    </span>
                    <div className="flex items-center text-amber-500 font-medium">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="ml-1">{prod.rating.toFixed(1)}</span>
                      <span className="text-stone-400 text-[10px] ml-1">({prod.reviewCount})</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="font-serif text-xl font-bold text-stone-900 dark:text-cream-100 hover:text-coffee dark:hover:text-amberGold cursor-pointer transition-colors line-clamp-1"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Góc tìm hiểu</span>
                    <span className="text-sm font-semibold text-coffee-dark dark:text-amberGold">Nguyên liệu &amp; kỹ thuật</span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="px-4 py-2.5 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                  >
                    <span>Xem chi tiết</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {bestSellers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-8 bg-coffee dark:bg-amberGold'
                  : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
              }`}
              aria-label={`Chuyển đến sản phẩm thứ ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}